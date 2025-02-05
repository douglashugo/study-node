import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDatabase();
conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});
conexao.once("open", () => {
    console.log("Conexão iniciada com sucesso!!!");
});

const app = express();
routes(app);

app.put("/livros/:id", async (req, res) => {
    const index = await livro.find(x => x.id === req.params.id)
    if (index != -1) {
        livro[index].titulo = req.body.titulo
        res.status(200).json({message: "Livro atualizado com sucesso", livro: livros[index]});
    } else {
        res.status(404).json({message: "Livro não encontrado"})
    }
});

app.delete("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id)
    if (index != -1) {
        livros.splice(index, 1);
        res.status(200).send("Livro removido com sucesso!!!")
    } else {
        res.status(404).send("Livro não encontrado!!!")
    }
});

export default app;