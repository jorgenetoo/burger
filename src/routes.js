import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import multerConfig from './config/multer';

const routes = new Router();

const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/products', uploads.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

export default routes;
