const transporter = require("../dbConfig/nodeMailerTransport");

const sendEmail = async (email, name) => {
  try {
    const info = await transporter.sendMail(
      {
        to: email,
        subject: `Welcome to Emmart Store, Click to win $100,0000 for freee`,
        from: "Emmart Platform",
        text: `Hello ${name}, Welcome to Emmart Store. We are glad to have you. Get ready to enjoyyyyyyy`,
        replyTo: "emmanuelabiodun041@gmail.com",
      },
      // (err, info) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("Email Sent");
      //     return info
      //   }
      // }
    );
    return info
  } catch (error) {
    console.log(error);
    throw error
  }
};

module.exports = sendEmail;
