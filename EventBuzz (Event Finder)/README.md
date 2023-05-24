# Portfolio Projects - EventBuzz

**Important Preface: ** This code utilizes SerpAPI. As of 2023, their services are not free, and users are limited to 100 API requests per month. If for some reason you are stuck on a loading animation, that means the searches have expired for the month as I have not paid for an account with extra searches.

This project was designed to give me practice utilizing APIs in the form of a Chrome-Extension build! It's a lightweight chrome extension with numerous features listed below, with the main one being grabbing events from Google Events using SerpAPI. More details below. 

## Overview

### Project Requirements

- Backend API setup hosted on Vercel (to hide API key, we don't access the SerpAPI directly but rather access our backend API, which is linked to SerpAPI)
- Display Events by Search in a list of React Components
- Favorite events and store them in the browser's Local Storage
- Sorting Event list by Date
- Page through events
- Error Checking / Logic Integration

### Technologies Utilized

- React
- Axios (API requests)
- React-Spinners (Loading Animation)
- Vercel (hosting)
- CSS 

### Screenshots

<img src="https://github.com/sddiaz/Portfolio/assets/101738608/4745d92b-b1d0-47cb-b719-d5bfe96ca3dc" height="500">

### Links / Usage (Test it yourself)

* As of now (05/24/23) I am working on getting the chrome extension up, though right now there are two options!
- Option 1: Web Version -> [Click Here to be Redirected to the Web Application Version of the Program](https://eventbuzzz.netlify.app/)
- Option 2: Chrome Upload. Download the code files. Click the chrome extensions button in the top of the browser, and click "Manage Extensions". Toggle on "Developer Mode" (top right), and click "Load Unpacked". Find the "build" folder in the code you downloaded, and you'll be good to go! Your extension should appear. 

### What I learned

- I learned how to setup a (very simple) backend API with proper techniques to hide an API key. 
- I honed in on my React skills, creating custom components and a clean UI design from scratch. 
- I learned how to access local storage and utilize state / effects to control an application seamlessly.


### Useful resources!
- [Deploy an Express API to Vercel](https://www.youtube.com/watch?v=B-T69_VP2Ls)
- [Basic Chrome Extension Setup](https://www.youtube.com/watch?v=WvnZPwq4dJs)
