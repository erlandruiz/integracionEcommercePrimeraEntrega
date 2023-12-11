# primera preentrega-erland-ruiz-rivera
Entrega de primera preentrega subiendo los datos a MongoDB Atlas


# http://localhost:8080/  
Para ingresar al home y ver todos los productos.


# http://localhost:8080/realtimeproducts
Para ver los titulos de los productos , agregar con postman y eliminar con postman

# http://localhost:8080/pagina2.html
Pagina estatica de ayuda para agregar los productos. El delete  si  solo lo hice con postman.

# http://localhost:8080/api/productsmongo
Pagina para ver los productos en Mongo Atlas.

# http://localhost:8080/api/cartsmongo/cid 
Para buscar carrito por ID


# http://localhost:8080/api/cartsmongo   usando el metodo POST , se crea un carrito
       {   
               "products":[
                          

               ]
             
       }

# http://localhost:8080/api/cartsmongo/6574d5b225b51f4d783ee62f/product/6572a3511e95089a27bee8df
Ejemplo de agregar a un carrito con cid = 6574d5b225b51f4d783ee62f  el incremento en uno del producto pid =6572a3511e95089a27bee8df

# http://localhost:8080/api/cartsmongo/6574d5b225b51f4d783ee62f/product/6572a2ea1e95089a27bee8dc

Ejemplo de agregar a un carrito con cid = 6574d5b225b51f4d783ee62f  un nuevo producto con del pid =6572a2ea1e95089a27bee8dc