import { Router } from 'express';
import * as UsuarioController from '../controllers/usuario.controller';

const router = Router();

router.post('/', UsuarioController.criar);
router.get('/', UsuarioController.listar);

export { router as usuarioRoutes };