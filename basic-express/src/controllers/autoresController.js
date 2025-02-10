import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = async (req, res, next) => {
        try {
            const listaAutores = await autores.find({});
            res.status(200).json(listaAutores)
        } catch (erro) {
            next(erro)
        }
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

    static cadastrarAutor = async (req, res, next) => {
        try {
            let autor = new autores(req.body);
            const novoAutor = await autor.save();
            res.status(201).send(novoAutor.toJSON());
        } catch (erro) {
            next(erro)
        }
    }

    static atualizarAutor = async (req, res, next) => {
        try {
            const novoAutor = await autores.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Autor atualizado com sucesso", autores: novoAutor});
        } catch (erro) {
            next(erro)
        }
    }

    static deletarAutor = async (req, res, next) => {
        try {
            const autorDeletado = await autores.findByIdAndDelete(req.params.id, req.body, {new: true})
            res.status(200).json({message: "Autor removido com sucesso", autores: autorDeletado});
        } catch (erro) {
            next(erro)
        }
    }

};

export default AutorController;