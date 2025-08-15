import * as repo from '../repository/carrosRepository.js';

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
  let novoCurso = req.body;

  let id = await repo.inserirCarros(novoCarro);
  resp.send({ novoId: id });
})


endpoints.put('/carros/:id', async (req, resp) => {
  let id = Number(req.params.id);
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