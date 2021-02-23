# Tech Art Blog

A place for me to document my explorations, thoughts, and observations on all
things relating to technical art.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Overview](#project_overview)
- [Running the Project](#running_the_project)
- [Using the VM](#using_the_vm)


<a name="prerequisites"></a>
## Prequisites

- Docker
- Vagrant (optional)
- VirtualBox (optional) 
- Python 3.9.1>=,<4.0 (optional, installed by Docker)
- Node.js 14+ (optional, installed by Docker)


<a name="project_overview"></a>
## Project Overview

The project can be summerized into two sections, `client` and `server`:

**The Client Side**

The client side application is primarily TypeScript and a component based
framework.

**The Server Side**

The server side is a Django project.  Django was chosen due to Python's
proliferation in the technical art domain, being used for various tools and as
a glue layer between applications.


<a name="running_the_project"></a>
## Running The Project

The project uses Docker to manage its core dependencies, with
`docker-compose.yml` managing each service.

> This repo includes a Vagrant VM that runs Ubuntu and installs Docker during
provisioning.  You don't __have__ to use the VM to run te project if your
system already supports Docker.

**Building an image.**
```
$ docker-compose build
```

**Running the server**
```
$ docker-compose up
```

**Performing Node/NPM tasks**
```
$ docker-compose node <command> <options>
```

**Attaching to a running container**
```
$ docker exec -it <container name> /bin/bash
```

<a name="using_the_vm"></a>
## Using the VM

The repo comes with a Vagrant VM configured to run Ubuntu 18.04 and install
Docker during provisioning.  If your system doesn't support Docker, but can run
a VM, this is a viable alternative.

**Starting the VM**
```
$ vagrant up
```

**Accessing the VM**
```
$ vagrant ssh
```

The project directory is shared with the VM at `/vagrant`.  Any changes there
will be reflected on the host machine.