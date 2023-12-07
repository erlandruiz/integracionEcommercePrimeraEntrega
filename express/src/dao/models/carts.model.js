import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsEsquema = new mongoose.Schema({
    // products: [
    //     {
    //         productId : Number,
    //         qty: Number
    //     }
    // ],

    products: Array,
    
    deleted: {
        type: Boolean,
        default: false,
      }, //para DELETE LOGICO
        
},

{
    timestamps:true,  //Deja la marca de tiempo cuando  grabas el dato, FECHA DE  CREACION , FECHA DE MODIFICACION
    //collection: 'BigUsers' para trabajar datos en plural
    stric: true //sirve para agregar propiedades que no estan definidas dentro el esquema , cuando esta en false se pueden agregar

}




);

export const cartsModelo = mongoose.model(
    cartsCollection,
    cartsEsquema
  );