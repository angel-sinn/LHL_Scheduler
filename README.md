# Interview Scheduler

Interview scheduler is a single page React application that allows users to book, edit and cancel interviews. All connected users are able to see updates in real time as this application uses a WebSocket server.

View live application:<a href="https://scheduler-lhl-as.netlify.app/" target="_blank">Interview Scheduler</a>

## Project Stack

**Front-End**: HTML, JavaScript, React, JSX, SASS, Axios  
**Back-End**: Node.js, Express, PostgreSQL  
**Testing**: Storybook, JEST, Cypress  
**Deployment**: Heroku, Netlify

## Project Features

- Users are able to book interviews while specifying an interviewer
- Users are able to navigate through the days to check for available slots
- Users can easily edit their interviews
- Users can cancel their interviews with a confirmation message showing prior to delete
- Users can easily see how many slots are remaining per day
- Multiple users can book or cancel interviews simultaneously with live updates

## Final Product

**:computer: Real-time Experience :computer:**

!["Gif of real-time experience"](https://github.com/angel-sinn/LHL_scheduler/blob/master/docs/app-live.gif)

**:computer: Interview Scheduler Home Page :computer:**

!["Screenshot of home page"](https://github.com/angel-sinn/LHL_scheduler/blob/master/docs/app-home.png)

**:computer: Booking Interview :computer:**

!["Screenshot of form"](https://github.com/angel-sinn/LHL_scheduler/blob/master/docs/app-form.png)

**:computer: Mobile View :computer:**

!["Screenshot of mobile view"](https://github.com/angel-sinn/LHL_scheduler/blob/master/docs/app-mobile.png)

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts

## Setup & Getting Started

Install dependencies with `npm install`
Run `npm start` on local server
