import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/:id", LivroController.obterLivro);
routes.post("/livros", LivroController.cadastrarLivro);

export default routes;