import { cartsModelo } from "./models/carts.model.js";


export class CartManagerMongo{
      //Consigue los carts  del MONGO ATLAS
  async getCartsMongo() {
    try {
      return await cartsModelo.find({ deleted: false }).lean();
    } catch (error) {
      console.log(error.messsage);
      return null;
    }
  }
}