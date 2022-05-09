const { Router } = require("express"); //requerimos desde express el metodo Router
const router = Router(); //guardamos ese objeto Router en una una constante router el cual permitira crear nuevas rutas

router.get('/test', (req, res) =>{
    const data = {
        "name": "Felix",
        "last name": "Hernandez"
    };
    res.json(data); //responder con un json
});

module.exports = router; //exportarlo