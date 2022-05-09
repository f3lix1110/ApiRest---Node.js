const express = require('express');      //empezamos ejecutando el framework de express
const app = express();
const morgan = require('morgan'); // funcion que procesa datos antes de recibirlos

//settings
app.set('port', process.env.PORT || 3000); //establecer el numero de puerto, listo para servicio en la nube o por defecto en el puerto 3000
app.set('json spaces', 2); //para darle un espaciado al json

//middlewares
app.use(morgan('dev')); //ver por consola lo que va llegando al servidor
app.use(express.urlencoded({extended: false})); //para entender y soportar los datos tambien de hmtl
app.use(express.json()); //desde express solicitar la funcion json (permite recibir formatos json)

//routes "para acceder a las rutas"
app.use(require('./routes/index')); 
app.use('/api/tasks',require('./routes/tasks')); //'/api/tasks' para que utilice esa ruta incial

//iniciando el servidor
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
}); //ejecutamos nuestra app en el puerto "x"