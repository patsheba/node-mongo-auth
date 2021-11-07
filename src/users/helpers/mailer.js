require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(email, code, mailType) {
  try {
    const smtpEndpoint = "smtp.sendgrid.net";

    const port = 465;

    const senderAddress = process.env.SENDER_ADDRESS;

    const toAddress = email;

    const smtpUsername = "apikey";

    const smtpPassword = process.env.SG_APIKEY;
    let subject;
    let body_html;
    if(mailType === 'signup'){
      subject = "Successful Signup";

      // The body of the email for recipients
      body_html = `<!DOCTYPE> 
    <html lang="">
      <body>
        <p>You have successfully signed up to <b>Event Yangu</b>: </p>
      </body>
    </html>`;
    } else if(mailType === 'forgotPassword'){
      subject = "Forgot Password";

      // The body of the email for recipients
      body_html = `<!DOCTYPE> 
    <html lang="">
      <body>
        <p>Your reset code is : </p> <b>${code}</b>
      </body>
    </html>`;
    } else if(mailType === 'resetPassword'){
      subject = "Password reset";

      // The body of the email for recipients
      body_html = `<!DOCTYPE> 
    <html lang="">
      <body>
        <p>Your reset code is : </p> <b>${code}</b>
      </body>
    </html>`;
    } else {
      subject = "Verify your email";

      // The body of the email for recipients
      body_html = `<!DOCTYPE> 
    <html lang="">
      <body>
        <p>Your authentication code is : </p> <b>${code}</b>
      </body>
    </html>`;
    }

    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html,
    };

    let info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}

module.exports = { sendEmail };
