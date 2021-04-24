const fs = require('fs')
const nodemailer = require('nodemailer')


async function getMail() {
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
        subject: 'Mail de prueba desde Node.js (2)',
        html: '<h1 style="color:crimson;">desde tp4 Otro Contenido de prueba desde <span style="color:orangered;">Node.js con Nodemailer</span></h1>'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(info)
    })
}

module.exports = {

    getMail
}