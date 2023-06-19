import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import data from '../components/data';
import { StatusBar } from 'expo-status-bar';




const Dashboard = () => {
  const [name, setName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null)

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('Usuario no encontrado en la Base de datos');
          alert('Usuario no encontrado en la Base de datos');
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ marginLeft: 10, fontSize: 30, fontWeight: 'bold', color: '#7300e0' }}>
        Bienvenido, {name.firstName}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row', padding: 10, width: '100%', height: '19%' }}>
        <View style={{ display: 'flex', alignItems: 'center', width: '33%', height: '100%', padding: 10 }}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%', borderRadius: 100 }}>
            <Text>
              <AntDesign name='shoppingcart' style={{ color: '#7300e0' }} size={60} />
            </Text>
          </View>
          <Text style={{ padding: 5 }}>Carrito</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', width: '33%', height: '100%', padding: 10 }}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%', borderRadius: 100 }}>
            <Text>
              <Feather name='shopping-bag' style={{ color: '#7300e0' }} size={60} />
            </Text>
          </View>
          <Text style={{ padding: 5 }}>Compras</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', width: '33%', height: '100%', padding: 10 }}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%', borderRadius: 100 }}>
            <Text>
              <MaterialCommunityIcons name='hospital-box-outline' style={{ color: '#7300e0' }} size={60} />
            </Text>
          </View>
          <Text style={{ padding: 5 }}>Salud</Text>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', padding: 10, width: '100%', height: '19%' }}>
        <View style={{ display: 'flex', alignItems: 'center', width: '33%', height: '100%', padding: 10 }}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%', borderRadius: 100 }}>
            <Text>
              <MaterialCommunityIcons name='party-popper' style={{ color: '#7300e0' }} size={60} />
            </Text>
          </View>
          <Text style={{ padding: 5 }}>Aniversario</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', width: '33%', height: '100%', padding: 10 }}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%', borderRadius: 100 }}>
            <Text>
              <FontAwesome name='whatsapp' style={{ color: '#7300e0' }} size={60} />
            </Text>
          </View>
          <Text style={{ padding: 5 }}>Whatsapp</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', width: '33%', height: '100%', padding: 10 }}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80%', borderRadius: 100 }}>
            <Text>
              <Icon name='local-shipping' style={{ color: '#7300e0' }} size={60} />
            </Text>
          </View>
          <Text style={{ padding: 5 }}>Envio</Text>
        </View>
      </View>

      <View style={styles.viewaccordion}>
        <StatusBar hidden />
        {data.map(({bg, color, category, subCategories}, index) => {
          return (
            <TouchableOpacity 
              key={category} 
              onPress={() => {
                setCurrentIndex(index === currentIndex ? null : index)
              }} 
              style={styles.cardContainer}
              activeOpacity={0.9}
            >
              <View style={[styles.card, { backgroundColor: bg }]}>
                <Text style={[styles.heading, { color }]}>{category}</Text>
                {index === currentIndex && (
                  <View style={styles.subCategoriesList}>
                  {subCategories.map((subCategory) => (
                    <Text
                      key={subCategory} style={[styles.bodyaccordion, { color }]}
                    >
                      {subCategory}
                    </Text>
                  ))}
                </View>
                )} 

              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      




      <TouchableOpacity onPress={() => { firebase.auth().signOut() }} style={styles.button}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  viewaccordion: {
    flex:1,
    backgroundColor: '#fff',
    justifyContent: 'center'

  },
  button: {
    marginTop: 50,
    marginLeft: 80,
    marginBottom: 80,
    height: 70,
    width: 250,
    backgroundColor: '#7300e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  cardContainer:{
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  bodyaccordion:{
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'left'
  },
});