# CRU-Bot
CRU-bot is an initiative by the SMU CRU (formerly SMU Campus Crusade for Christ) Servant Team to automate tasks in support of day to day operations and events. Currently, there are several intended features: 

1. Sending daily polls to support the CRUNCH (CRU Lunch) initiative 
2. Run an email server that reports the size of emails
3. Inform members who volunteer hours to book facilities via SMU FBS
 ## File Structure

## Installation
- Make sure npm and Docker Desktop are installed
- Clone this repository
- Run npm install
- Create .env with the following structure: 
```
BOT_MODE=[dev || prod]
DEV_BOT_TOKEN=
PROD_BOT_TOKEN=
NOTION_API_KEY=
GROUP_DATABASE_ID=
```
## Development
- Use `npm run build` to build js files from typescript
- Use `npm run start` to run the bot
## Deployment
- Use `docker build . -t ongkahyuan/cru-bot` to rebuild the docker image
- Use docker desktop to push the image to docker hub
- SSH into the cru bot instance on google cloud
- Run `docker ps` to get the id of the currently running container, and `docker stop [id]` to stop it
- Run `docker pull ongkahyuan/cru-bot` to pull the updated image
- Run `docker run --env_file ./.env ongkahyuan/cru-bot`
## Commands
````
register_group - Registers a group, requires a CRON formatted schedule
edit_scheduled_poll - Edits the schedule for the polls, requires a CRON formatted schedule
start_scheduled_poll - Starts the sending schedule
stop_scheduled_poll - Stops the sending schedule
show_status - Displays bot status
get_time - Gives the current bot time