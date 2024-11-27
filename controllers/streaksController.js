import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function updateDailyGoal(req, res) {
    console.log("updateDailyGoal");
    console.log(req.params);
    console.log(req.body);
    console.log(req.body.dailyGoal);

    const { userId } = req.params;
    const { dailyGoal } = req.body;
  
    if (!dailyGoal || dailyGoal < 1) {
      return res.status(400).json({ message: "Meta diária inválida" });
    }
  
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { dailyGoal },
      });
  
      res.status(200).json({
        message: "Meta diária atualizada com sucesso",
        dailyGoal: updatedUser.dailyGoal,
      });
    } catch (err) {
      console.error("Erro ao atualizar meta diária:", err);
      res.status(500).json({ message: "Erro ao atualizar meta diária." });
    }
  }

  export async function updateStreakOnLogin(req, res) {
    const { userId } = req.params;
  
    console.log("updateStreakOnLogin");
    console.log("User: " + userId);
    console.log(req.body);
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      const today = new Date().toISOString().split("T")[0];
      const lastLogin = user.lastLogin ? user.lastLogin.toISOString().split("T")[0] : null;
  
      let updatedStreak = user.streak || 0;
  
      if (lastLogin !== today) {
        if (lastLogin && new Date(lastLogin).getTime() === new Date(today).getTime() - 86400000) {
          updatedStreak += 1; // Increment streak
        } else {
          updatedStreak = 1; // Reset streak
        }
  
        await prisma.user.update({
          where: { id: userId },
          data: { streak: updatedStreak, lastLogin: new Date() },
        });
      }
  
      res.status(200).json({ streak: updatedStreak });
    } catch (err) {
      console.error("Erro ao atualizar streak:", err);
      res.status(500).json({ message: "Erro ao atualizar streak." });
    }
  }
  