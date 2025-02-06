import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros(req, res) {
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros)
    }

    static async obterLivro(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado)
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao obter o livro`});
        }
    }

    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({message: "Adicionado com sucesso", livro: novoLivro});
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - Falha ao cadastrar livro`});
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const novoLivro = await livro.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Livro atualizado com sucesso", livro: novoLivro});
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao atualizar livro`});
        }
    }

    static async deletarLivro(req, res) {
        try {
            const livroDeletado = await livro.findByIdAndDelete(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Livro removido com sucesso", livro: livroDeletado});
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao deletar livro`});
        }
    }

};

export default LivroController;