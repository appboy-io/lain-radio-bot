#!/bin/sh

sudo apt install docker -y

sudo apt install docker-compose -y

sudo systemctl enable docker

sudo systemctl start docker

sudo docker-compose up --build -d

