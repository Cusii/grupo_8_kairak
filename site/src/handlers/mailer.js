const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const util = require('util');
const path = require('path');

const transporter = nodemailer.createTransport({
	host: process.env.MAILER_HOST,
	port: process.env.MAILER_PORT,
	secure: true,
	auth: {
		user: process.env.MAILER_USER,
		pass: process.env.MAILER_PASS
	}
});

exports.sendEmail = async (user,subject,url,file) => {
	const filePath = path.join(__dirname, '..', `views/emails/${file}.ejs`);
	const compilado = ejs.compile(fs.readFileSync(filePath, 'utf-8'));
	const html = compilado({url: url, firstName: user.firstName.toUpperCase()});
	const mailOptions = {
		from: 'Kairak <kairak.videoclub@gmail.com>',
    	to: user.email,
    	subject: subject,
    	html,
	}

	const sendMail = util.promisify(transporter.sendMail, transporter);
	console.log(process.env.MAILER_HOST);
	return sendMail.call(transporter, mailOptions);
}

