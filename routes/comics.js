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

router.get('/:idComi',  (req,res,next)=>{
    comics.findOne({'id': req.params.idComi}, (err,datos)=>{
        if(err){
            res.json({'error': "Error al hacer la consulta"});
        }else{
            res.status(200).json( datos );
        }
    }); 
  } );
  

router.post('/', async(req,res,next)=>{
    if(!req.body.id || !req.body.titulo || !req.body.autor || !req.body.editorial || !req.body.aniosalida || !req.body.genero || !req.body.resumen){
        res.status(500).send({message: 'Error: Por favor verifique que el body contiene id, titulo, autor, editorial, aniosalida, genero y resumen'})
    }
    else{
        var Comi = Comic({
            id: req.body.id,
            titulo: req.body.titulo,
            autor: req.body.autor,
            editorial: req.body.editorial,
            aniosalida: req.body.aniosalida,
            genero: req.body.genero,
            resumen: req.body.resumen
            
        });
        console.log(Object.keys(req.body).length);
        if(Object.keys(req.body).length !=7){
            res.status(500).send({message: 'Error 500 al agregar el Comic. Datos Incorrectos'});
        }else{
            const existe = await Comic.findOne({'id': req.body.id}).exec();
            if(existe){
                res.status(500).send({message: 'Ese ID ya existe en la base de datos'});
            } else{
                Comi.save((err,data)=>{
                    if(err){
                        res.json({'error': "Error al insertar los datos"});
                        console.log(err);
                    }else{
                        res.status(200).json( data );
                    }
                });
            }
        }
    }
    

});

router.put('/:idComi', async(req,res,next)=>{
    var params = req.body;
    var id=req.params.idComi;
    if(!req.body.id || !req.body.titulo || !req.body.autor || !req.body.editorial || !req.body.aniosalida || !req.body.genero || !req.body.resumen){
        res.status(500).send({message: 'Error: Por favor verifique que el body contiene id, titulo, autor, editorial, aniosalida, genero y resumen. Para modificar parcialmente use PATCH'})
    }
    else{
        if(Object.keys(req.body).length !=7){
            res.status(500).send({message: 'Error 500 al actualizar el Comic. Para modificar parcialmente use PATCH'});
        }else{
            const existe = await Comic.findOne({'id': id}).exec();
            if(existe){
                Comic.findOneAndUpdate({'id': id  },params, function(err,com){
                    if(err){
                        res.status(500).send({message: 'Error 500 al actualizar el Comic'});
                    }else{
                        res.status(200).send(com);	
                    }
                });
            } else{
                res.status(500).send({message: 'Error: No existe esa ID en la base de datos, por favor verifique'});
            }
            
        }
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

router.delete('/:idComi', async(req,res,next)=>{
    const existe = await Comic.findOne({'id': req.params.idComi}).exec();
    if(existe){
        Comic.deleteOne({'id': req.params.idComi},(err)=>{
            if (err){
                res.json({'error': "Error al eliminar"});
            }else{
                res.json({'Mensaje': "OK"});
            }
        });
    }else{
        res.status(500).send({message: 'Error: No existe esa ID en la base de datos, por favor verifique'});
    }
    
});
module.exports = router;
