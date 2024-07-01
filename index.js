const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//conexion con la base de datos 
mongoose
//.connect('mongodb://127.0.0.1:27017/empleados')
.connect('mongodb+srv://EduGlz21:1234@empleados.mlkagze.mongodb.net/empleados?retryWrites=true&w=majority&appName=empleados')

.then((x)=>{
    console.log(`Conectado exitosamente a la base de datos: ${x.connections[0].name}`)
})
.catch((error)=>{
    console.log('Error de conexión',error.reason)
})
//servidor web 
const empleadoRouter=require('./routes/empleado.routes')
const app=express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:false,
    })
)   
app.use(cors())
app.use('/api',empleadoRouter)

//habilitar el puerto
const port=process.env.PORT || 4000
const server=app.listen(port,()=>{
    console.log('Servidor escuchando en el puerto '+port)

})

/*manejador de error 404
app.use((req,res,next)=>{
    next(Error(404))
})**/

//manejador de errores
app.use(function(err,req,res,next){
    console.log(err.message)
    if(!err.statusCode) err.statusCode=500
    res.status(err.statusCode).send(err.message)
})
