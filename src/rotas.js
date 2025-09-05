import appleController from './controller/appleController.js'
import carrosController from './controller/carrosController.js'
import crushController from './controller/crushController.js'
import cursoController from './controller/cursoController.js'
import express from 'express'

export function adicionarRotas(api) {
  api.use('/public/storage', express.static('public/storage'))
  api.use(appleController);
  api.use(carrosController);
  api.use(crushController);
  api.use(cursoController);
}