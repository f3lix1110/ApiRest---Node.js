const {Router} = require('express');
const router = Router();
const _ = require('underscore'); //requerimos de underscore para recorrer en delete

const tasks = require('../sample.json');  //de los ejemplos vamos almacenar en tasks

//GET
router.get('/', (req, res) => { //metodo get
    res.json(tasks);
})

//GET id
router.get('/:id', (req, res) => { //metodo get
    const {id} = req.params; //obtencion del id
    _.each(tasks, (task, i) => {    
        if(task.id == id) {
            res.json(task); //obtencion del json especifico
        }
    });//each
})

//POST
router.post('/', (req, res) => {  
    const { Titulo, Descripcion, Estatus, FechaEntrega, Comentarios, Responsable, Tags } = req.body;
    
    if (Titulo && Descripcion && Estatus && FechaEntrega){ //campos obligatorios
        const id = tasks.length + 1;  //la longitud de los ejemplos + 1 para ampliar y almacenar
        const newTask = {...req.body, id};
        tasks.push(newTask);
        res.json(tasks);
        //res.send('received');
    }else{
        //res.send('campos obligatorios incompletos')
        res.status(500).res.json({error: 'Campos Obligatorios incompletos.'})
    }
});

//PUT
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const { Titulo, Descripcion, Estatus, FechaEntrega, Comentarios, Responsable, Tags } = req.body;
    if(Titulo && Descripcion && Estatus && FechaEntrega){
        _.each(tasks, (task, i) => {
            if(task.id == id) {
                task.Titulo = Titulo;
                task.Descripcion = Descripcion;
                task.Estatus = Estatus;
                task.FechaEntrega = FechaEntrega;
                task.Comentarios = Comentarios;
                task.Responsable = Responsable;
                task.Tags = Tags;
            }
        });
        res.json(tasks);
    } else{
        res.status(500).json({error: 'Campos obligatorios incompletos'})
    }
});

//DELETE
router.delete('/:id', (req, res) => {
    const {id} = req.params; //obtencion del id
    _.each(tasks, (task, i) => {     //desde underscore solicitamos recorrido "each" de las tareas "tasks", y solicitamos una tarea y un indice
        if(task.id == id) {
            tasks.splice(i,1);  //splice cambia el contenido de un array eliminando elementos existentes
        }
    });
    res.send(tasks); //vizualizar las tareas que quedan
});

module.exports = router;