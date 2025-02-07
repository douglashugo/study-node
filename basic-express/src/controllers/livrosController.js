import livros from "../models/Livro.js";
import autores from "../models/Autor.js"

class LivroController {

    static listarLivros = async (req, res) => {
        const listaLivros = await livros.find({});
        res.status(200).json(listaLivros)
    }

    static obterLivro = async (req, res) => {
        try {
            const id = req.params.id;
            const livroEncontrado = await livros.findById(id);
            res.status(200).json(livroEncontrado)
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao obter o livro`});
        }
    }

    static cadastrarLivro = async (req, res) => {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autores.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc} }
            const livroCriado = await livros.create(livroCompleto);
            res.status(201).json({message: "Adicionado com sucesso", livros: livroCriado});
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - Falha ao cadastrar livro`});
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            const novoLivro = await livros.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Livro atualizado com sucesso", livros: novoLivro});
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao atualizar livro`});
        }
    }

    static deletarLivro = async (req, res) => {
        try {
            const livroDeletado = await livros.findByIdAndDelete(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Livro removido com sucesso", livro: livroDeletado});
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao deletar livro`});
        }
    }

    static listarLivrosPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora
            const listaLivrosPorEditora = await livros.find({ editora: editora });
            res.status(200).json({message: "Livro(s) encontrado(s)", livro: listaLivrosPorEditora})
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro interno no servidor` });
        }
    }

};

export default LivroController;