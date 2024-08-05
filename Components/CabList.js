import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from './firebaseConfig'
import Details from './Details';
import cabIcon from '../assets/cab-icon.png'


const Stack = createStackNavigator();
const db = getFirestore(app);
const cabRefs = collection(db, "cabs");


const CarStack = ({addCab}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cab List" component={HomeScreen}/>
      <Stack.Screen name="Cab Details">
              {(props) => <Details {...props} addCab={addCab} />}
        </Stack.Screen>
    </Stack.Navigator>
  );
};
const HomeScreen = ({ navigation }) => {
  const [cabs, setCabs] = useState([]);
  

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const querySnapshot = await getDocs(cabRefs);
        const cabList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCabs(cabList);
      } catch (error) {
        console.error('Error fetching cabs: ', error);
      }
    };

    fetchCabs();
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Cab Details', { car: item })}
          >
            <Image source={cabIcon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.company} - {item.model}</Text>
            </View>
          </TouchableOpacity>
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
export default CarStack;