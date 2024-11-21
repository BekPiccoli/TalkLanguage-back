// controllers/exerciseController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addExercise(req, res) {
  try {
    const { userLanguageId, exerciseGroupId, type, content, options, correctAnswer, audio } = req.body;

    const newExercise = await prisma.exercise.create({
      data: {
        userLanguageId,
        exerciseGroupId,
        type,
        content,
        options,
        correctAnswer,
        audio,
      },
    });
    res.status(201).json({ message: "Exercício criado", newExercise });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar exercício" });
  }
}

export async function getExerciseById(req, res) {
  try {
    const { exerciseId } = req.params;
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      return res.status(404).json({ message: "Exercício não encontrado." });
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.error("Erro ao buscar exercício:", error);
    res.status(500).json({ message: "Erro ao buscar exercício." });
  }
}


export async function listExercisesByGroup(req, res) {
  try {
    const { groupId } = req.params;
    const exercises = await prisma.exercise.findMany({
      where: {
        exerciseGroupId: groupId,
      },
    });
    res.status(200).json({ exercises });
  } catch (err) {
    console.error("Erro ao listar exercícios do grupo:", err);
    res.status(500).json({ message: "Erro ao listar exercícios do grupo" });
  }
}
