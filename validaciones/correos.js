const Joi = require('joi')

const validarCorreo = producto => {
    const productoSchema = Joi.object({
        mail: Joi.string().email()
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
    validarCorreo
}