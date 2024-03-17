#!/bin/bash

# stop previous pm2 process
sudo pm2 stop all

# update package manager and install Node.js
sudo yum update -y
sudo yum install -y nodejs npm

# install pm2 to restart app in case of failure
sudo npm install -g pm2
