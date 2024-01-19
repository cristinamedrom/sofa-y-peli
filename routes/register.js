const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const mailBienvenida = require('../config/nodemailer');
const prisma = new PrismaClient();



module.exports = router;
