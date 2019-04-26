<h1 align="center">Fourth Year Applied Project And Minor Dissertation </h1>
<p align="center">
  <img src = "https://imgur.com/ZnsGF9x.png">
</p>



# Project Details

| Project Details   |     |
| --- | --- |
| **Course** | BSc (Hons) in Software Development  |
| **Module** |  Applied Project and Minor Dissertation |
| **College** | [GMIT](http://www.gmit.ie/) Galway |
| **Students** | [Kevin Barry](https://github.com/kbarry91)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; G00339811<br/>[Cian Gannon](https://github.com/cian2009)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; G00337022 |
| **Project Supervisors** | Mr Martin Kenirons  <br/> Dr. John Healy|
| **Project Title** | Techbook |


# Table Of Contents
- [Project Details](#project-details)
- [Table Of Contents](#table-of-contents)
- [Overview](#overview)
- [Introduction](#introduction)
- [Features](#features)
  * [Application features](#application-features)
  * [User features](#user-features)
- [Video Demo](#video-demo)
- [Dissertation](#dissertation)
- [TypeDocs](#typedocs)
- [Swagger API Documentation](#swagger-api-documentation)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Deploy Project locally](#deploy-project-locally)
  * [Download the Project](#download-the-project)
  * [Download MongoDB](#download-mongodb)
  * [Install required libraries](#install-required-libraries)
  * [Run The Development Server](#run-the-development-server)
- [Deployment](#deployment)
- [Preview](#preview)
  * [Homepage](#homepage)
  * [Profile Page](#profile-page)
  * [Log in Page](#log-in-page)
  * [Register Page](#register-page)
  * [Settings Page](#settings-page)
  * [Friends Page](#friends-page)
  * [About Page](#about-page)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


# Overview
Social media today plays an expanding significant role in society, the information technology industry and the field of computer science. The use of social media is a hot-topic for many organizations, with the aim to identify approaches in which companies can use applications to increase profits and grow product awareness. On a day-to-day basis, users from across the globe are becoming increasingly frustrated, wasting valuable time, scrolling through irrelevant content while companies are wasting money advertising to users outside their market.  In order to achieve the optimal benefits from social media, for both users and businesses, the development of these technologies require approaches that focus on specific human interests and values.


This project aims to deliver a solution by developing a platform with the goal of delivering a social experience that targets a specific user base. As the authors are in the field of computer science the focus of the content will be to appeal to the tech savvy user. The proposed solution will be a web application that will offer a unique online community to users and businesses interested in technology.

# Introduction
The project has been developed as a MEAN stack Angular 6 CRUD Web Application. The initial  project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1. The system utilises a 3 tier architecture using MongoDB, ExpressJs, Angular and NodeJs.


**Techbook** is a social media platform that offers a unique experience offering a community for users interested in technology to communicate.

# Features
## Application features
- An easy to use single page web application with responsive navbar. 
- Full CRUD capabilities with restful API viewable with Swagger.
- Fully functional MongoDB database with restrictions and validation.
- Sensitive data such as passwords is encrypted before adding to database.
- Fully responsive GUI to adapt to all screen sizes.
- Data and posts generated from Reddit API. 
- Server logging system.

## User features
- Can register an account.
- Can log in.
- Can stay logged in using local storage.
- Can log out.
- Can update profile info and upload profile image.
- Can follow / unfollow other users.
- Can subscribe / unsubscribe to posts.
- Can view saved posts.
- Can add a post.
- Can comment on posts.


# Video Demo
To view the video demonstration click the video below.
[![Watch the video](https://imgur.com/iu7wpzq.png)](https://www.youtube.com/watch?v=mqdhf0jrF9I&feature=youtu.be&fbclid=IwAR2RNmdjE7aaxMpW14906my4KMrnEUKKh2uaVOeTRIWzpIIja9fHxM7oG2U)


# Dissertation
Click below to view our the Dissertation PDF for the project. The dissertation contains an in depth view of all aspects of the development from research and design to implementation and final evaluation.

<kbd>[<p align="center"><img src="https://imgur.com/BwbwObU.png" height="500"></img></p>](https://github.com/Final-Year-Project-Cian-Kevin/final-project/blob/master/Dissertation.pdf)</kbd>

----
# TypeDocs
Click below to view the TypeDocs  for the project. This contains all documentation for the angular client.   

<kbd>[<p align="center"><img src="https://imgur.com/qrLgI1w.png" height="300"></img></p>](http://34.243.30.50:3000/typedoc/)</kbd>

----

# Swagger API Documentation
Click below to view the API documentation for the project. This contains all documentation for the API.   

<kbd>[<p align="center"><img src="https://imgur.com/epJt8Mk.png" height="300"></img></p>](http://34.243.30.50:3000/api-docs/)</kbd>

----

# Technologies

<p align="center">
  <img src = "https://imgur.com/IzjUXp5.png">
</p>

Below is a brief list of some of the technologies used. For a comprehensive list of dependencies see [here](https://github.com/Final-Year-Project-Cian-Kevin/final-project/blob/master/package.json)

- **Languages**: 
    - JavaScript
    - TypeScript
    - HTML 
    - CSS
- **Libraries**: 
    - Bootstrap
    - Mongoose
    - Angular Material
- **Frameworks**: 
    - Angular 6.0.1
    - Express
    - Swagger
- **Databases**:
    - MongoDB
- **Environments**: 
    - NodeJs
- **Development Software**
    - Postman
    - Visual Studio Code   
    - Git

# Prerequisites
* MongoDB installed.
* Nodejs installed.
* Git or git bash to clone the project.
* Access to an internet browser.


# Deploy Project locally

## Download the Project
Clone this repository to your machine.
- Navigate to an empty directory
- In command prompt 
```bash
	> git clone https://github.com/Final-Year-Project-Cian-Kevin/final-project.git
```

## Download MongoDB
The project uses MongoDB. To instructions on how to install MongoDB click the link provided below.

[Download Mongodb](https://treehouse.github.io/installation-guides/windows/mongo-windows.html) 

## Install required libraries
After cloning the project some libraries and decencies will be required. This can be achieved by installing and updating the node package manager.

Navigate to the downloaded repository and enter	:
```bash
    > npm install
    > ng update
    > npm update 
```	

## Run The Development Server
To deploy locally navigate to the project directory in cmd. 

Run the following command to build the project and launch the server:

```bash
    > npmstart
```

The server will now be running and connected to the MongoDB. Navigate to ```localhost:3000`` to view the application.

# Deployment
This application is currently deployed on an AWS instance. Click [Here to TechBook live](http://34.243.30.50:3000/index)

# Preview
Below is a preview of some of the applications pages rendered on both a mobile device and PC. _Please note these are the inital screenshots of the pages and may have changed by the time the project is submitted_. To view all pages click [Here for TechBook live](http://34.243.30.50:3000/index). An indepth explanation of each page is available in *System Design* section of the [Dissertation](https://github.com/Final-Year-Project-Cian-Kevin/Dissertation/blob/master/project.pdf). 

## Homepage

Web view          |  Mobile view
:-------------------------:|:-------------------------:
<img src = "https://imgur.com/iu7wpzq.png" height=300>|<img height = 300 src = "https://imgur.com/EcjDWP2.png">

## Profile Page
Web view          |  Mobile view
:-------------------------:|:-------------------------:
<img src = "https://imgur.com/P0jQXTr.png" height=300>|<img height = 300 src = "https://imgur.com/NAcxvo1.png">

## Log in Page
Web view          |  Mobile view
:-------------------------:|:-------------------------:
<img src = "https://imgur.com/5971dv6.png" height=300>|<img height = 300 src = "https://imgur.com/GmdtAyY.png">

## Register Page
Web view          |  Mobile view
:-------------------------:|:-------------------------:
<img src = "https://imgur.com/zL0xXo8.png" height=300>|<img height = 300 src = "https://imgur.com/DRw9UDk.png">

## Settings Page
Web view          |  Mobile view
:-------------------------:|:-------------------------:
<img src = "https://imgur.com/YWCvPvT.png" height=300>|<img height = 300 src = "https://imgur.com/PeI6lTm.png">

## Friends Page
Web view          |  Mobile view
:-------------------------:|:-------------------------:
<img src = "https://imgur.com/qPBaLZb.png" height=300>|<img height = 300 src = "https://imgur.com/YjpegMl.png">
## About Page
Web view          |  Mobile view
:-------------------------:|:-------------------------:
<img src = "https://imgur.com/dlZsXbL.png" height=300>|<img height = 300 src = "https://imgur.com/k8M3u58.png">
