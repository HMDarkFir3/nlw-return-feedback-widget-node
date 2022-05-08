import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "./../mail";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "88cac65e826e59",
    pass: "d029051140e335",
  },
});

export class NodemailMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedback <oi@feedback.com>",
      to: "Henrique Marques <henrique_marques.dev@outlook.com>",
      subject,
      html: body,
    });
  }
}
