#!/bin/bash

# navigate to the server directory install npm packages
cd /home/ec2-user/isItOpen/server
npm install

# navigate to the client directory install npm packages 
cd /home/ec2-user/isItOpen/client
npm install
npm run build
