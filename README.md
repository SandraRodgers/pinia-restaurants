# Pinia-Restaurants

An example project using Vue 3's Composition API, Pinia, and Google Maps API

## Get it Working

To see this project working, you can clone the project and then do the following.

### Install dependencies

```
npm install
```

### Create .env file

Create a `.env` file at the root of the project and then go into the `.gitignore` file and add `.env` to the list. This will make sure that the `.env` file does not get pushed up to github if you choose to push the project up to github

### Create a Google Maps Platform Account

You will need to create this account to get the API key to use the Google Maps and Google Places APIs.

Go to https://developers.google.com/maps.

In the left sidebar, click on _APIs_

Enable billing for the project. You will need to add a credit card. Google will give you $200 of free credits to use. It's recommended that you set up your account so that you receive a notification if you pass a certain amount spent. The $200 goes far, but it's better to be careful.

To create a project, click "Get Started" and then tick "Maps" and "Places" so you can use both those APIs.

Get your API key.

Once you have your API key, add it to the `.env` file as `GOOGLE_MAPS_API=your_api_key`

### Give your browser permission to use geolocation data

To see the project working correctly, you must give your browser permission to use your location data.

When you first run the project, the browser should give a pop-up window that asks permission to use your location. Be sure to give it this permission.

If you don't see the pop-up, then you'll need to go into the settings of your browser and set it to have permission to use your location.

### Questions

If you have any questions, you can reach out to me on [twitter](https://twitter.com/sandra_rodgers_)
