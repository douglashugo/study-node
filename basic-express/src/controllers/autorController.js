import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores(req, res) {
        const listaAutores = await autor.find({});
        res.status(200).json(listaAutores)
    }

    static async obterAutor(req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado)
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao obter autor`});
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({message: "Adicionado com sucesso", autor: novoAutor});
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - Falha ao cadastrar autor`});
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const novoAutor = await autor.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Autor atualizado com sucesso", autor: novoAutor});
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao atualizar autor`});
        }
    }

    static async deletarAutor(req, res) {
        try {
            const autorDeletado = await autor.findByIdAndDelete(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Autor removido com sucesso", autor: autorDeletado});
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao deletar autor`});
        }
    }

};

export default AutorController;