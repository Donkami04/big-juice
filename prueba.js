import { Resend } from 'resend';

const resend = new Resend('re_5YsW1XHK_2CUTGvcUvWxboPYGngs9K2u2');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'camilo.munerac@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});