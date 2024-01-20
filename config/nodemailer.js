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
    let mailOptions = {
        from: 'sofaypeliopiniones@gmail.com',
        to: email,
        subject: 'Gracias por registrarte en Sofá y Peli',
        html: `Hola ${nickname}! <br> Bienvenido a Sofá y Peli, esperamos que puedas dar tu opinión sobre películas para que los demás usuarios puedan decidir si ver una peli o no :)`
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
    let mailOptions = {
        from: 'sofaypeliopiniones@gmail.com',
        to: email,
        subject: 'Tu reseña ha sido publicada en Sofá y Peli',
        html: `Hola ${nickname}! <br> Tu reseña para la película "${movieTitle}" ha sido publicada en Sofá y Peli. Los administradores revisarán y, si esta incumple la ormativa será eliminada. <br> Gracias por compartir tu opinión.`
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
