# burger-builder

A burger builder app built during https://www.udemy.com/react-the-complete-guide-incl-redux.

## Prerequisites

Get a Firebase Realtime Database and put your endpoint URL into .env.development.local under `REACT_APP_API_BASE`. Set up authentication by e-mail / password and place your API key under
`REACT_APP_API_KEY`.

Your database should have an `ingredients` key with data:

```
{
  meat: 0,
  bacon: 0,
  salad: 0,
  cheese: 0
}
```

Or play around with the default number of ingredients.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.