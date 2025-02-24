import { livros } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

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
            const busca = processaDados(req.query)
            const listaLivrosPorEditora = await livros.find(busca);

            res.status(200).json({message: "Livro(s) encontrado(s)", livro: listaLivrosPorEditora})
        } catch (erro) {
            next(erro)
        }
    }

};

function processaDados(parametros) {
    const { editora, titulo, minPaginas, maxPaginas } = parametros
    const busca = {};

    if (minPaginas || maxPaginas) busca.paginas = {}

    if (editora) busca.editora = editora
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" }

    if (minPaginas) busca.paginas.$gte = minPaginas
    if (maxPaginas) busca.paginas.$lte = maxPaginas

    return busca
}

export default LivroController;