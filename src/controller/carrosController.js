import * as repo from '../repository/carrosRepository.js';
import multer from'multer';

const upload = multer({ dest: 'public/storage' })
import { Router } from "express";
const endpoints = Router();


endpoints.get('/carros', async (req, resp) => {
  let registros = await repo.listarCarros();
  resp.send(registros);
})


endpoints.get('/carros/filtro', async (req, resp) => {
  let nome = req.query.nome;
  let registros = await repo.filtrarPorNome(nome);
  resp.send(registros);
})


endpoints.get('/carros/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let registros = await repo.consultarCarros(id);
  resp.send(registros);
})

endpoints.post('/carros', async (req, resp) => {
  let novoCarros = req.body;
  let id = await repo.inserirCarros(novoCarros);
  resp.send({ novoId: id });
})

endpoints.put('/carros/:id/imagem', upload.single('img'), async (req, resp) => {
  let caminho = req.file.path;
  let id = req.params.id;
   
  await repo.alterarImagemCarros(id, caminho);
  resp.send();
})

endpoints.put('/carros/:id', async (req, resp) => {
  let id = req.params.id;
  let novosDados = req.body;

  await repo.alterarCarros(id, novosDados);
  resp.send();
})


endpoints.delete('/carros/:id', async (req, resp) => {
  let id = Number(req.params.id);

  await repo.deletarCarros(id);
  resp.send();
})




export default endpoints;