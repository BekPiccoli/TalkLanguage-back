// controllers/progressController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function saveProgress(req, res) {
  try {
    const { exerciseId, correct, userId } = req.body;

    const progress = await prisma.progress.create({
      data: {
        exerciseId,
        userId,
        status: correct ? "Concluído" : "Incompleto",
        correct,
      },
    });

    res.status(201).json(progress);
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    res.status(500).json({ message: "Erro ao salvar progresso." });
  }
}


export async function getProgressByGroup(req, res) {
  try {
    const { groupId, userId } = req.params;
    const progress = await prisma.progress.findMany({
      where: {
        userId,
        exercise: {
          exerciseGroupId: groupId,
        },
      },
      select: {
        exerciseId: true,
        correct: true,
      },
    });

    res.status(200).json(progress);
  } catch (error) {
    console.error("Erro ao buscar progresso:", error);
    res.status(500).json({ message: "Erro ao buscar progresso." });
  }
}

export async function getPerformance(req, res) {
  console.log("getPerformance");

  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { primaryLanguage: true },
    });

    if (!user || !user.primaryLanguage) {
      console.error("Erro: Usuário não encontrado ou sem idioma principal.");
      return res.status(404).json({ message: "Usuário não encontrado ou sem idioma principal." });
    }

    const primaryLanguage = user.primaryLanguage;

    // Buscar grupos de exercícios apenas da língua principal do usuário
    const exerciseGroups = await prisma.exerciseGroup.findMany({
      where: {
        language: primaryLanguage,
      },
      include: {
        exercises: true,
      },
    });

    // Construir a estrutura agrupada por idioma
    const groupedPerformance = {};

    for (const group of exerciseGroups) {
      const totalExercises = group.exercises.length;

      const correctExercisesCount = await prisma.progress.count({
        where: {
          userId,
          exercise: {
            exerciseGroupId: group.id,
          },
          correct: true,
        },
      });

      const progressPercentage =
        totalExercises > 0
          ? ((correctExercisesCount / totalExercises) * 100).toFixed(2)
          : 0;

      if (!groupedPerformance[group.language]) {
        groupedPerformance[group.language] = {
          language: group.language,
          groups: [],
        };
      }

      groupedPerformance[group.language].groups.push({
        groupId: group.id,
        groupName: group.name,
        totalExercises,
        correctExercises: correctExercisesCount,
        progressPercentage,
      });
    }

    res.status(200).json(Object.values(groupedPerformance));
  } catch (error) {
    console.error("Erro ao buscar desempenho:", error);
    res.status(500).json({ message: "Erro ao buscar desempenho." });
  }
}
