import { Router } from 'express';
import { productsModelo } from '../dao/models/products.model.js';
import mongoose from "mongoose";
import { ProductManagerMongo } from '../dao/ProductManagerMongo.js';



export const router=Router()

const productManagerMongo = new ProductManagerMongo()

router.get('/', async(req,res)=>{

        let productos = []
        try {
          
          productos = await productManagerMongo.getProductsMongo()
          
        } catch (error) {
          console.log(error.messsage)
        }
        

            res.setHeader('Content-Type','application/json');
            return res.status(200).json({productos});
})

router.get('/:pid', async(req,res)=>{
  let {pid} = req.params
  let existe 

  if(!mongoose.Types.ObjectId.isValid(pid)){ // con esta instruccion validamos que el ID sea Valido 
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Ingrese un id válido...!!!`})
}

try {
  existe = await productManagerMongo.getProductByIdMongo(pid)
} catch (error) {
      res.setHeader('Content-Type','application/json');
      return res.status(500).json({error:`error inesperado en el servidor -Intente mas tarde`, detalle: error.message});
}

if(!existe){
  res.setHeader('Content-Type','application/json');
  return res.status(400).json({error:`No existe producto con id ${pid}`});
}

res.setHeader('Content-Type','application/json');
return res.status(200).json({producto:existe });


})



router.post('/',async (req,res)=>{//Post agrega datos
  let {
      title,
      description,
      price,
      thumbnail = [],
      code,
      stock,
      category,
      status,
    } = req.body;

    if (!title || !description || !price || !code || !stock || !category) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({
        error: `Los datos title, description, price, code, stock , category y status son obligatorios`,
      });
    }

    let existeCode = false;

    try {
      existeCode = await productsModelo.findOne({deleted:false, code:code}).lean()
    } catch (error) {
      res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`error inesperado en el servidor -Intente mas tarde`, detalle: error.message});
    }

    if (existeCode) {
      res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El producto con code ${code} ya existe en BD..........`});
    }

    try {

      let resultado =  await productManagerMongo.addProductMongo(title, description,price, thumbnail, code, stock, category, status)
      res.setHeader('Content-Type','application/json');
                return res.status(200).json({payload: resultado});
      
    } catch (error) {
      res.setHeader('Content-Type','application/json');
      return res.status(500).json({error:`error inesperado en el servidor -Intente mas tarde`, detalle: error.message});
    }

  
  

   
})

router.put('/:pid', async (req,res )=>{
  let {pid} = req.params
  let existe 

  if(!mongoose.Types.ObjectId.isValid(pid)){ // con esta instruccion validamos que el ID sea Valido 
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Ingrese un id válido...!!!`})
}

try {
  existe = await productManagerMongo.getProductByIdMongo(pid)
} catch (error) {
      res.setHeader('Content-Type','application/json');
      return res.status(500).json({error:`error inesperado en el servidor -Intente mas tarde`, detalle: error.message});
}

if(!existe){
  res.setHeader('Content-Type','application/json');
  return res.status(400).json({error:`No existe producto con id ${pid}`});
}

  //Valida si intenta modificar el id y el code
  if(req.body._id || req.body.code){
          res.setHeader('Content-Type','application/json');
          return res.status(400).json({error:`No se pueden modificar las propiedades "_id" y "code" `});
  }
  let resultado 
  
  try {
      resultado = await productManagerMongo.updateProductMongo(pid, req.body )
      // resultado = await usuariosModelo.updateOne({deleted:false, _id:id}, {$set:{codigo:'999'}, $inc:{edad:5}})
      // console.log(resultado)
      if (resultado.modifiedCount>0) { // Con esta instruccion se verifica que se modifico.
          res.setHeader('Content-Type','application/json');
          return res.status(200).json({payload: "Modificación realizada"});
          
      }else{
              res.setHeader('Content-Type','application/json');
              return res.status(400).json({error:`No se concretó la modificación`});
      }
        

      
  } catch (error) {
          res.setHeader('Content-Type','application/json');
          return res.status(500).json({error:`error inesperado en el servidor -Intente mas tarde`, detalle: error.message});
  }

 


})



router.delete('/:pid', async (req,res )=>{
  let {pid} = req.params
  let existe 

  if(!mongoose.Types.ObjectId.isValid(pid)){ // con esta instruccion validamos que el ID sea Valido 
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Ingrese un id válido...!!!`})
}

try {
  existe = await productManagerMongo.getProductByIdMongo(pid)
} catch (error) {
      res.setHeader('Content-Type','application/json');
      return res.status(500).json({error:`error inesperado en el servidor -Intente mas tarde`, detalle: error.message});
}

if(!existe){
  res.setHeader('Content-Type','application/json');
  return res.status(400).json({error:`No existe producto con id ${pid}`});
}

  let resultado 
  
  try {
   
      resultado = await productManagerMongo.delProductMongo(pid)
      // console.log(resultado)
      if (resultado.modifiedCount>0) { // Con esta instruccion se verifica que se modifico.
          res.setHeader('Content-Type','application/json');
          return res.status(200).json({payload: "Producto eliminado"});
          
      }else{
              res.setHeader('Content-Type','application/json');
              return res.status(400).json({error:`No se concretó la eliminación`});
      }
     
  } catch (error) {
          res.setHeader('Content-Type','application/json');
          return res.status(500).json({error:`error inesperado en el servidor -Intente mas tarde`, detalle: error.message});
  }


})
