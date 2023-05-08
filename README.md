# multi-ai-chat

A chat application that allows users to chat with multiple AIs in order to compare their results.

## Running the app

First get an OpenAI API key [here](https://platform.openai.com/account/api-keys). Then make a `.env` file liek so:

```bash
REACT_APP_OPENAI_API_KEY=<Your API key>
```

Call it with `source .env` and then run the app with `npm start`.

## Reading 

### API Usage

* [Check OpenAI token usage on the dashboard](https://platform.openai.com/account/usage)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## To Do

* See the result as it comes in from the AI.
* Use A12 Widgets
* Ability to enter specific configurations (i.e. being able to compare GPT-4 with temperature 0 vs temperature 1)
* Check tokens vs rate limits so messages don't get too long
