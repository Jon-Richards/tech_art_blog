# Tech Art Blog

A place for me to document my explorations, thoughts, and observations on all
things relating to technical art.


## Table of Contents

- [Tech Art Blog](#tech-art-blog)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Running The Project](#running-the-project)
  - [Logging](#logging)
  - [Using the VM](#using-the-vm)
    - [Setting Up The VM](#setting-up-the-vm)
      - [Disclaimer:](#disclaimer)
    - [Starting The VM](#starting-the-vm)
  - [Application Structure](#application-structure)
    - [Back-end](#back-end)
      - [Blog](#blog)
      - [Pages](#pages)
      - [Articles](#articles)
    - [Front-end](#front-end)
      - [HTML](#html)
      - [JavaScript](#javascript)
      - [CSS](#css)
  - [Scripts](#scripts)
    - [`start.sh`](#startsh)
    - [`attach.sh`](#attachsh)
  - [Tests](#tests)
    - [Client Side](#client-side)
  - [Additional Notes](#additional-notes)

---

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

---

<a name="prerequisites"></a>
## Prerequisites

- Docker
- VirtualBox 6.1+ (optional)
- Vagrant 2.2.15+ (optional)
- Python 3.9.1>=,<4.0 (optional, installed by Docker)
- Node.js 14+ (optional, installed by Docker)

<a name="setup"></a>
## Setup

1) Install the [prerequisites](#prerequisites) mentioned above.
2) Place a `.env` file in the `./server` directory.
   > The Django project's root directory is `./server`, therefor it doesn't have
   > visibility on anything above that directory unless explicitly specified
   > by Python.

The project uses Docker to manage its core dependencies, with
`docker-compose.yml` managing each service.  IF your system doesn't support
docker, the project also includes a Vagrant VM that installs Ubuntu and Docker
during provisioning.

> VirtualBox has known issues with symbolic links on Windows.  While this
> shouldn't prevent you from running the project, it's less error prone to run
> the `npm install` step on the host machine.

**Building the application for the first time.**
```
$ docker-compose build

// If running on the VM returns an error, try running from the host machine.
$ npm install
$ npm run build:dev
```

---

<a name="running_the_project"></a>
## Running The Project

> The [Scripts section](#scripts) of this README provides quality of life
> improvements to some of these commands.

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

**Running a front-end build**
```
$ docker-compose run npm run build:dev
```

**Watching front-end code for changes**
```
$ docker-compose run npm run build:watch
```

**Running a front-end build for production**
```
$ docker-compose run npm run build:dist
```

**Running the TypeScript compiler in the background**\
(This is purely for feedback within an IDE and will not output any files.)
```
$ docker-compose run npm run typecheck -- --watch
```

<a name="logging"></a>
## Logging

Server logs should be saved to `./server/logs/output.log`.

`$ docker logs` will output logs from a given container, e.g. Django, which
will omit certain messages from a file given the logger settings.
`$ docker-compose logs` will output logs for a **service**, which will reflect
the literal output to the console when written to a file.

Output a container's logs to a file, limit the output to 10m:
```
$ docker logs --tail 10m <container name>
```

Tail a given containers logs, printing onto the last 100 lines:
```
$ docker logs --follow --tail 100 <container name>
```

> [Additional reading on Docker's logging feature.](https://docs.docker.com/config/containers/logging/)

<a name="using_the_vm"></a>
## Using the VM

### Setting Up The VM

The VM is intended as an entirely optional way to run the application in a
Linux environment, even if the host machine uses another OS.  Once provisioned,
the environment can be further customized by the developer, providing an avenue
for Linux based tooling.  For example, the developer may wish to SSH into the
VM and maintain a persistent terminal session via Tmuxinator.

#### Disclaimer:

On Windows hosts, VirtualBox disables symlinking by default, which can create
problems when installing NPM packages.  If you're not on Windows, skip to
[Starting The VM](#starting-the-vm)

> Copied from [https://github.com/npm/npm/issues/992#issuecomment-289935776](https://github.com/npm/npm/issues/992#issuecomment-289935776).

1) Navigate to VirtualBox's installation folder.  Typically, this is
   `cd C:\Program Files\Oracle\VirtualBox`.
2) Right click VirtualBox > Properties > Compatibility and check "Run as
   administrator".
3) `cd "/Program Files/Oracle/VirtualBox"` (use quotes in the path) and run the
   command:
   ```
   .\VBoxManage setextradata VM_NAME VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant 1
   ```
   replacing VM_NAME with your Virtual Machine's name (if you don't know this, in VBox go to Machine > Settings > General > Basic > Name --- also replace SHARE_NAME with the name of your shared folder, if you don't remember this, go to Machine > Settings > Shared Folders.
4) Restart VirtualBox and the VM.  Ensure VirtualBox runs as administrator.

If the above solution doesn't work, consider running npm from the host machine.

### Starting The VM

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

**Navigating to the correct user/directory on the VM.**
```
sudo su
cd /vagrant
```

---

<a name="application-structure"></a>
## Application Structure

<a name="back-end"></a>
### Back-end

The back-end is a Django project.  For more information on Django as a
framework, see
[Django's official documentation](https://docs.djangoproject.com/en/3.2/).

Django's concept of an "app" is fairly open to interpretation.  In the case of
this project, an "app" represents a "concern".  As a convention, apps do not
mix concerns and contain **no** foreign keys to other apps.

There are some apps however, e.g. Pages (which contains no models) that are
allowed to reference models in other apps for the purpose of building out a
human readable page.  This is an exception, not the norm.

The project is divided into the following apps:

#### Blog
The core app for this project.  Handles overall project configuration.

#### Pages
- Generates the web UI.  **Pages contains no models of its own**, but calls
  models from other apps for the purpose of building out HTML templates via its
  own views.

#### Articles
- Concerns all things related to blog articles.
- Implements a JSON API for retrieving article information.


<a name="font-end"></a>
### Front-end

The front-end is a combination of HTML (rendered by Django), TypeScript, and
Sass.

#### HTML

Server-side HTML is rendered by by Django, specifically in the `Pages`
application.  No other application should render HTML.

#### JavaScript

JavaScript is compiled from TypeScript (via webpack) from the `./client/src`
directory.  It also serves as the entry point for Sass.

#### CSS

CSS is written in the form of Sass.

---

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

---

<a name="tests"></a>
## Tests

### Client Side

Client side testing takes the form of both unit and integration testing.  By
convention, unit tests are included next to the code they're testing.
Integration tests are located in the `./client/tests` directory.

Tests are written in [Jest](https://jestjs.io/), with [Puppeteer](https://developers.google.com/web/tools/puppeteer) when a browser environment is necessary.

> Web components require a browser environment to run. At the time of this
> writing, their unit tests target the corresponding component instance via the "Components" page under the "Style Guide" section.  This means that the server
> **must** be running for component unit tests to pass.  This may change in a
> future update.

Running client side tests:
```
$ npm run test
```

<a name="additional_notes"></a>
## Additional Notes

- When using static type checking with the VM, you may need to install the correct
  version of python and the project's dependencies locally.  Alternatively,
  consider SSHing into the VM and working from there.

- Consider aliasing the `docker-compose` command with something shorter, e.g.
  `dc`.

- VSCode
  - ESlint: You may need to add the following ESLint options in the ESLint
    extension's settings for the IDE to lint TypeScript:
    ```
    "eslint.validate": [
      "javascript",
      "typescript",
      "typescriptreact"
    ]
    ``` 