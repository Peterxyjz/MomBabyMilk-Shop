import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

interface SendMailOptions {
  email: string
  subject: string
  html: string
}

const sendMail = async ({ email, subject, html }: SendMailOptions): Promise<nodemailer.SentMessageInfo> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD
    }
  })

  const message = {
    from: 'Admin From MonBabyMilk',
    to: email,
    subject: subject,
    html: html
  }

  const result = await transporter.sendMail(message)
  return result
}

export default sendMail
