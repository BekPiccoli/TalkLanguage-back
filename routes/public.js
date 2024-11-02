import {
  create,
  list,
  remove,
  update,
} from "../controllers/server.controller.js";
export const Routes = (server) => {
  server.post("/Cadastro", create);
  server.delete("/UserData/:id", remove);
  server.patch("/Update/:id", update);
  server.get("/List", list);
};
