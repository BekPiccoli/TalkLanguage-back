// controllers/exerciseController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function listAllExercisesGroup(req, res) {
    try {
      const data = await prisma.exerciseGroup.findMany();
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
    }
  }

export async function listExercisesGroupByLanguage(req, res) {
    try {
        const { language } = req.query;
        const data = await prisma.exerciseGroup.findMany({
        where: { language },
         });
        res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao listar grupos de exercicio"});
    }
}