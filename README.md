# websocket-test

Basically a little test of me learning websockets (spoiler alert, I still suck)

## Prerequisities

npm... basically everything afaik

##How to run

Open directory in terminal or command prompt (if you're on Windows)
run "npm run start app.js" or "npm run dev app.js" if you're going to change the code in any way

##How can other people connect?

###Port Forwarding

Open the configuration of your router (usually just type 192.168.0.1 in yur browser)
Find the port forwarding tab
Forward the port "4000" (I used both UDP and TCP cuz im dum dum and don't really know the difference in this use case, use whichever is best for you)
Lastly, share your IP with other people (ideally ones you trust) and connect using http://xxx.xxx.xxx.xxx:4000

###ngrok

Download and install [ngrok](https://ngrok.com) on your system
Log in with your account token
Once the chat server is up and running, run "ngrok http 4000"
Share the link ngrok gives you with others
