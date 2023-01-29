import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const imagePaths = [
  require('./assets/backgrounds/blood_rain.png'),
  require('./assets/backgrounds/crab_weather.png'),
  require('./assets/backgrounds/darryl.png'),
  require('./assets/backgrounds/hamburger_sun.png'),
  require('./assets/backgrounds/macarena_wind.png'),
  require('./assets/backgrounds/meteor_shower.png'),
  require('./assets/backgrounds/screaming_stars.png'),
  require('./assets/backgrounds/tetris.png'),
  require('./assets/backgrounds/tiny_tornado.png'),
  require('./assets/backgrounds/rapture.png'),
  require('./assets/backgrounds/rain.png'),
  require('./assets/backgrounds/rain.png'),
  require('./assets/backgrounds/rain.png'),
  require('./assets/backgrounds/snow.png'),
  require('./assets/backgrounds/snow.png'),
  require('./assets/backgrounds/snow.png'),
  require('./assets/backgrounds/cloudy.png'),
  require('./assets/backgrounds/cloudy.png'),
  require('./assets/backgrounds/cloudy.png'),
  require('./assets/backgrounds/sunny.png'),
  require('./assets/backgrounds/sunny.png'),
  require('./assets/backgrounds/sunny.png')
];

const titles = [
  'The Torrent',
  'Crab Weather',
  'Darryl wants to let you know that you\'re invited to his cookout, if you\'re interested.',
  'McDonald\'s Advertisement Gone Too Far',
  'The wind is trying to convince you to dance the Macarena',
  'Meteor Shower',
  'The Stars Are Screaming',
  'God Is Playing Tetris',
  'TORNADO WARNING',
  'Reverse Rapture',
  'Rain',
  'Rain',
  'Rain',
  'Snow',
  'Snow',
  'Snow?',
  'Cloudy',
  'Cloudy',
  'Cloudy',
  'Sunny',
  'Sunny',
  'Sunny'
]

const temperatures = [
  '666° K',
  '14° C',
  '26° C',
  '-200° C',
  '-24° C',
  '30° C',
  '518° C',
  '53° C',
  '18° C',
  '23° C',
  '17° C',
  '24° C',
  '9° C',
  '1° C',
  '-11° C',
  '16° C',
  '10° C',
  '10° C',
  '19° C',
  '16° C',
  '26° C',
  '-30° C',
  '12° C'
]

const descriptions = [
  'FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT FEAR IT',
  'Why are they back?',
  'He would really like you to come.',
  'Where did the sun go?',
  'Do NOT listen to it.',
  'Look away, perv.',
  'Government mandated ear protection is required.',
  'Did He just clear all of Manhattan?',
  'It may only be a foot tall but it can still take a shoe. Look down, and watch your step.',
  'Just takes the clothes.',
  'Wet',
  'Wear your rain boots!',
  'Did you know that the word for the smell of rain is "petrichor"?',
  'May be chilly',
  'Wear a coat',
  'Watch out for sky lice',
  'Overcast',
  'Just a normal day, as always.',
  'A bit sad.',
  'Perfect beach weather!',
  'Ouch, my eyes!',
  'Not a burger today. Thank God.'
]

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationInfo = await Location.getCurrentPositionAsync({});
      let longitude = locationInfo.coords.longitude;
      let latitude = locationInfo.coords.latitude;
      let regionName = await Location.reverseGeocodeAsync({longitude: longitude, latitude: latitude})
      setLocation(regionName[0]["city"]);
    })();
  }, []);

  let locationText = '\"Waiting...\"';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = JSON.stringify(location);
  }

  const index = Math.floor(Math.random() * imagePaths.length)

  const [backgroundImage, setBackgroundImage] = useState(
    imagePaths[index]
  );

  const title =  useState(titles[index])

  const temperature =  useState(temperatures[index])

  const description =  useState(descriptions[index])

  return (
    <ImageBackground source={backgroundImage} resizeMode='cover' style={styles.container}>
      <Text style={styles.locationText}>{locationText.slice(1, -1)}</Text>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.temperatureText}>{temperature}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: 'assets/backgrounds/blood_rain.png',
    alignItems: 'center',
  },
  locationText: {
    color: '#ffffff',
    padding: 16,
    paddingTop: 130,
    paddingBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 50,
    flexDirection: 'column',
    textAlign: 'center',
  },
  titleText: {
    color: '#ffffff',
    padding: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 40,
    flexDirection: 'column',
    textAlign: 'center',
  },
  temperatureText: {
    color: '#ffffff',
    padding: 12,
    paddingBottom: 150,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 40,
    flexDirection: 'column',
    textAlign: 'center',
  },
  descriptionText: {
    color: '#ffffff',
    padding: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 30,
    textAlign: 'center',
  },
});
