# multi-ai-chat

A chat application that allows users to chat with multiple AIs in order to compare their results.

## Running the app

In order to run the app you need to have an OpenAI API key (get it [here](https://platform.openai.com/account/api-keys)). Once you have a key got [here](https://tillg.github.io/multi-ai-chat/). If you want to avoid entering the OpenAI-Key every time you load the page, you can also add it to the URL like this:

`https://https://tillg.github.io/multi-ai-chat/?OPENAI_API_KEY=sk-xyz`


### Run the app locally

Make a `.env` file:

```bash
REACT_APP_OPENAI_API_KEY=<Your API key>
```

Call it with `source .env` and then run the app with `npm start`.

## Creating a new version

Once you have coded the changes that make up a new version you can create a new version with the following steps:

```bash
git add --all
git commit -m "Commit message"
npm version patch
# or nom version minor
# or nom version major
```

The `npm version patch` command automatically bumps the version in `package.json` and creates a new git tag. It also pushes the new tag to the remote repository.

In order to publish a version:

```bash
# Make sure the version is tagged
# Build it
npm run build

# Simply committing & pushing will make it available under https://tillg.github.io/multi-ai-chat/
git add --all
git commit -m "Built version"
git push
````

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

* Pass the models to compare via URL
* Make sure that in the build & publishing process the API Key is not published.
* Come up with proper error messages, for example when the API key is not set or not accepted
* Store OPENAI_KEY, selected models and passed dialogues in local DB
* Add time measurement and dispaly ait
* Use A12 Widgets only
* Ability to enter specific configurations (i.e. being able to compare GPT-4 with temperature 0 vs temperature 1)
* Check tokens vs rate limits so messages don't get too long

## Done
* 2023-05-16: Pass the OPENAI_KEY and the models to compare via URL
* 2023-05-14: See the result as it comes in from the AI.
* 2023-05-13: Started using A12 Widgets