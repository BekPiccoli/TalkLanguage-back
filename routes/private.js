// routes/private.js

// Middleware
import { uploadImageUser } from "../middleware/uploadImage.js";

// Controllers
// User
import { 
  list, 
  update, 
  remove, 
  updateUserPreferences, 
  listUserById, 
  uploadImage 
} from "../controllers/userController.js";

// Language
import { 
  addUserLanguage, 
  listUserLanguages 
} from "../controllers/languageController.js";

// Exercise
import { 
  addExercise, 
  listExercisesByGroup, 
  getExerciseById 
} from "../controllers/exerciseController.js";

// Exercise Groups
import { 
  listExercisesGroupByLanguage, 
  listAllExercisesGroup 
} from "../controllers/exerciseGroupController.js";

// Progress
import { 
  saveProgress, 
  getProgressByGroup, 
  getPerformance, 
  getOverallProgress,
  getLastGroupProgress 
} from "../controllers/progressController.js";

// Rewards
import { 
  addReward, 
  listRewards 
} from "../controllers/rewardController.js";

// Streaks
import { 
  updateDailyGoal, 
  updateStreakOnLogin 
} from "../controllers/streaksController.js";

export const Routes = (server) => {
  // Rotas para usuários
  server.get("/users", list);
  server.get("/users/:id", listUserById);
  server.patch("/updateuser/:id", update);
  server.delete("/users/:id", remove);

  // Idiomas
  server.post("/users/:userId/languages", updateUserPreferences);
  server.get("/users/:userId/languages", listUserLanguages);

  // Exercícios
  server.post("/exercises", addExercise);
  server.get("/exercises/:groupId", listExercisesByGroup);
  server.get("/exercise/:exerciseId", getExerciseById);

  // Grupos de Exercícios
  server.get("/exercisesGroup", listExercisesGroupByLanguage);
  server.get("/exercisesGroup/all", listAllExercisesGroup);

  // Progresso
  server.post("/progress", saveProgress);
  server.get("/progress/overall/:userId", getOverallProgress);
  server.get("/progress/:groupId/:userId", getProgressByGroup);
  server.get("/performance/:userId", getPerformance);
  server.get("/progressGroup/lastGroup/:userId", getLastGroupProgress);


  server.patch("/usersGoal/:userId/daily-goal", updateDailyGoal);
  server.get("/updateStreakOnLogin/:userId", updateStreakOnLogin);

  // Recompensas
  server.post("/rewards", addReward);
  server.get("/rewards/:userId", listRewards);

  // Upload de Imagem
  server.post("/upload-image", uploadImageUser.single("image"), uploadImage);
};
