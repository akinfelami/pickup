# Pickup Games App

## An app for scheduling pickup games in the US & beyond?

The goal of this app was to make pickup games easier to organize at Cornell. Since development began a few months ago, the app has grown in complexity. I am taking on a new role in another project that we have to deliver to a client soonest. Unfortunately, I do not have the time and resources to complete this project at this moment. I am putting it on pause, hoping to continue in the nearest future.

I am making this repository public, incase anyone finds any of the code useful.

## How to run

- clone the repo `git clone https://github.com/akinfelami/cornell-pickup.git`
- start the api

  - the api uses firebase authentication and mongodb. Please refer to their individual documentations to get the appropriate credentials.
  - the api also uses redis for databse caching. Obtain relevant credentials from redis cloud

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

Open to questions and feedback. Contributions are also welcome

## Screenshots
![Simulator Screen Shot - iPhone 14 Pro Max - 2023-01-08 at 15 19 55](https://user-images.githubusercontent.com/59776300/212585417-07821f22-63ad-4ae0-8ce7-6361bfe244fd.png)
![Simulator Screen Shot - iPhone 14 Pro Max - 2023-01-08 at 15 20 09](https://user-images.githubusercontent.com/59776300/212585424-e94c044b-8d50-436a-b23a-05c41aaf4f5e.png)
![Simulator Screen Shot - iPhone 14 Pro Max - 2023-01-08 at 15 20 33](https://user-images.githubusercontent.com/59776300/212585426-b2cef3bf-d7d4-4ec9-83c7-ed8a9f8c7e44.png)
![Simulator Screen Shot - iPhone 14 Pro Max - 2023-01-08 at 15 20 44](https://user-images.githubusercontent.com/59776300/212585429-806535d7-6a37-4dac-8306-89f287bff759.png)
![Simulator Screen Shot - iPhone 14 Pro Max - 2023-01-08 at 15 21 01](https://user-images.githubusercontent.com/59776300/212585430-e548d78d-c966-4977-acc5-48bd82d43667.png)



## Screenshots
