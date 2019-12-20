
  
  

# Angular App 8

  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.1.

  

# System Requirement

  

- NodeJS 12.13.0

- NPM 6.13.1

- VS Code for Code Editing (Recommended)

  

## Install

To install the app. you need to first run `npm install` and then run `npm run start` to run the development server. once it successfully install and run that means you can create the production build.

  

## Directory structure

`/src`

in this directory all the main code is available.

`/src/app`

app component, app module is the base file for the app in this the application renders the wrapper and define the base routing

`/src/app/hotels`

This module has been split into multiple parts such as the listing and search part.

The list component will render the hotels which receive from the MAP module.

This is the wrapper part of this app. so all the functionality is driven from here.

`/src/app/hotels/hotel-search`

This module is used to render the search form. and on keypress it will trigger the suggestion api and show the suggestion in dropdown. also, I added the radius box from where you can control the radius in meter.

  

`/src/app/toolbar/`

This module is just for toolbar. No functionality happing here as of now.

  

`/common`

This Global Const file is used to define the global value such as App ID, Api Key, default lat, default long, default zoom, default radius etc.

> **Please Change ApiKey and App ID with your creadentials**
  

`/here-map`

This is the main module of this App with this module user can see the map as well as I use it to fetch the list of hotels and send it back to parent module so, that I don't have to call the api to fetch the Hotel.

  

## Development server

  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

  

## Build

  

Run `ng build` to build the project in the development build.

  

Run `npm run build-prod` to build the production-ready build. With AOT Compatible.

  

## Support

In case if you need any support while installation or you are facing any issue while installing or running the app. you can please contact to me at my email id: me[at]tejasrana[dot]com