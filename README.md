# WeatherClothes APP frontend

## About the APP

The basic idea behind this weather application is to be able to set clothes suggestions for temperature intervals. This feature is available after a Google OAuth login. Without login only the basic city search function is available.
After login the user can set up custom temperature intervals and select clothes for that interval in the "Manage preferences" menu (the options are based on the clothes I use for cycling ;-))
By clicking on the temerature value of a city the app will show the clothes suggestion for that temperature. (The 24h forecast cards can also be clicked)
The user can also save a city as a favorite by clicking on the star on the city card.

## Description

This repository contains the frontend for the WeatherClothes APP.
To be able to run it on your local machine, follow these steps.

## Prerequisites

Make sure you have Node.js installed on your machine. You can download it from the official website: https://nodejs.org/
You will also need git installed on your machine. Check the [GitHub](https://github.com/git-guides/install-git) or the [git-scm](https://git-scm.com/downloads) websites for guidance.

### Steps for running

1. Clone the repository and change to the new directory:
    ```
    $ git clone https://github.com/kolestom/weatherClothesFE.git
    $ cd weatherClothesFE
    ```
2. Install the dependencies:
    ```
    $ npm install
    ```
3.  Start the frontend development server:
    ```
    $ npm run dev
    ```
4.  Access the frontend by navigating to http://localhost:5173/ in your browser

5.  To download and launch the backend server, follow the README.md on [this](https://github.com/kolestom/weatherClothesBE) link
