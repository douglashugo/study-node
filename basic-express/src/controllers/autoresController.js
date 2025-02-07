import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = async (req, res) => {
        const listaAutores = await autores.find({});
        res.status(200).json(listaAutores)
    }

    static obterAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorEncontrado = await autores.findById(id);
            if (autorEncontrado !== null) {
                res.status(200).send(autorEncontrado);
            } else {
                res.status(404).send({ message: "ID do Autor não localizado."});
            }
        } catch (erro) {
            next(erro)
        }
    }

    static cadastrarAutor = async (req, res) => {
        try {
            const novoAutor = await autores.create(req.body);
            res.status(201).json({message: "Adicionado com sucesso", autores: novoAutor});
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - Falha ao cadastrar autor`});
        }
    }

    static atualizarAutor = async (req, res) => {
        try {
            const novoAutor = await autores.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Autor atualizado com sucesso", autores: novoAutor});
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao atualizar autor`});
        }
    }

    static deletarAutor = async (req, res) => {
        try {
            const autorDeletado = await autores.findByIdAndDelete(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Autor removido com sucesso", autores: autorDeletado});
        } catch (error) {
            res.status(500).json({message: `${error.message} - Falha ao deletar autor`});
        }
    }

};

export default AutorController;