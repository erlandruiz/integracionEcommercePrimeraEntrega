import { Router } from 'express';
import { CartManagerMongo } from '../dao/CartManagerMongo.js';
import mongoose from 'mongoose';
import { cartsModelo } from '../dao/models/carts.model.js';

export const router=Router()

const cartManagerMongo = new CartManagerMongo()

router.get('/',async (req,res)=>{

    let carts = []
    try {
        carts = await cartManagerMongo.getCartsMongo()
    } catch (error) {
        console.log(error.messsage)
    }
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({carts});
   
})


router.post('/',async (req,res)=>{

    let {
        products
      } = req.body;
console.log('P',products)
console.log(req.body)
console.log(req.body[0])
console.log(products[0])
      if (!products ) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({
          error: `Los products del carrito son obligatorios`,
        });
      }

      try {
        let resultado = await cartsModelo.create(products[0])
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload: resultado});
      } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`error inesperado en el servidor -Intente mas tarde`, detalle: error.message});
      }

      
})