# Notes

## Table of Contents

- [Notes](#notes)
  - [Table of Contents](#table-of-contents)
  - [TODO](#todo)
  - [Scribbles](#scribbles)
    - [Apps](#apps)
      - [Posts](#posts)
        - [Models](#models)

## TODO

- [x] Add environment variables
- [ ] Get Posts set up so you can show data.
  - [x] Define a basic artifact for posts
    - json with meta data
    - html content
    - images/js/styles
      - prefer a standard stylesheet
- [x] Logging - Django has predefined logging, start there.
- [x] Testing - Uses Python's standard testing library.
- [ ] Migrations
- [ ] Define how front-end app will work with back end.
  - [ ] build process ect.


## Scribbles

### Apps
- Client (all things client side)
- Server
  - Blog (core app)

#### Posts

##### Models

**Post**
- is_published: boolean
- markup: long string
- javascripts: array(string)
- stylesheets: array(string)
- title
- short_description
- long_description

**Javascripts**
- url

**Stylesheets**
- url

**Images**
- url