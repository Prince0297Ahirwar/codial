const nodemailer = require('../config/nodemailer');

exports.newComment  = (comment) => {

    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:"Prince Ahirwar site",
        to:comment.user.email,
        subject:"new comment added",
        html:htmlString
    },(err,info) => {
        if(err){
            console.log("error in sending mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}