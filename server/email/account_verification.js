// extend App with server-side functions
Accounts.config({
	sendVerificationEmail: true
});

Accounts.emailTemplates.siteName = "JMail";
Accounts.emailTemplates.from = "JMail Admin <admin@somejmaildomain.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "Welcome to JMail!";
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
   return "Thanks for trying out our cool little app! "
     + " To activate your account, simply click the link below:\n\n"
     + url;
};