[![scheduler](https://img.shields.io/circleci/build/github/letsandeepio/scheduler)](https://github.com/letsandeepio/scheduler)

# Interview Scheduler

Interview Scheduler is a Single Page Application (SPA) primarily built using React and other modern web technologies. The app achieves real-time connectivity using a web socket connection and updates data in realtime on all connected clients. A Redux like custom reducer hook is used for global state management locally. CDD (Component Driven Development) & TDD (Test Driven Development) is used for thorough testing of components in isolation, followed by integration & End-to-End testing for quality assurance purposes.

## Front-End & Back-End

App uses REST API to communicate with the back-end server (built using Node.JS, Websockets and Express.JS). For database connectivity, PostgreSQL, a powerful, open-source object-relational database system is provided through Heroku Provisioned Services. The back-end is currently deployed using HerokuApp at: which the app connects to at . (Demo note: Please allow the Heroku dyno to warm up after 30 minutes of inactivity on the server part)

The front-end follows CI/CD for real-time deployment after each successful build and testing and is currently deployed at .

## CI/CD Pipeline

The project is built using modern web development tooling and practices. Continuous Integration is achieved through Circle CI auto-build, testing & deploy tools. Netlify is used for Continuous Delivery which uses the production branch on Github for automatic deployments.

## Testing

The app uses Test-Driven Development and achieves Test Coverage percentage of 91.84% (as reported by Istanbul.js) through the use of following testing tools

### Storybook

Storybook is used to build, design & test the components in isolation. It acts as a testbed for visual design & to catch inconsistencies before the integration phase. Snapshot testing using JEST & Storybook for consistent design language for the components is currently under TO-DO.

### Jest

Jest is used to test the logic & individual components as well as their behaviour during the integration phase.

### Cypress

Cypress is used to modelling user behaviour and test for real-time app feedback for end-to-end testing using most common task patterns e.g. Creating, Editing & Deleting an appointment.

### Code Coverage
