# Tech Art Blog

A place for me to document my explorations, thoughts, and observations on all
things relating to technical art.


## Table of Contents

- [Tech Art Blog](#tech-art-blog)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Project Overview](#project-overview)
  - [Setup](#setup)
  - [Running The Project](#running-the-project)
  - [Using the VM](#using-the-vm)
  - [Apps](#apps)
    - [Blog](#blog)
    - [Pages](#pages)
    - [Articles](#articles)
  - [Scripts](#scripts)
    - [`start.sh`](#startsh)
    - [`attach.sh`](#attachsh)
  - [Additional Notes](#additional-notes)

<a name="prerequisites"></a>
## Prerequisites

- Docker
- Vagrant (optional)
- VirtualBox (optional) 
- Python 3.9.1>=,<4.0 (optional, installed by Docker)
- Node.js 14+ (optional, installed by Docker)


<a name="project_overview"></a>
## Project Overview

The project can be summarized into two sections, `client` and `server`:

**The Client Side**

The client side application is primarily TypeScript and a component based
framework.

**The Server Side**

The server side is a Django project.  Django was chosen due to Python's
proliferation in the technical art domain, being used for various tools and as
a glue layer between applications.

> For a primer on getting started with Django, see Django's official on
> [creating a demo application](https://docs.djangoproject.com/en/3.2/).


<a name="setup"></a>
## Setup

1) Install the [prerequisites](#prerequisites) mentioned above.
2) Place a `.env` file in the `./server` directory.
   > The Django project's root directory is `./server`, therefor it doesn't have
   > visibility on anything above that directory unless explicitly specified
   > by Python.

<a name="running_the_project"></a>
## Running The Project

The project uses Docker to manage its core dependencies, with
`docker-compose.yml` managing each service.  IF you system doesn't support
docker, the project also includes a Vagrant VM that installs Ubuntu and Docker
during provisioning.

> The [Scripts section](#scripts) of this README provides quality of life
> improvements to some of these commands.

**Building an image.**
```
$ docker-compose build
```

**Running the server**
```
$ docker-compose start web
```
It's worth noting that not every service is needed for running the project.  
`docker-compose up` is unnecessary.

**Running individual Docker services**
```
// Runs the "node" service and install lodash as a dev dependency via npm.
$ docker-compose run node npm install --save-dev lodash
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

The project directory is shared with the VM at `/vagrant` directory.  Any
changes there are reflected on the host machine.


<a name="app_overview"></a>
## Apps

Django's concept of an "app" is fairly open to interpretation.  In the case of
this project, an "app" represents a "concern".  As a convention, apps do not
mix concerns and contain **no** foreign keys to other apps.

There are some apps however, e.g. Pages (which contains no models) that are
allowed to reference models in other apps for the purpose of building out a
human readable page.  This is an exception, not the norm.

The project is divided into the following apps:

### Blog
The core app for this project.  Handles overall project configuration.

### Pages
- Generates the web UI.  **Pages contains no models of its own**, but calls
  models from other apps for the purpose of building out HTML templates via its
  own views.

### Articles
- Concerns all things related to blog articles.
- Implements a JSON API for retrieving article information.


<a name="scripts"></a>
## Scripts

The `./scripts` directory provides simple quality of life improvements.

### `start.sh`
Starts a given service and follows Docker's logs for it.
```
$ ./scripts/start.sh <service name>

// Runs the "web" service and follows Docker's logs for it.
$ ./scripts/start.sh web
```

### `attach.sh`
Starts an interactive shell within the specified docker container.  (Assumes
the specified container supports Bash.)
```
$ ./scripts/attach.sh vagrant_web_1
```

<a name="additional_notes"></a>
## Additional Notes

- When using static typechecking with the VM, you may need to install the correct
  version of python and the project's dependencies locally.  Alternatively,
  consider SSHing into the VM and working from there.

- Consider aliasing the `docker-compose` command with something shorter, e.g.
  `dc`.