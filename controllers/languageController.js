// controllers/languageController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addUserLanguage(req, res) {
  console.log("Entrou no addUserLanguage");

  try {
    const { userId } = req.params;
    const { language, level, purpose } = req.body;

    console.log("chegouuuuuuuu no addUserLanguage");
    console.log(userId);
    console.log(language);
    console.log(level);
    console.log(purpose);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const newLanguage = await prisma.userLanguage.create({
      data: {
        userId,
        language,
        level,
        purpose,
      },
    });
    res.status(201).json({ message: "Idioma adicionado ao usuário", newLanguage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao adicionar idioma" });
  }
}

export async function listUserLanguages(req, res) {
  try {
    const { userId } = req.params;
    const languages = await prisma.userLanguage.findMany({
      where: { userId },
    });
    res.status(200).json({ languages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar idiomas do usuário" });
  }
}
