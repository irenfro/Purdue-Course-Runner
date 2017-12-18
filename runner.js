var $ = require('cheerio');
var request = require('request');
var env = require('./env');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(env.mail)
var crn = env.crn;
var term = env.term;
var domain = 'https://selfservice.mypurdue.purdue.edu/prod/bwckschd.p_disp_detail_sched?term_in='+term+'&crn_in='+crn;
function checkSpace(err, resp, html) {
    if (err) return console.error(err)
    var parsedHTML = $.load(html);
    parsedHTML('.ddlabel').map(function(i, elem) {
        elem = $(elem);
        if(i==0) { //the first ddlabel is the course name
            var coursename = elem.text();

            //get the number of spots
            parsedHTML('td').map(function(i, elem) {
                elem = $(elem);
                if(i==10) { //the 10th TD is the number of spots available
                    var remaining = elem.text();
                    var msg = coursename+" has " + remaining + " remaining spots as of: " + (new Date()).toString();
                    console.log(msg);
                    if(remaining != 0) {
                        var mailOptions = {
                            from: env.email,
                            to: env.phoneMail,
                            subject: 'Class Updates',
                            text: msg
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    }
                }
            });	
        }
    });
}
request(domain, checkSpace);
setInterval(function(){request(domain, checkSpace);},15*60000);
