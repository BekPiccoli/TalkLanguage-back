import { login } from "../controllers/server.controller.js";
export const Routes = (server) => {
  server.post("/Login", login);
};
