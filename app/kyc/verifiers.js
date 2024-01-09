"use server";
import nodemailer from "nodemailer";

export async function whatsappVerifier(number, curRowNumber) {
  return true;
}

export async function mailVerificationLink(email, link) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Email verification for Flexibl",
    text: `Please go to the following link to verify your email account: ${link}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
}

export async function mailVerifier(email, curRowNumber) {
  const link = `${process.env.VERIFICATION_LINK}/email/${btoa(curRowNumber)}`;
  await mailVerificationLink(email, link);
  return true;
}

export async function collegeMailVerifier(email, curRowNumber) {
  const link = `${process.env.VERIFICATION_LINK}/college_email/${btoa(
    curRowNumber
  )}`;
  await mailVerificationLink(email, link);
  return true;
}

// export async function referralVerifier(referral, curRowNumber) {
//   return true;
// }
