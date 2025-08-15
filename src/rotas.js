import appleController from './controller/appleController.js'
import carrosController from './controller/carrosController.js'

export function adicionarRotas(api) {
  api.use(appleController);
 api.use(carrosController);
}