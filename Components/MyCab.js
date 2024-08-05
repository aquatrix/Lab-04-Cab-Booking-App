import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import cabIcon from '../assets/cab-icon.png'

const MyCab = ({ booked, cancelCab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={booked}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={cabIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.company} - {item.model}</Text>
              <Button title="Cancel Booking" onPress={() => cancelCab(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  icon: {
    width: 40, 
    height: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
});

export default MyCab;