import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
            const livroResultados = await livros.find()
            .populate("autor")
            .exec();
            res.status(200).json(livroResultados)
        } catch (erro) {
            next(erro)
        }
    }

    static obterLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findById(id)
            .populate("autor", "nome")
            .exec();
            if (livroEncontrado !== null) {
                res.status(200).json(livroEncontrado)
            } else {
                res.status(404).send({ message: `ID do livro não localizado.`})
            }
        } catch (erro) {
            next(erro)
        }
    }

    static cadastrarLivro = async (req, res, next) => {
        const novoLivro = req.body;
        try {
            let livro = new livros(novoLivro);
            const livroCriado = await livro.save();
            res.status(201).json({message: "Adicionado com sucesso", livros: livroCriado});
        } catch (erro) {
            next(erro)
        }
    }

    static atualizarLivro = async (req, res, next) => {
        try {
            const novoLivro = await livros.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Livro atualizado com sucesso", livros: novoLivro});
        } catch (erro) {
            next(erro)
        }
    }

    static deletarLivro = async (req, res, next) => {
        try {
            const livroDeletado = await livros.findByIdAndDelete(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Livro removido com sucesso", livro: livroDeletado});
        } catch (erro) {
            next(erro)
        }
    }

    static listarLivrosPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora
            const listaLivrosPorEditora = await livros.find({ "editora": editora });
            res.status(200).json({message: "Livro(s) encontrado(s)", livro: listaLivrosPorEditora})
        } catch (erro) {
            next(erro)
        }
    }

};

export default LivroController;