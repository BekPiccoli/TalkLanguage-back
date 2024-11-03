// controllers/progressController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function updateProgress(req, res) {
  try {
    const { userId, exerciseId, status } = req.body;

    const progress = await prisma.progress.upsert({
      where: { userId_exerciseId: { userId, exerciseId } },
      update: { status },
      create: { userId, exerciseId, status },
    });
    res.status(200).json({ message: "Progresso atualizado", progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar progresso" });
  }
}
