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

export async function listExercisesByGroup(req, res) {
  try {
    const { exerciseGroupId } = req.params;
    const exercises = await prisma.exercise.findMany({
      where: { exerciseGroupId },
    });
    res.status(200).json({ exercises });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar exercícios do grupo" });
  }
}
