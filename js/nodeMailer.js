const express = require('express')
const fs = require('fs')
const nodemailer = require('nodemailer')

async function getMail(productos) {
console.log("holaproducto_"+productos);
let arr=[]
productos.forEach(  producto => {
       arr.push( `<li>
       <p>
           Nombre: ${producto.nombre}
          - Precio: ${producto.precio} 
          - Descripcion: ${producto.descripcion} 
          - Foto: ${producto.img} 
       </p>
   </li>`)
})
    let mail;
    try {
        //Leo un archivo
        mail = await fs.promises.readFile("./correo.dat.txt", 'utf-8')
  } catch (error) {
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
        html: `
        <div>
            <ul>
               ${arr}
            
            </ul>
        </div>`
        
     }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
    })
}

module.exports = {

    getMail
}