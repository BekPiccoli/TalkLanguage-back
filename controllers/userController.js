import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(req, res) {

  console.log("Entrou no createUser");


  try {
    const { name, email, password, age } = req.body;
    const emailExist = await prisma.user.findUnique({ where: { email } });
    if (!emailExist) {
      const newUser = await prisma.user.create({
        data: { name, email, password, age },
      });

      console.log("Usuário  criado com sucesso", newUser);
      res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
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
        console.log("Tentativa de exluir um usuáro inexistente");
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
      console.log("Usuários listados:", data);
    } catch (err) {
      console.error(err);
    }
  }


  export async function login(req, res) {
    try {
      console.log("Entrou no login");
      const { email, password } = req.body;
      const userExist = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      console.log("UserExist: ", userExist);
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
    console.log("CHEGOU NA ATUALIOZXAO")
  try {
    const { userId } = req.params;  // Assumindo que o ID do usuário vem nos parâmetros da URL
    const { primaryLanguage, level, purpose } = req.body;  // Dados para atualizar no usuário

    console.log("chegouuuuuuuu no addUserLanguage");
    console.log(userId);
    console.log(primaryLanguage);
    console.log(level);
    console.log(purpose);
    
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