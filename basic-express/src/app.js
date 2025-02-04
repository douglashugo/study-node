import express from "express";

const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        nome: "Harry Potter",
    },
    {
        id: 2,
        nome: "O Hobbit"
    }
]

function buscarLivro(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id)
    })
}

app.get("/", (req, res) => {
    res.status(200).send('Curso de Express')
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros)
});

app.get("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id)
    res.status(201).json(livros[index])
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso!!!')
});

app.put("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id)
    if (index != -1) {
        livros[index].nome = req.body.nome
        res.status(200).json({message: 'Livro atualizado com sucesso', livro: livros[index]});
    } else {
        res.status(404).json({message: 'Livro não encontrado'})
    }
    
});

export default app;