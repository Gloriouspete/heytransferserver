import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'mail.heydata.com.ng', // Replace with your cPanel mail server hostname
  port: 587, // Use the appropriate port (587 for TLS, 465 for SSL)
  secure: false,
  secureConnection: false,
  connectionTimeout: 100000,
  tls: {
    rejectUnauthorized: false
  },// Use false if you're not using SSL
  auth: {
    user: 'hello@heydata.com.ng', // Your cPanel email address
    pass: '12858588Peter', // Your cPanel email password
  },
});




const sendMessage = async (email,sender,recipient,message, link) => {
  const mailOptions = {
    from: '"Heydata Mobile Limited" <hello@heydata.com.ng>', 
    to: recipient,
    subject: `File Transfer from ${email} `,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>File Message from ${email}</title>
      
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #000; padding: 20px; border-radius: 10px; color: #fff;">
        <div class="header" style="text-align: center; color: #ffffff;">
          <h1>${sender || email} sent you a file!</h1>
          <p style="font-size: 16px; line-height: 1.6;">${message || ""}.</p>
        </div>
        
        <div class="otp-container" style="background-color: #0000ff; border-radius: 15px; width: 90px; height: 40px; text-align: center; justify-content: center; margin: 20px auto;">
          <strong class="otp" style="font-size: 22px; color: #fff; line-height: 40px;">${link}</strong>
        </div>
    
        <hr>

    
        <p class="footer" style="font-size: 10px; color: #fff; text-align: center;">Not you? Please ignore this message</p>
      </div>
    </body>
    </html>    
      `,
  };



  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
    return true
  } catch (error) {
    console.log(error);
  }


}







export default sendMessage ;