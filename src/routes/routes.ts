import { Router } from "express";
const router = Router()
import { Request, Response } from 'express';
import {Products} from '../../index';
import  {ProductId}  from '../../index';
router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to my e-commerce!');
  });
  router.get('/products',Products)
  router.get('/products/:id',ProductId)
  //RUTAS A HACER
router.post('/')
router.post('/')
router.put('/:pid')
router.delete('/:pid')
router.get('/:cartid')
router.post('/:cid/product/:pid')
export default router