import ErroBase from "./ErroBase";

class NaoEncontrado extends ErroBase {
    constructor() {
        super("Página não encontrada", 404)
    }
}

export default NaoEncontrado;