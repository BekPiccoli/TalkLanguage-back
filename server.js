import express from "express";
import cors from "cors";
import { Routes as PublicRoutes } from "./routes/public.js";
import { Routes as PrivateRoutes } from "./routes/private.js";

export const server = express();
const port = 3000;
server.use(cors());
server.use(express.json());
PublicRoutes(server);
PrivateRoutes(server);

server.listen(port, () => {
  console.log(`Onlne na porta ${port}`);
});

/*
nodemailer:
bd: bernardonodemailer
pass: JqggaHxAAmSZYzir
UNochapeco:
bd: bernardopiccoli
pass: xwcmbqfdreCnfLOv
*/
