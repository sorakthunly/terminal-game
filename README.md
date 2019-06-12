![image](https://user-images.githubusercontent.com/19909685/59242321-6fa60600-8c4e-11e9-8d82-6b2fea6fd668.png)
Live Application: https://terminal-game.firebaseapp.com

# Terminal Game

The application should accept an ongoing series of user supplied numbers as inputs, and output notifications when certain conditions are met. It should operate as follows:

1. On startup, the program will prompt the user for the number of seconds (X) between outputting the frequency of each number to the screen.
2. Every X seconds the program will display, in frequency descending order, the list of numbers and their frequency.
3. If the user enters 'halt' the timer should pause.
4. If the user enters 'resume' the timer should resume.
5. If the user enters a number that is one of the first 1000 Fibonacci numbers, the system should alert "FIB"
6. If the user enters 'quit', the application should output the numbers and their frequency, a farewell message, and finally terminate

## What's Included

- Unit testing with Jest instead of Karma and Jasmine (performance reason)
- Continuous integration and deployment with S3, Docker and Travis CI
- Continuous integration and deployment with Firebase and Circle CI
- Enhanced linting tools using Prettier with Tslint
- Commit hook for linting with Husky and Lint-staged

## What to Expect

- You can't using `quit` command on frequency and initial input by design choice
- Resuable components are small and may not be necessary. They're there to demonstrate components breakdown
- All tests passed but one test case throws `Not implemented: window.alert` which is a known [jsdom issue](https://github.com/rstacruz/jsdom-global/issues/25)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://github.com/facebook/jest).
