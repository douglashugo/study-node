// import http, { createServer } from "http";

// const PORT = 3000;
// const rotas = {
//     "/": "HomePage - Curso Express",
//     "/livros": "Acessando livros",
//     "/autores": "Acessando autores"
// }
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.end(rotas[req.url])
// });

// server.listen(PORT, () => {
//     console.log("Servidor escutando");
// });

// O código acima refere-se a criar um servidor usando a biblioteca http padrão do node.js

import app from "./src/app.js";

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor escutando")
});
