# Facebook automation


- Automate getting group members profile pages 
- Automate sendimg messages with Facebook Messenger


# Bot

- Anti-bot detection aded with puppeteer-extra-plugin-stealth
- Some random event intervals

## Run Instruction

1. clone this project
2. cd to this project
3. Install Nodejs
4. Use command `npm install` to install dependencies
5. Rename file `.env.example` to `.env`, fill facebook email and password 
6. Dont forget to change variable like group link your like to scrape inside `src/group.js` or `src/sendMessage` depending on your usage.
6. `npm run group` for group scrape
7. `npm run message` for sending messages
