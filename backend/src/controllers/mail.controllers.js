const { Resend } = require('resend')
const resend = new Resend('re_Fc8NvG2Q_15NmjYighmpQ7EWQ2KxTVvzb')


const sendMail = async (req, res) => {
    const { data, error } = await resend.emails.send({
        from: 'delivered@resend.dev', // Your sender email
        to: ['kunalkhandelwal108@gmail.com'], // Recipient email
        subject: 'hello world',
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Doctor Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #007bff;
            color: #fff;
            padding: 15px;
            border-radius: 5px 5px 0 0;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #007bff;
        }
        .content p {
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Doctor Application Received</h1>
        </div>
        <div class="content">
            <h2>Application Details</h2>
            <p><strong>Applicant Name:</strong> [Applicant's Full Name]</p>
            <p><strong>Email Address:</strong> [Applicant's Email Address]</p>
            <p><strong>Contact Number:</strong> [Applicant's Contact Number]</p>
            <p><strong>Specialization:</strong> [Doctor's Specialization]</p>
            <p><strong>Experience:</strong> [Years of Experience]</p>
            <p><strong>Qualification:</strong> [Doctor's Qualification]</p>
            <p><strong>Documents Submitted:</strong></p>
            <ul>
                <li>Resume/CV</li>
                <li>Medical License</li>
                <li>Degree Certificates</li>
                <!-- Add other document types if applicable -->
            </ul>
            <p>Please review the application and documents at your earliest convenience.</p>
            <p>To view the full application and download the submitted documents, please visit the admin panel using the following link:</p>
            <p><a href="[Admin Panel URL]">View Application</a></p>
        </div>
        <div class="footer">
            <p>This email was sent automatically. Please do not reply.</p>
        </div>
    </div>
</body>
</html>

        `,
    })

    if (error) {
        return res.status(400).json({ error });
    }

    res.status(200).json({ data });
}

module.exports = { sendMail }