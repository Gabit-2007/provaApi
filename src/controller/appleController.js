import * as repo from '../repository/appleRepository.js';
import multer from'multer';

const upload = multer({ dest: 'public/storage' })
import { Router } from "express";
const endpoints = Router();


endpoints.get('/apple', async (req, resp) => {
  let registros = await repo.listarProd();
  resp.send(registros);
})


endpoints.get('/apple/filtro', async (req, resp) => {
  let nome = req.query.nome;
  let registros = await repo.filtrarPorNome(nome);
  resp.send(registros);
})


endpoints.get('/apple/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let registros = await repo.consultarProd(id);
  resp.send(registros);
})

endpoints.post('/apple', async (req, resp) => {
  let novoProduto = req.body;

  let id = await repo.inserirProd(novoProduto);
  resp.send({ novoId: id });
})


endpoints.put('/apple/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let novosDados = req.body;

  await repo.alterarProd(id, novosDados);
  resp.send();
})

endpoints.put('/apple/:id/imagem', upload.single('img'), async (req, resp) => {
  let caminho = req.file.path;
  let id = req.params.id;
   
  await repo.alterarImagemApple(id, caminho);
  resp.send();
})

endpoints.delete('/apple/:id', async (req, resp) => {
  let id = Number(req.params.id);

  await repo.deletarProd(id);
  resp.send();
})




export default endpoints;