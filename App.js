import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CabLists from './Components/CabList'
import Mycabs from './Components/MyCab';
import { Alert } from 'react-native';
import { Image } from 'react-native';

import homeIcon from './assets/search-cab.png';
import myCabIcon from './assets/my-cabs.png';


const Tab = createBottomTabNavigator();

const App = () => {
  const [booked, setbooked] = useState([]);

  const addCab = (cab) => {

    const isBooked = booked.find(booked => booked.id === cab.id);
      if (isBooked) {
        Alert.alert('Alredy Booked','Cab has been booked already.');
        return false;
      }
    if (booked.length >= 2) {
      Alert.alert('booked Limit Reached', 'You cannot book more than 2 cabs at a time.');
      return false;
    }
    setbooked([...booked, cab]);

    return true;
  };

  const cancelCab = (cabId) => {
    setbooked(booked.filter(booked => booked.id !== cabId));
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{headerShown:false,
          tabBarIcon: ({ color, size }) => {
              return(
                <Image source={homeIcon}    
                style={{
                  width: size,
                  height: size,
                  tintColor: color
                }}/>
              )
          }
        }}>
        {(props) => <CabLists {...props} addCab={addCab} />}
        </Tab.Screen>
        <Tab.Screen name="My Cabs" options={{
          tabBarIcon: ({ color, size }) => {
            return(
              <Image source={myCabIcon}    
              style={{
                width: size,
                height: size,
                tintColor: color
              }}/>
            )
        }
        }}>
            {(props) => <Mycabs {...props} booked={booked} cancelCab={cancelCab} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
