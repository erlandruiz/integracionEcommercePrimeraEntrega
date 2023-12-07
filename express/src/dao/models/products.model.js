import mongoose from "mongoose";

const productsColleccion = "products";

const productsEsquema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    thumbnail: Array,

    code: {
      type: String,
      unique: true,
      required: true,
    },
    stock: Number,
    category: String,
    status: { type: Boolean, default: true },

    deleted: {
      type: Boolean,
      default: false,
    }, //para DELETE LOGICO
  },
  {
    timestamps: true, //Deja la marca de tiempo cuando  grabas el dato, FECHA DE  CREACION , FECHA DE MODIFICACION
    //collection: 'BigUsers' para trabajar datos en plural
    stric: true, //sirve para agregar propiedades que no estan definidas dentro el esquema , cuando esta en false se pueden agregar
  }
);

export const productsModelo = mongoose.model(
  productsColleccion,
  productsEsquema
);
