const axios = require('axios');
const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_USER, SMTP_PASS,DB, REQUEST_TIMEOUT, PORT } = require('./config/db');

const syssave = require('./models/monitoring-logs');

const sysSaveData = (system_stat,mail_stat) => {
    let data = new syssave({
        system_stat,
        mail_stat,
    })
    data.save();
}

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

// Server endpoint to monitor
const serverEndpoint = 'http://localhost:5000/api/health';

// Function to send the email
async function sendEmail() {
  const email = {
    from: SMTP_USER,
    to: 'adityasubham03@gmail.com',
    subject: 'Server Down Alert',
    text: 'The server is currently down.'
  };

  try {
    await transporter.sendMail(email);
    console.log('Email sent:', email);
  } catch (error) {
    console.error('Failed to send email:', email, error);
  }
}

// Function to check server availability
async function checkServer() {
  try {
    var res = await axios.get(serverEndpoint);
    console.log('Server is running.');
  } catch (error) {
    console.error('Server is down. Sending email notification.');
    await sendEmail().then(sysSaveData("Down","Sent"));
  }
}



const startApp = async () => {
    try {
        // Connection With DB
        await connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: REQUEST_TIMEOUT,
        });
        
    
    } catch (err) {
        // console.log("Unable to connect to the database!! Trying again to connect!!");
        startApp();
    }
}

startApp();


checkServer();
// Interval for checking server availability (e.g., every 5 minutes)
const interval = setInterval(checkServer, 5 * 60 * 1000);
