import { Router } from 'express';
import { DispositivoController } from '../controllers/dispositivo.controller';
import { validate } from '../middlewares/validate';
import { criarDispositivoSchema, atualizarDispositivoSchema } from '../schemas/index';

const router = Router();

router.post('/', validate(criarDispositivoSchema), DispositivoController.criar);
router.get('/', DispositivoController.buscarTodos);
router.get('/:id', DispositivoController.buscarPorId);
router.put('/:id', validate(atualizarDispositivoSchema), DispositivoController.atualizar);
router.delete('/:id', DispositivoController.deletar);

export default router;
