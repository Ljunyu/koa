import nodemailer from "nodemailer"
async function send( mssg ) {
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "993477833@qq.com", // generated ethereal user
      pass: 'lhdioqotizxgbaje' // generated ethereal password
    }
  });
  console.log(mssg)
  let info = await transporter.sendMail({
    from: '"邮件认证" <993477833@qq.com>', // sender address
    to: mssg.email, // list of receivers
    subject: mssg.subject, // Subject line
    text: `您的邀请码是${mssg.code},过期时间是${mssg.expire}`, // plain text body
    html: `过期时间是${mssg.expire}` // html body
  });

   return "Message sent: %s", info.messageId
}
export default send