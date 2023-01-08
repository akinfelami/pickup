# Cornell Games Pickup APP

## An app for scheduling pickup games in Cornell University & beyond?

The goal of this app was to make pickup games easier to organize at Cornell. Since development began a few months ago, the app has grown in complexity. I am taking on a new role in another project that we have to deliver to a client soonest. Unfortunately, I do not have the time and resources to complete this project at this moment. I am putting it on pause, hoping to continue in the nearest future.

I am making this repository public, incase anyone finds any of the code useful.

## How to run

- clone the repo `git clone https://github.com/akinfelami/cornell-pickup.git`
- start the api

  - the api uses firebase authentication and mongodb. Please refer to their individual documentations to get the appropriate credentials.

    ```
    cd api
    npm install
    npm run server
    ```

  - naviagte to `https://localhost:3000`
  - you should see `{"status":"Success","message":"Hello, World"}`

- start the app
  - the app uses the expo cli. Kindly refer to the relevant documentation to get started with expo. Also, make sure you have xcode/Android studio sdks set up.
  - remember to copy firebase credentials
    ```
    npm install
    expo start
    ```
  - follow instructions in terminal to run the app.

Open to questions/feedback/comments. Contributions are also welcome
