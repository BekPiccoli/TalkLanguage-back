// routes/private.js
import { uploadImageUser } from "../middleware/uploadImage.js";

import {
  list,
  update,
  remove,
  updateUserPreferences,
  listUserById,
  uploadImage,
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
  server.post("/upload-image", uploadImageUser.single("image"), uploadImage);
};
