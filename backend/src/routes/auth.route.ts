import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { auth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/login', validate(loginSchema), AuthController.login);
router.get('/me', auth, AuthController.perfil);

export default router;
