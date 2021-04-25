require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const app = express()
const validaciones = require('./validaciones/productos')
const validacionesCorreos = require('./validaciones/correos')
const model = require('./model/productos')
const modelCorreos = require('./model/correos')
const fs = require('fs')
const nodemailer = require('nodemailer')
const getMail = require('./js/nodeMailer')
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//motor de plantillas view engine
app.set('view engine', 'ejs');
app.set('views', './views');

/*     rutas GET      */
router.get('/', async (req, res, next) => {
    model.producto.find((err, productos) => {
        if (err) throw new Error(`error en lectura de productos: ${err}`)
        if (contador == 1) {
            getMail.getMail(productos)
            console.log(productos);
        }
    })

    res.render('ingreso')
})

router.get('/set-correo', async (req, res, next) => {

    res.render('set-correo')
})
router.get('/listar', (req, res) => {
    model.producto.find((err, productos) => {
        if (err) throw new Error(`error en lectura de productos: ${err}`)
        productos.forEach(producto => {})
        res.render('listar', {
            productos
        })
    })
})

/*    rutas POST    */
let contador = 11;
router.post('/ingreso', async (req, res) => {
    let producto = req.body
    let val = validaciones.validar(producto)
    if (val.result) {
        const productoNuevo = new model.producto(producto)
        await productoNuevo.save(err => {
            if (err) throw new Error(`=======error en escritura de producto: ${err}`)
            console.log('producto incorporado')
            contador--
            while (contador == 0) {
                contador = 11
            }
            res.redirect('/')
        })

    } else {
        res.send(val.error)
    }
})

router.post('/set-correo', (req, res, next) => {
    let correo = req.body
    let val = validacionesCorreos.validarCorreo(correo)
    if (val.result) {

        const correoNuevo = new modelCorreos.correo(correo)
        correoNuevo.save(err => {
            if (err) throw new Error(`=======error en escritura de correo: ${err}`)
            console.log('correo incorporado')
            //funcion para ej 5 escribe sobre archivo txt el mail ingresado
            async function texto() {
                try {
                    //Escribo un archivo 
                    await fs.promises.writeFile('./correo.dat.txt', correo.mail)
                    console.log(correo.mail);
                    //Leo un archivo
                    let dat = await fs.promises.readFile("./correo.dat.txt", 'utf-8')
                    res.redirect('/')

                } catch (error) {
                    console.log(`Error--: ${error}`)
                }
            }
            texto()
        })

    } else {
        res.send(val.error)
    }
})

app.use('/', router)

const PORT = process.env.PORT || 3000

/* ---------------------------------------------------------------------------------- */
/* Conexión a MongoDB */
mongoose.connect(`mongodb+srv://leofizzmod:${process.env.PASSWORD}@cluster0.yz03y.mongodb.net/fizzmod?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error(`Error de conexión en Mongodb: ${err}`)
    console.log('Mongodb conectado!')

    /* ----------- app.listen : pone en marcha el listen del servidor ------------------ */
    const server = app.listen(PORT, () => {
        console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
    })
    server.on('error', error => console.log(`Error en Servidor: ${error}`))
})