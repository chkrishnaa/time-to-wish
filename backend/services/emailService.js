// const nodemailer = require("nodemailer");

// // Create reusable transporter
// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE || "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.log("Email service error:", error.message);
//     console.log("Email notifications will not work. Please configure EMAIL_USER and EMAIL_PASSWORD in .env");
//   } else {
//     console.log("Email service is ready to send messages");
//   }
// });

// const sendBirthdayReminder = async (userEmail, userName, birthdayName, birthdayDate) => {
//   try {
//     const formattedDate = new Date(birthdayDate).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//     });

//     const mailOptions = {
//       from: `"TimeToWish" <${process.env.EMAIL_USER}>`,
//       to: userEmail,
//       subject: `🎂 Reminder: ${birthdayName}'s Birthday is Tomorrow!`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//             .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
//             .birthday-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
//             .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
//             .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>🎉 Birthday Reminder!</h1>
//             </div>
//             <div class="content">
//               <p>Hi ${userName},</p>
//               <p>Don't forget! <strong>${birthdayName}'s</strong> birthday is <strong>tomorrow</strong> (${formattedDate})!</p>
              
//               <div class="birthday-card">
//                 <h2 style="margin-top: 0; color: #667eea;">🎂 ${birthdayName}</h2>
//                 <p><strong>Date:</strong> ${formattedDate}</p>
//                 <p>Time to prepare your wishes and celebrate! 🎈</p>
//               </div>
              
//               <p>Make sure to send your best wishes and make their day special!</p>
//               <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/birthdays" class="button">View All Birthdays</a>
//             </div>
//             <div class="footer">
//               <p>This is an automated reminder from TimeToWish</p>
//               <p>You're receiving this because you have birthday reminders enabled.</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `,
//       text: `
//         Hi ${userName},
        
//         Don't forget! ${birthdayName}'s birthday is tomorrow (${formattedDate})!
        
//         Make sure to send your best wishes and make their day special!
        
//         View all birthdays: ${process.env.FRONTEND_URL || "http://localhost:5173"}/birthdays
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${userEmail}: ${info.messageId}`);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error(`Error sending email to ${userEmail}:`, error.message);
//     return { success: false, error: error.message };
//   }
// };

// module.exports = {
//   sendBirthdayReminder,
// };

