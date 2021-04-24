const {
    string
} = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productoSchema = new Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    img: String
})
const producto = mongoose.model('productos', productoSchema)
module.exports = {
    producto
}