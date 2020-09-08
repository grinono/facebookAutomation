# Facebook automation / scraping
Bulk message sending in Facebook messenger. To start growth hacking you stuff.


- Automate getting group members names and messenger urls.

- Automate sendimg messages with Facebook Messenger.


# Bot

- Anti-bot detection added with puppeteer-extra-plugin-stealth
- Some random event intervals
- database saves
- puppeteer chromium browser
- easy extendable

## Run Instruction

1. clone this project
2. cd to this project
3. Install Nodejs
4. Use command `npm install` to install dependencies
5. Rename file `.env.example` to `.env`, fill facebook email and password 
6. Dont forget to the change group URL variable in /src/group.js
6. `npm run group` for group scrape. Records are saved as JSON in dB. So later message sending can use these records. 
7. Change the message you would like to send in message.js then `npm run message` for sending that messages to all group members

If you add other functionally please continue to the project so other can benefit as well.
