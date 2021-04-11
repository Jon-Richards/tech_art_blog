#!/bin/bash

# Starts an interactive shell in a running docker container. (Specified by the
# -c flag.)

while getopts c: flag
do
  case "${flag}" in
    c) docker exec -it ${OPTARG} /bin/bash;;
  esac
done
