# Client Architecture

## Table of Contents

- [Client Architecture](#client-architecture)
  - [Table of Contents](#table-of-contents)
  - [Goal](#goal)
  - [Document Structure](#document-structure)
    - [Navigation](#navigation)
  - [Repository Structure](#repository-structure)

## Goal

Make the front-end flexible enough to use multiple frameworks and designs. The
can be done by creating a "host" UI, and inserting content between each host.

The "client" directory should create static assets that can then be referenced
by the server layer and ultimately served to the end user.


## Document Structure

```
+----------------------+
| Header - static HTML |
+----------------------+
|                      |
| Body - Dynamic       |
|                      |
+----------------------+
| Footer - static HTML |
+----------------------+
```

The header and footer are site specific in that Django is responsible for
rendering them.

The body can be a standalone front-end application.  This could be static HTML,
a rich UI, or a combination of both.


### Navigation

Server side navigation should be used for navigating between pages so that the
application doesn't load unnecessary tools on the same page.


## Repository Structure

- The client directory will govern the front-end code for this django project
  only.
- Each blog entry will have its own codebase with an artifact containing
  HTML, CSS, and JavaScript.  They do not need to be part of this codebase.

