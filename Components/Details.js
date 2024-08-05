// CarDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const Details = ({ route, navigation, addCab }) => {
  const { car } = route.params;


  const handleBook = () => {
    const success = addCab(car);
    if (success) {
      Alert.alert('Booking Confirmed', `You have booked ${car.company} ${car.model}`);
    } else {
      
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company: {car.company}</Text>
      <Text style={styles.text}>Model: {car.model}</Text>
      <Text style={styles.text}>Passengers: {car.passengers}</Text>
      <Text style={styles.text}>Rating: {car.rating}</Text>
      <Text style={styles.text}>Cost/hour: ${car.cost}</Text>
      <Button title="Book Now" onPress={handleBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Details;
