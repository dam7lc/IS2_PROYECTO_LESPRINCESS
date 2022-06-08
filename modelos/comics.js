var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComicSchema = Schema({
    id: Number,
    titulo: String,
    autor: String,
    editorial: String,
    aniosalida:Number,
    genero: String,
    resumen: String
   
})

module.exports = mongoose.model('Comic', ComicSchema);