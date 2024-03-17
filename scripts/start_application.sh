#!/bin/bash

# start app
cd /home/ec2-user/isItOpen/server
pm2 start npm --name "isItOpen-server" -- start

