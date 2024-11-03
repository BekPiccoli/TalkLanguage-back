import { login, createUser } from "../controllers/userController.js";

export const Routes = (server) => {
  server.post("/login", login);
  server.post("/register", createUser);
};
