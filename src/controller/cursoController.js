import * as repo from '../repository/cursoRepository.js';
import { Router } from "express";
import multer from'multer';

const upload = multer({ dest: 'public/storage' })
const endpoints = Router();

endpoints.get('/curso', async (req, resp) => {
  let registros = await repo.listarCursos();
  resp.send(registros);
})

endpoints.get('/curso/filtrar', async (req, resp) => {
  let registros = await repo.filtrarPorNome(nome);
  resp.send(registros);
})

endpoints.get('/curso/:id', async (req, resp) => {
  let id = req.params.id;
  let registros = await repo.consultarCurso(id);
  resp.send(registros);
})

endpoints.post('/curso', async (req, resp) => {
  let novoCurso = req.body;
  
  let id = await repo.inserirCurso(novoCurso);

  resp.send({
    novoId: id
  })
})


endpoints.put('/curso/:id/imagem', upload.single('img'), async (req, resp) => {
  let caminho = req.file.path;
  let id = req.params.id;
   
  await repo.alterarImagemCurso(id, caminho);
  resp.send();
})

endpoints.put('/curso/:id', async (req, resp) => {
  let id = req.params.id;
  let novosDados = req.body;

  await repo.alterarCurso(id, novosDados);
  resp.send();
})

endpoints.delete('/curso/:id', async (req, resp) => {
  let id = req.params.id;
  await repo.deletarCurso(id);
  resp.send();
})

export default endpoints;