// controllers/rewardController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addReward(req, res) {
  try {
    const { userId, description, points } = req.body;
    const reward = await prisma.reward.create({
      data: { userId, description, points },
    });
    res.status(201).json({ message: "Recompensa adicionada", reward });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao adicionar recompensa" });
  }
}

export async function listRewards(req, res) {
  try {
    const { userId } = req.params;
    const rewards = await prisma.reward.findMany({ where: { userId } });
    res.status(200).json({ rewards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar recompensas" });
  }
}
