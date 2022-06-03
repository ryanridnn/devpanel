<p align="center">
    <img src="/github/images/preview.png" alt="preview">
</p>

<p align="center">
    <img src="/github/images/stack.png" height="32">
</p>

## Devpanel: Save the important resource of your developer journey.

Take a look at the [live demo](https://devpanel.netlify.app/projects) site here &nbsp; :eyes:

Always confused to save your important developer resources? Now, meet DevPanel. DevPanel let you save your project, repo, or even material.

Devpanel is built to be a command line app. You can add your resources within your terminal (`devpanel add`), but first, you need to start the web app with the `devpanel start` command. Once the server is started, you can visit http://localhost:8080, then you can view, add, edit, or delete the resources.

### Requirements

-   Node.js (my version is 16.50.0)
-   Package manager (npm / yarn / pnpm)
-   Mongo db (my version is 4.4.8)

## Getting Started

1. Clone this repo

    ```sh
    git clone https://github.com/ryanridnn/devpanel.git
    ```

2. Go into the project root directory

    ```sh
    cd devpanel
    ```

3. Install it globally

    ```sh
    npm i -g .

    #or

    yarn global add "file:$PWD"
    ```

4. Starting the server

    ```sh
    devpanel start
    ```

    it will open the DevPanel Web App with your default browser.

5. Add a project/repo
    ```sh
    devpanel add
    ```

## Development Guide

-   Install the pakcages in root directory and frontend directory

    ```sh
    yarn install

    #once done

    cd frontend
    yarn install
    ```

-   Provide your own `.env` file

    In this case you only need to provide it in the root directory. There is `.env.example` file containing environment variable you need to provide for the app.

    The `.env.development` and `.env.production` file in frontend dir is containing some environment variable related to server url and storage url. You should change the `.env.development` file, if you have changed the port where the backend is running.

-   Starting the server

    You can start the backend and frontend separately. By default, the frontend is started on port 3000, and the backend is started on port 8080.

    However you should build the frontend to backend views directory in the end, so both the backend and frontend will be hosted in the same route.

    Once the frontend is built you can visit the http://localhost:8080 and you can acess the api in http://localhost:8080/api.

-   You need to reinstall this package globally, once you have done the development.

    Well, you need to do it if you want your global package to keep updated with the current development version.

## Todo

-   Add note taking feature
-   Make a browser extension
-   Fix some code structure to make it neater
