# Purdue Course Watcher
This is a node app that will send you a text message per hour if a slot opens up in a course.

### Instructions
1. Clone the repo, copy `env.example.js` into `env.js`
2. Add your email and password to the mail object.  for the phonne email it depends on your carrier see this link for the correct one to use: [link](https://20somethingfinance.com/how-to-send-text-messages-sms-via-email-for-free/)
3. Set the CRN and 'term' quantifier, as per the myPurdue course catalog
	* i.e. for Fall 2016, the term would be `201710`.
	* Spring 2017 is `201720`.
4. Start the runner script
