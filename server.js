// const express = require("express");
import express from 'express'
// const nodemailer = require("nodemailer")
import nodemailer from "nodemailer"
import path from 'path';
const __dirname = path.resolve();
const server = express();
const port = 8000;
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


server.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: "smtp.mail.ru",
      // service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use false for STARTTLS; true for SSL on port 465
      auth: {
        // user: "abramkin3179@mail.ru",
        // pass: "i3E0KkEt7rnMryPqZJAH",
        user: "sergeiabramkin.79@gmail.com",
        pass: "remq znfb xcwd irzp"
      },
    });

    const { name, phone, message } = req.body;

    console.log(name, phone, message);

//     const mailOptions = {
//         from: "sergeiabramkin.79@gmail.com",
//         to: "sergeiabramkin.79@gmail.com",
//         subject: "Hello from Nodemailer",
//         text: `${name} ${phone} ${message}`,
//         html: `
//         <p>От кого: ${name}</p>
//         <p>Обратная почта: ${phone}</p>
//         <p>Сообщение: ${message}</p>
//         `,
// };

// await transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("Error sending email: ", error);
//   } else {
//     console.log("Email sent: ", info.response);
//   }
// });

    await transporter.sendMail({
      // from: `${phone}`,
      from: "sergeiabramkin.79@gmail.com",
      // from: 'abramkin3179@mail.ru',
      // to: "abramkin3179@mail.ru",
      to: "sergeiabramkin.79@gmail.com",
      // subject: `${name} (${phone})`,
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
  } else {
    console.log("Email sent: ", info.response);
  }
    });

    return res.status(200).send({ status: 200, message: "Успешная отправка" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});

server.listen(port, () => {
    console.log(`Слушаю порт с номером ${port}`)
} )