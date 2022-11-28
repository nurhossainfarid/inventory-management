// // with mail gun
// const formData = require('form-data');
// const Mailgun = require("mailgun.js");
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
// 	username: 'api',
// 	key: process.env.MAILGUN_API_KEY,
// });

// module.exports.sendEmailWithMailGun = async (data) => {
//     const email = await mg.messages
// 	.create("sandboxadd6f902e7d940d5a47ec42cb0a1e4c9.mailgun.org", {
// 		from: data.from,
// 		to: data.to,
// 		subject: data.subject,
// 		text: data.text,
//     })
//     return email.id;
// }

