const Joi = require('joi')

const validar = producto => {
    const productoSchema = Joi.object({
        nombre: Joi.string().required(),
        precio: Joi.number().required(),
        descripcion: Joi.string().required(),
        img: Joi.string().required()
    })
    const {
        error
    } = productoSchema.validate(producto)
    if (error) {
        return {
            result: false,
            error
        }
    } else {
        return {
            result: true
        }
    }
}
module.exports = {
    validar
}