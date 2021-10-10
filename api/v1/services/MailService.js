import nodemailer from 'nodemailer';
import keys from '../../../config/keys.js';
import mailKeys from '../../../config/mailKeys.js';


class MailService {
  constructor() { 
    this.transporter = nodemailer.createTransport({
      host: mailKeys.SMTP_HOST,
      port: mailKeys.SMTP_PORT,
      secure: false,
      auth: {
        user: mailKeys.SMTP_USER,
        pass: mailKeys.SMTP_PASSWORD,
      }
    })
  }


  sendVerificationMail = async (to, id, code) => { 
    await this.transporter.sendMail({
      from: `BeeWeb Love <${mailKeys.SMTP_USER}>`,
      to,
      subject: "Email Verification",
      text:  "",
      html: 
        `
          <div>
            <h1>For Verification Please Click In This Link: </h1>
            <a href="${keys.BASE_URL}/auth/verification/${id}/${code}"><h3>I Am Verification Link, Click Me</h3></a>
          </div>
        `
    })
  }
}

export default new MailService;