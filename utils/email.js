const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Reallancing <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      // USING MAILTRAP:

      // host: process.env.EMAIL_HOST,
      // port: process.env.EMAIL_PORT,
      // auth: {
      //   user: process.env.EMAIL_USERNAME,
      //   pass: process.env.EMAIL_PASSWORD
      // }

      // Using Gmail (DON'T USE TOO MUCH BECAUSE OF SPAM)
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html, {
        wordwrap: 130
      })
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Reallancing Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendProposalAcceptance(job, client) {
    // 1) Render HTML based on a pug template
    const subject = 'Reallancing Job Offer';
    const html = pug.renderFile(
      `${__dirname}/../views/email/jobOfferEmail.pug`,
      {
        firstName: this.firstName,
        jobName: job.headline,
        clientEmail: client.email,
        subject
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html, {
        wordwrap: 130
      })
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
};
