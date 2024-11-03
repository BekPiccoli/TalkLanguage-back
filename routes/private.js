// routes/private.js
import { list, update, remove } from "../controllers/userController.js";
import { addUserLanguage, listUserLanguages } from "../controllers/languageController.js";
import { addExercise, listExercisesByGroup } from "../controllers/exerciseController.js";
import { updateProgress } from "../controllers/progressController.js";
import { addReward, listRewards } from "../controllers/rewardController.js";


// TODO: Implementar middleware de autenticação

// function autenticate(req, res, next) {
//   // Middleware de autenticação
//   const token = req.headers.authorization;

//   console.log("Token recebido:", token);

//   if (!token) return res.status(401).json({ message: "Token não fornecido" });
//   // Aqui você pode adicionar lógica para validar o token
  
//   next();
// }

export const Routes = (server) => {
  // Rotas para usuários autenticados
  server.get("/users", list);
  server.patch("/users/:id", update);
  server.delete("/users/:id", remove);

  // Rotas de idiomas
  server.post("/users/:userId/languages", addUserLanguage);
  server.get("/users/:userId/languages", listUserLanguages);

  // Rotas de exercícios
  server.post("/exercises", addExercise);
  server.get("/exercises/:exerciseGroupId", listExercisesByGroup);

  // Rotas de progresso
  server.patch("/progress", updateProgress);

  // Rotas de recompensas
  server.post("/rewards", addReward);
  server.get("/rewards/:userId", listRewards);
};
