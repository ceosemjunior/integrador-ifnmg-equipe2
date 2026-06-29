import { Router } from 'express';
import { AlertaController } from '../controllers/alerta.controller.js';
import { validate } from '../middlewares/validate.js';
import { criarAlertaSchema } from '../schemas/index.js';

const router = Router();

router.post('/', validate(criarAlertaSchema), AlertaController.criar);
router.post('/dispositivo-offline', AlertaController.notificarOffline);
router.get('/', AlertaController.buscarTodos);
router.get('/:id', AlertaController.buscarPorId);
router.get('/plantacao/:plantacao_id', AlertaController.buscarPorPlantacao);
router.get('/resumo/:plantacao_id', AlertaController.buscarResumo);
router.get('/usuario/:usuario_id', AlertaController.buscarPorUsuario);
router.delete('/:id', AlertaController.deletar);

export default router;
