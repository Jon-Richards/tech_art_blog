#!/usr/bin/env bash

sudo apt-get update

# Install packages to enable apt to use a repository over https
sudo apt-get install apt-transport-https
sudo apt-get install ca-certificates
sudo apt-get install curl
sudo apt-get install gnupg-agent
sudo apt-get install -y software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add the latest stable Docker repository
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Install docker engine
sudo apt-get update
sudo apt-get install -y docker-ce
sudo apt-get install -y docker-ce-cli
sudo apt-get install -y containerd.io

# Install Docker Compose
# NOTE: If docker-compose throws an error, the URL may need to target a later version.
sudo curl -L https://github.com/docker/compose/releases/download/1.28.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Python
# sudo apt install -y software-properties-common
# sudo add-apt-repository -y ppa:deadsnakes/ppa
# sudo apt update
# sudo apt install -y python3.9

# Set the installed version of python as the default
# sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 10
# sudo apt install -y python3.9-distutils

# Install Pip
# sudo apt install -y python3-pip

echo
echo ---------------------------
echo +++ Provision Complete! +++
echo ---------------------------