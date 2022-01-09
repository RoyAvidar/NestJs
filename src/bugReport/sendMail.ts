import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

async function main() {
    const hostname = "hostname from account page";
    const userName = "username from account page";
    const userPassword = "password from account page";

    const transporter = nodemailer.createTransport({
        host: hostname,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: userName,
      pass: userPassword,
    },
    logger: true
    })
}