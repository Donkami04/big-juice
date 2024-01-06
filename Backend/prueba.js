// import { Resend } from "resend";
const {Resend} = require("resend");
const resend = new Resend("re_5YsW1XHK_2CUTGvcUvWxboPYGngs9K2u2");

const zeroSaleEmail = async (customer, ubication) => {
  await resend.emails.send({
    from: "alertas@bigjuice.com",
    to: "camilo.munerac@gmail.com",
    subject: "Venta en $0 realizada",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
};

zeroSaleEmail()

module.exports = { zeroSaleEmail };
