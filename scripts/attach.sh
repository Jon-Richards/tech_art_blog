#!/bin/bash

# Starts an interactive shell within the specified container.  (Assumes the
# container supports Bash.)

docker exec -it ${OPTARG} /bin/bash