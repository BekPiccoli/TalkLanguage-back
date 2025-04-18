import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(req, res) {
  try {
    const { name, email, password, age } = req.body;
    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (!emailExist) {
      const newUser = await prisma.user.create({
        data: { name, email, password, age },
      });
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso", user: newUser });
    } else {
      res.status(400).json({ message: "Usuário já existe" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    const userId = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userId) {
      res
        .status(404)
        .json({ message: "Usuário não existe ou já foi deletado." });
    } else {
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: "Deletado com sucesso" });
      console.log("Usuário deletado");
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.log(err);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userData = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: "Usuário não existe." });
    }
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        password,
        name,
      },
    });
    res
      .status(200)
      .json({ message: "Dados atualizados", name, email, password });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function list(req, res) {
  try {
    const data = await prisma.user.findMany();
    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
  }
}

export async function listUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExist || !(password === userExist.password)) {
      res.status(400).json({ message: "Senha ou email inválidos" });
    } else {
      res.status(200).json({ message: "Login com sucesso", userExist });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function updateUserPreferences(req, res) {
  try {
    const { userId } = req.params; // Assumindo que o ID do usuário vem nos parâmetros da URL
    const { primaryLanguage, level, purpose } = req.body; // Dados para atualizar no usuário

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Atualiza os campos do usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        primaryLanguage,
        level,
        purpose,
      },
    });

    res.status(200).json({
      message: "Preferências atualizadas com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar preferências do usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
}
export async function uploadImage(req, res) {
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo foi enviado" });
    }
    res
      .status(200)
      .json({ message: "Upload realizado com sucesso!", file: req.file });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erro ao fazer upload", error: err.message });
  }
}
