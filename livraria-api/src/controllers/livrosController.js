import { autores, livros } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
            const buscaLivros = livros.find();
            req.resultado = buscaLivros;
             
            next();
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
                next(new NaoEncontrado("Id do livro não localizado."));
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
            if (novoLivro !== null) {
                res.status(200).json({message: "Livro atualizado com sucesso", livros: novoLivro}); 
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
            
        } catch (erro) {
            next(erro)
        }
    }

    static deletarLivro = async (req, res, next) => {
        try {
            const livroDeletado = await livros.findByIdAndDelete(req.params.id, req.body, {new: true});
            if (livroDeletado !== null) {
                res.status(200).json({message: "Livro removido com sucesso", livro: livroDeletado});
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
            
        } catch (erro) {
            next(erro)
        }
    }

    static listarLivrosPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaDados(req.query)

            if (busca !== null) {
                const livrosResultado = livros
                .find(busca)
                .populate("autor");

                req.resultado = livrosResultado;
                next();
            } else {
                res.status(200).send([])
            }
           

            
        } catch (erro) {
            next(erro)
        }
    }

};

async function processaDados(parametros) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros
    let busca = {};

    if (minPaginas || maxPaginas) busca.paginas = {}

    if (editora) busca.editora = editora
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" }

    if (minPaginas) busca.paginas.$gte = minPaginas
    if (maxPaginas) busca.paginas.$lte = maxPaginas

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });

        if (autor !== null) {
            busca.autor = autor._id
        } else {
            busca = null;
        }
    }

    return busca
}

export default LivroController;