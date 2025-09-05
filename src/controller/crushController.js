import* as repo2 from "../repository/crushRepository.js";
import { Router } from "express";
import multer from'multer';

const upload = multer({ dest: 'public/storage' })
const endpoints = Router();

endpoints.get('/crush', async (req, resp) => {
  let registros = await repo2.listarCrush();
  resp.send(registros);
})

endpoints.get('/crush/:id/filtrar', async (req, resp) => {
  let nome = req.params.nome;
  let registros = await repo2.filtrarPorNome(nome);
  resp.send(registros);
})

endpoints.get('/crush/:id', async (req, resp) => {
  let id = req.params.id;
  let registros = await repo2.consultarCrush(id);
  resp.send(registros);
})

endpoints.post('/crush', async (req, resp) => {
  let novoCrush = req.body;
  
  let id = await repo2.inserirCrush(novoCrush);

  resp.send({
    novoId: id
  })
})

endpoints.put('/crush/:id', async (req, resp) => {
  let id = req.params.id;
  let novosDados = req.body;

  await repo2.alterarCrush(id, novosDados);
  resp.send();
})

endpoints.put('/crush/:id/imagem', upload.single('img'), async (req, resp) => {
  let caminho = req.file.path;
  let id = req.params.id;
   
  await repo2.alterarImagemCrush(id, caminho);
  resp.send();
})

endpoints.delete('/crush/:id', async (req, resp) => {
  let id = req.params.id;
  await repo2.deletarCrush(id);
  resp.send();
})

export default endpoints;
