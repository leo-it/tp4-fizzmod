const express = require('express')
const router = express.Router()
const fs = require('fs')
const nodemailer = require('nodemailer')
const model = require('../model/productos')


async function getMail(productos) {
console.log("holaproducto_"+productos);
let arr=[]
 productos.forEach(  producto => {
    arr.push(`Siguiente Producto-->   Nombre: ${producto.nombre}, precio: ${producto.precio}, Descripción: ${producto.descripcion}.  `)
    console.log(producto);
})



    let mail;
    try {
        //Leo un archivo
        mail = await fs.promises.readFile("./correo.dat.txt", 'utf-8')
/*         console.log('RD1 ok', mail)
 */    } catch (error) {
        console.log(`Error--: ${error}`)
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'leo.pruebas123.db@gmail.com',
            pass: '29prueba'
        }
    })

    const mailOptions = {
        from: 'leo.pruebas123.db@gmail.com',
        to: mail,
        subject: 'TP4 Leonardo Sainz NodeMailer',
        text:"" + arr
        
        /* productos.forEach(function(producto){ 
            `nombre${producto}`
        })
         */
        /*    "Lista de productos:"+ JSON.stringify(producto, null, 4) */

     }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
     /*    console.log(info) */
    })
}

module.exports = {

    getMail
}