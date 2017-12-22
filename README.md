# USE:

## Prereqs
- Install MySQL
- Create Microsoft AZURE account and select your OCR
  - https://azure.microsoft.com/fr-fr/free/
  - You can select the ocr you want https://azure.microsoft.com/fr-fr/services/cognitive-services/computer-vision/
- create AWS S3 bucket & account
- MAILGUN account
  - If you want to set up a "Nous Contacter" feature then you will need a MAILGUN account
- install node.js
- install npm.js
- install git
- Create OAUTH accounts for Facebook / Google / Twitter etc. if you wish to use them
  - Facebook
  - Google
  - Twitter
- sudo apt-get update
- sudo apt-get install mysql-server
  - Create the user that will be used by upscribers (to be used in configuring variables later)

## Installation
- git clone https://github.com/carbontracking/upscribers.git
- npm install

## Preparation of the env

- create .env file at the root

- SESSION_SECRET='xxx'
  - This secret key is used .... as a session key... this can be absolutely anything
- BUCKET=''
  - Name of the Bucket on your AWS's account. See the value retrieved from step ...
- DB_HOST=''
  - host of the database. localhost as exemple
- DB_USER=''
  - username choose when mysql was installed
- DB_PASSWORD=''
  - password choose when mysql was installed
- DB_NAME=''
  - database's name you're gonna use (see Setup Mysql)
- AWS_ACCESS_KEY_ID=''
  - access key to AWS'root account
- AWS_SECRET_ACCESS_KEY=''
  - secret access key to AWS'root account

default value of the Megaboilerplate

- MAILGUN_USERNAME='postmaster@sandbox67c118365e564798a8864434e4b2a3cb.mailgun.org'
  - Used for "Nous Contacter"
- MAILGUN_PASSWORD='ed49d942fd9e6c11208ee3aacb29df9d'

- FACEBOOK_ID='980220002068787'
- FACEBOOK_SECRET='fb9416c436edd2690c6f6adbd94374d1'
- GOOGLE_ID='814958990796-p1centjebv1k0htp3am05tfg5k10nl0k.apps.googleusercontent.com'
- GOOGLE_SECRET='SyXmZcdT6vPFeqcs0jaPhdVP'
- TWITTER_KEY='6NNBDyJ2TavL407A3lWxPFKBI'
- TWITTER_SECRET='ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa'
  - See the configuration of these API keys : https://github.com/sahat/megaboilerplate#obtaining-api-keys

## Setup MySQL

- from the command line
  - mysql -u user -p (the user is from the variable DB_USER then enter password from DB_PASSWORD in the .env file )
  - create database Upstore; (note: this is the DB_NAME defined in the .env file)

## Run the app
- node server.js (from the root of the installation)

## Mega Boilerplate App (Node.js)

Generated by http://megaboilerplate.com

### Configuration
- **Platform:** node
- **Framework**: express
- **Template Engine**: handlebars
- **CSS Framework**: none
- **CSS Preprocessor**: css
- **JavaScript Framework**: 
- **Build Tool**: none
- **Unit Testing**: none
- **Database**: mysql
- **Authentication**: email,google,twitter,facebook
- **Deployment**: none

### License
The MIT License (MIT)

Copyright (c) 2016 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## UPSCRIBERS

A web application that makes life better for print-challenged kids (and all the others too). 
By print-challenged we mean those who are unable to read, or have difficulty reading, printed materials
* Low-vision
* Learning disabilities (dyslexia etc.)
* Neuro-motor diseases

See [the wiki](https://github.com/carbontracking/upscribers/wiki) for further details


Today students receive learning material in  multiple formats (printed/hand-written/pdf/docx/odt).

This project/webapp will provide the following
* Rapid access to what the student needs
  * Grouping/Filtering of Date/Subject/Topic using meta-data (tagging)
  * A simplified process for conversion to web-native formats (html5/jpeg)
* Simple WYSIWYG transcription (saved as html)
  * Crowd-sourced transcription :  With enough eyes, every kid can read
  * V1.0 : text-entry limited to (h1/h2/h3/lists/bod/italic/underlined) 
  * V2.0 : Integrated OCR to kick-start the transcription process

Accessibility enhancements are
* V1.0 : Font size/color, background color adapted per student
* V2.0 : Text-highlighting as student moves through text
* V2.0 : Text-To-Speech with highlighting

Platform/Tool agnostic : A pure web solution, no plugins, no installation
