# Student-Mentor Agenda

This project is a solution of "CareerFoundry CodeChallenge -
Frontend" by Jeyson Buitrago Cepeda

## Background

One of the things our students frequently mention as being an important and positive part of the course is the possibility to talk with their mentors via video conferencing. This is one of the ways we offer personalized mentorship to our students, something that’s not so common in online courses.

To help both mentors and students manage these calls, our platform needs a calendar or agenda interface where students can book an appointment and schedule calls with their mentors at a time that works for both mentor and student. This is what you’ll be working on in this challenge.

## About the challenge

In this code challenge, you’ll be creating the frontend of the booking calendar mentioned above, enabling students to schedule a call with their mentors. You can find the user stories for this feature below the description of the challenge.
Since you don't have access to the backend engineers, you might need to document for them the requirements for the API endpoints.

You can do the challenge using the programming language with which you are most comfortable. At CareerFoundry, we use React as a framework in the frontend. It’s preferred, but not required, that you use them.

We want to see your working process and how you organize and execute your ideas. We encourage you to describe your design decisions in the README file or through any other method that you find relevant. In addition, please include instructions about how to run your project and automated test suite.

Please don't spend more than four hours on the test. Try to find a simple solution, and if you don't finish everything, don't worry! We are most interested in understanding your working process.

## Submitting your challenge
Once you’re done, send the link of a public/or/private repository containing your code. We will reach out to you when our evaluation is complete.

## User stories

As a student
I want to book a call with my mentor
So that I can have a mentoring session during my course
API documentation: https://cfcalendar.docs.apiary.io/

### Scenario 1:
Given I'm in the calendar page
When I click on a date
Then I see all the time slots containing the available and already allocated call sessions

### Scenario 2:
Given I have chosen a date on the calendar page
When I click on a free time slot
Then I see a field where I type the reason for the call

And I click on the button Confirm Call
Then I see a confirmation message with the date, time, and reason for my call

### Scenario 3:
Given I have chosen a date in the calendar page
When I click on a time slot that has already been allocated to a call Then I see an error message about the allocated
slot

## Requirements / Assumptions:
The confirmation must be stored in a database of your choice.
Allocated slots from the external api might change any time.
A call will always take 1 full hour and starts at the full hour.
Our mentors are superheroes and work 24/7.
If there is an allocated slot within the hour, the full hour is considered unavailable.

# Technical details and more assumptions

- Once the app is loaded, it assume that the student is already logged in and the mentor id is defined, it means that there is no session validation
- The mentor id is always iqual to '1'
- The external time slots comming from the end-point indicated in https://cfcalendar.docs.apiary.io/#reference/0/mentor's-agenda/list-all-allocated-slots, are shown using the 'warn' color
- The local time slots, which are the video calls requested by the student, are shown using the 'primary' color
- The app is responsive, it works in mobile, tablet and desktop
- Due to time constraints, I did not use a database, I used the browser localStorage.  However, all the DB logic is separated in a service which could be easily changed and persist the data by sending it to a backend integrated with a DB
- Due to time constraints, tests are pending, and save and get end-points documentations are pending


# Angular

## To run it

Run `npm install` and then `npm start` for a dev server. Navigate to `http://localhost:4200/`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
