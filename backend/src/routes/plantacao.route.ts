import { Router } from 'express';
import { PlantacaoController } from '../controllers/plantacao.controller';
import { validate } from '../middlewares/validate';
import { criarPlantacaoSchema, atualizarPlantacaoSchema } from '../schemas/index';

const router = Router();

router.post('/', validate(criarPlantacaoSchema), PlantacaoController.criar);
router.get('/', PlantacaoController.buscarTodos);
router.get('/:id', PlantacaoController.buscarPorId);
router.get('/usuario/:usuario_id', PlantacaoController.buscarPorUsuario);
router.put('/:id', validate(atualizarPlantacaoSchema), PlantacaoController.atualizar);
router.delete('/:id', PlantacaoController.deletar);

export default router;
