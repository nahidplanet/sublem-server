
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY,
	
});
console.log(MAILGUN_API_KEY);
module.exports.mailGun = async (data) => {

	const result = await mg.messages
		.create(sandboxd5f21a6b3ae844a89d60a4f97ef6b867.mailgun.org, {
			from: "Mailgun Sandbox <postmaster@sandboxd5f21a6b3ae844a89d60a4f97ef6b867.mailgun.org>",
			to: data.to,
			subject: data.subject,
			text: data.text,
		});
	return result.id;

}