const nodemailer = require('nodemailer');

require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});


function mailBienvenida(email, nickname) {
    transporter;
    let mailOptions = {
        from: 'sofaypeliopiniones@gmail.com',
        to: email,
        subject: 'Gracias por registrarte en Sofá y Peli',
        text: 'Hola ${nickname}! Bienvenido a Sofá y Peli, esperamos que puedas dar tu opinión sobre películas para que los demás usarios puedan decidir si ver una peli o no :).' // o puedes usar `html` para contenido HTML
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

function mailReview(email, nickname, movieTitle) {
    transporter;
    let mailOptions = {
        from: 'sofaypeliopiniones@gmail.com',
        to: email,
        subject: 'Tu reseña ha sido publicada en Sofá y Peli',
        text: `Hola ${nickname}! Tu reseña para la película "${movieTitle}" ha sido publicada en Sofá y Peli. Los administradores revisarán y, si esta incumple la ormativa será eliminada. Gracias por compartir tu opinión.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

module.exports = {
    mailBienvenida,
    mailReview
};
