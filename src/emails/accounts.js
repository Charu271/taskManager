const sgmail = require("@sendgrid/mail");

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = (email, name) => {
  sgmail.send({
    from: "charusachdeva271@gmail.com",
    to: email,
    subject: "Welcome to task manager app",
    text: `Welcome to Task Manager App ${name}. Let me know your experience. `,
    html:
      "<h1>Welcome to TaskManager</h1><img src='../../images/profile-pic.jpg'/>",
  });
};

const cancellationEmail = (email, name) => {
  sgmail.send({
    from: "charusachdeva271@gmail.com",
    to: email,
    subject: "GoodBye",
    text:
      "Please share your experience and do let us know what should we have done to keep you as a customer",
  });
};
module.exports = {
  welcomeEmail,
  cancellationEmail,
};
// sgmail
//   .send({
//     from: "charusachdeva271@gmail.com",
//     to: "charu0012.cse19@chitkara.edu.in",
//     subject: "This is my first email",
//     text: "I hope this mail is recieved",
//   })
//   .then(() => console.log("Email sent"))
//   .catch((e) => console.log(e));
