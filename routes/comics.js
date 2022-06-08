var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const comics = require('../modelos/comics');
var Comic = require('../modelos/comics');

 /*GET users listing. */


router.get('/', function(req, res, next){
    comics.find({}, (err,datos)=>{

    
    if(err){
        res.json({'error': "Error al hacer la consulta"});
       
    }else{
        res.status(200).json( datos );
    }
}); 
});

router.get('/:idComi', (req,res,next)=>{
    comics.findOne({'id': req.params.idComi}, (err,datos)=>{
        if(err){
            res.json({'error': "Error al hacer la consulta"});
        }else{
            res.status(200).json( datos );
        }
    }); 
  } );
  

router.post('/',(req,res,next)=>{
    var Comi = Comic({
        id: req.body.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        aniosalida: req.body.aniosalida,
        genero: req.body.genero,
        resumen: req.body.resumen
        
    });
    if(Object.keys(req.body).length !=7){
        res.status(500).send({message: 'Error 500 al agregar el Comic. Datos Incorrectos'});
    }else{
    Comi.save((err,data)=>{
        if(err){
            res.json({'error': "Error al insertar los datos"});
        }else{
            res.status(200).json( data );
        }
    });
    }

});

router.put('/:idComi',(req,res,next)=>{
    var params = req.body;
    var id=req.params.idComi;
    if(Object.keys(req.body).length !=7){
        res.status(500).send({message: 'Error 500 al actualizar el Comic. Para modificar parcialmente use PATCH'});
    }else{
        Comic.findOneAndUpdate({'id': id  },params, function(err,com){
            if(err){
                res.status(500).send({message: 'Error 500 al actualizar el Comic'});
            }else{
                res.status(200).send(com);	
            }
        });
    }
    
    
});

router.patch('/:idComi',(req,res,next)=>{
    var params = req.body;
    var id=req.params.idComi;
    Comic.findOneAndUpdate({'id': id  },params, function(err,com){
        if(err){
			res.status(500).send({message: 'Error 500 al actualizar el Comic'});
		}else{
			res.status(200).send(com);	
		}
    });
});
router.delete('/:idComi',(req,res,next)=>{
    Comic.deleteOne({'id': req.params.idComi},(err)=>{
        if (err){
            res.json({'error': "Error al eliminar"});
        }else{
            res.json({'Mensaje': "OK"});
        }
    });
});
module.exports = router;
