import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function create(req, res) {
  try {
    const { name, email, password } = req.body;
    const emailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!emailExist) {
      await prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso", name, email });
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
  console.log("Efetuando login");
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log("UserExist: ", userExist);
    if (!userExist || !(password === userExist.password)) {
      res.status(400).json({ message: "Senha ou email inválidos" });
    } else {
      res.status(200).json({ message: "Login com sucesso", email });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}
