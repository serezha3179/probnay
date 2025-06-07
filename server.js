// import 'dotenv/config';
// require('dotenv').config()
// console.log("process", process.env.PORTN, process.env.PORTN === "8000");
console.log(process.env.PORT === "8000"); 

// const express = require("express");

import express from 'express';
// const nodemailer = require("nodemailer")
import nodemailer from "nodemailer"
import path from 'path';
const __dirname = path.resolve();

const server = express();
const port = process.env.PORT;

console.log(process.env.PORT, process.env.PORT === "8000");  
// const cors = require("cors")

// server.use(cors())

// app.get('/', (req, res) => {
//   const message = "Привет! Сообщение с сервераф.";
// //   res.send(`<!DOCTYPE html><html><head><title>Сообщение</title></head><body>${message}</body></html>`);
// res.send(message)
// });

server.use(express.static(__dirname + '/public')); // что бы могли обращаться к статичным файлам на нашем сервере, статичные файлы  хранятся в папке public
server.use(express.json()); // мидлвара чтобы парсить параметры которые приходят с клиента в json формате

server.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
  // res.send('fffffff')
});

const mytransport = { 
      // name: "www.mail.ru",
      // host: "smtp.mail.ru",
    //   service: "gmail",
    //   name: "smtp.gmail.com",
      // service: "smtp-relay.gmail.com",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use false for STARTTLS; true for SSL on port 465
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      }
}


server.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport(mytransport)
    const { name, phone, message } = req.body;
    console.log(name, phone, message);

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: "Тема письма",
      text: `${name} ${phone} ${message}`,

      html: `
        <p>От кого: ${name}</p>
        <p>Обратная почта: ${phone}</p>
        <p>Сообщение: ${message}</p>
        `,
    }, (error, info) => {
       if (error) {
    console.error("Error sending email: ", error);
     res.status(500).send({ status: 500, message: "not sending letter", error: error.response });
  } else {
    console.log("Email sent: ", info.response);
     res.status(200).send({ status: 200, message: "Успешная отправка" , inform: info.response});
  }
    });

    // return res.status(200).send({ status: 200, message: "Успешная отправка" });

  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});

server.listen(port, () => {
    console.log(`Слушаю порт с номером ${port}`);
} )
