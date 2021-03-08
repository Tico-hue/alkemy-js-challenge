# alkemy-js-challenge
## Finance Tracker
Its a personal budget manager web app made as a challenge for alkemy labs

## Features
##### Transaction CRUD 

## Technologies used
#### Express 
#### React
#### Mysql
#### Sequelizer

## Screenshots
##### Homepage
![](screenShots/HomePage.jpg? "HomePage")
##### Create transaction modal form
![](screenShots/CreateTransactionModal.jpg? "CreateModalForm")
##### Edit transaction modal form
![](screenShots/EditeTransactionModal.jpg? "UpdateModalForm")


## Installation

Clone this repo
Place yourself in 
```console
alkemy-js-challenge\api
``` 
and run  
```console
npm install
```

After that, you have to create a Schema called 'api' in Mysql
and change the parameter on the sequelize constructor
```console
  api/db.js
```
```json 
const sequelize = new Sequelize('alkemy','root','rootroot', {
    host:'localhost',
    dialect:'mysql',
    dialectOptions: {decimalNumbers: true},
    define:{
        timestamps:false
    }
 ```
Now you can start the server running:
```console
  npm start
```
Thats all with the server.


For running the react client, place yourself in 
```console
alkemy-js-challenge\trans-tracker
``` 
and run 
```console
npm install
```
Now you can just open it in your browser
```console
localhost:3000 
```
