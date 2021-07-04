import express from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { userRouter } from "./routes/userRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
