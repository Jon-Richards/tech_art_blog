#!/bin/bash

# Starts a docker service and follows its logs

docker-compose start "$@" && docker-compose logs --follow "$@"