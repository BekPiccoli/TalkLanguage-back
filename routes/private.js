// routes/private.js
import {
  list,
  update,
  remove,
  updateUserPreferences,
  listUserById,
} from "../controllers/userController.js";
import {
  addUserLanguage,
  listUserLanguages,
} from "../controllers/languageController.js";
import {
  addExercise,
  listExercisesByGroup,
} from "../controllers/exerciseController.js";
import { updateProgress } from "../controllers/progressController.js";
import { addReward, listRewards } from "../controllers/rewardController.js";
import {
  listExercisesGroupByLanguage,
  listAllExercisesGroup,
} from "../controllers/exerciseGroupController.js";

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
  server.get("/users/:id", listUserById);

  // Rotas de idiomas
  server.post("/users/:userId/languages", updateUserPreferences);
  server.get("/users/:userId/languages", listUserLanguages);

  // Rotas de exercícios
  server.post("/exercises", addExercise);
  server.get("/exercises/:exerciseGroupId", listExercisesByGroup);
  server.get("/exercisesGroup", listExercisesGroupByLanguage);
  server.get("/exercisesGroup/all", listAllExercisesGroup);

  // Rotas de progresso
  server.patch("/progress", updateProgress);

  // Rotas de recompensas
  server.post("/rewards", addReward);
  server.get("/rewards/:userId", listRewards);

  // Rotas para upload de fotos
};
