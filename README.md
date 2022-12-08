<h1 align="center"> <a href="https://github.com/anugoyal998/MeChat"><strong>📑 Collaborative Md Editor 📑 </strong></a></h1>
<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)  ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

<div>

<div align="start">

**Collaborative Markdown Editor**, A Real-time markdown editor with real-time edits.

**Features:**
* Realtime Markdown Edit
* Google, and Github Login
* Autosave changes

Website Link: [Collaborative Markdown Editor](https://collaborative-md-editor.vercel.app)


### Tech Stack
* HTML/CSS
* Javascript
* React
* Tailwind CSS
* Zustand
* Nodejs/Expressjs
* MongoDB
* Socket.io
* Firebase

### Client Side
#### `npm install`
Install modules mentioned in package.json
#### `Create .env`
Create a .env file in the client folder and add following in it
```
REACT_APP_SERVER = <Your Backend URL>
```
#### `npm start`
Runs the app in the development mode.  
Open http://localhost:3000 to view it in the browser.  

The page will reload if you make edits.
You will also see any lint errors in the console.
#### `npm run build`
Builds the app for production to the build folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.  
#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**  

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### Server Side
#### `npm install`
Install modules mentioned in package.json
#### `Create .env`
Create .env file in server folder and paste following in it
```
DB_URL=<Your MongoDB Database URL>
CLIENT=<Your Frontend URL>
JWT_ACCESS_TOKEN_SECRET=<Any Random String>
JWT_REFRESH_TOKEN_SECRET=<Any Random String>
```
### `npm start`

Runs the app in the development mode.  
Open [http://localhost:5000](http://localhost:5000) to run server.  

You will also see any errors or information in the console


### Screenshots

###### Landing Page
<img src="md-img/landing.png">

###### Login Page
<img src="md-img/login.png">

###### Home Page
<img src="md-img/home.png">

###### Editor
<img src="md-img/editor.png">

###### Mobile Screen
<img src="md-img/mobile1.png">
<img src="md-img/mobile2.png">

</div>