 const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 const productoSchema = new Schema({
     mail: String,
 })
 const correo = mongoose.model('correos', productoSchema)
 module.exports = {
     correo
 }