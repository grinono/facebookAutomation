# Facebook automation

- Automate sendimg messages with FB Messenger
- Automate getting group members profile pages with puppeteer to send messages to these group members.

## Install Instruction

1. clone this project
2. cd to this project
3. Install Nodejs
4. Use command `npm install` to install dependencies
5. Rename file `.env.example` to `.env`, fill facebook email and password 6. Dont forget to change variable inside `src/group.js` or `src/sendMessage` depending on your usage.
6. `npm run group` for group scrape
7. `npm run message` for sending messages
