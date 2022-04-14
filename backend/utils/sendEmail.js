import nodemailer from "nodemailer"

export const sendMail = async (to, token) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const mail = {
      from: "Ecommerce <ecommerce@gmail.com>",
      to: to,
      subject: "Restablecer contraseña | Ecommerce",
      html: `<a href="${`https://nextjs-ecommerce-aguzzdev.vercel.app/change-password&token=${token}`}">Cambia tu contraseña</a>`,
    }

    await transporter.sendMail(mail)
  } catch (error) {
    console.log(error)
  }
}
