const express = require('express')
const router = express.Router()
const fs = require('fs')
const nodemailer = require('nodemailer')
const model = require('../model/productos')


async function getMail(arr) {

    let mail;
    try {
        //Leo un archivo
        mail = await fs.promises.readFile("./correo.dat.txt", 'utf-8')
        console.log('RD1 ok', mail)
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
        text:"Lista de productos:"+ JSON.stringify(arr, null, 4)
        
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