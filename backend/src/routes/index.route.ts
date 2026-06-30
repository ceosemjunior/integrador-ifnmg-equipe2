import { Router } from 'express';
import authRoutes from './auth.route';
import usuarioRoutes from './usuario.route';
import dispositivoRoutes from './dispositivo.route';
import plantacaoRoutes from './plantacao.route';
import sensorRoutes from './sensor.route';
import plantacaoSensorRoutes from './plantacao-sensor.route';
import leituraRoutes from './leitura.route';
import alertaRoutes from './alerta.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/dispositivos', dispositivoRoutes);
router.use('/plantacoes', plantacaoRoutes);
router.use('/sensores', sensorRoutes);
router.use('/plantacoes-sensores', plantacaoSensorRoutes);
router.use('/leituras', leituraRoutes);
router.use('/alertas', alertaRoutes);

export default router;
