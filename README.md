# Scheduler

Scheduler is a single page application (SPA) built with React that allows users to book, edit and cancel interviews. All connected users are able to see updates in real time as this application uses a WebSocket server.

View live application: <a href="https://scheduler-lhl-as.netlify.app/" target="_blank">Scheduler</a>  
(Note: may be a slight delay for the app to load)

## Project Stack

**Front-End**: HTML, JavaScript, React, JSX, SASS, Axios, WebSocket  
**Back-End**: Express, Node, PostgreSQL, WebSocket  
**Testing**: Storybook, JEST, Cypress  
**Deployment**: Heroku, Netlify

## Project Features

- Users can easily see how many slots are remaining per day
- Multiple users can book or cancel interviews simultaneously with live updates
- Application makes API requests to load and persist data. No data is lost after a browser refresh.

## Final Product

**Real-time Experience**

!["Gif of real-time experience"](https://github.com/angel-sinn/LHL_scheduler/blob/master/docs/app-live.gif)

**Booking Interview**

!["Screenshot of form"](https://github.com/angel-sinn/LHL_scheduler/blob/master/docs/app-form.png)

**Mobile View**

!["Screenshot of mobile view"](https://github.com/angel-sinn/LHL_scheduler/blob/master/docs/app-mobile.png)

## Getting Started

You will need to have TWO terminals to run the app.

1. Fork and clone the scheduler-api server: <a href="https://github.com/lighthouse-labs/scheduler-api" target="_blank">scheduler-api</a>

2. Follow the readme instructions to install and setup the database

3. In one terminal, start the scheduler-api server with `npm start`

4. Fork this repository, and clone your fork of the repository

5. Install the dependencies with `npm install`

6. In the second terminal, run the scheduler web server with `npm start`

7. Open your web browser on <http://localhost:8000/> to start using Scheduler!

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
