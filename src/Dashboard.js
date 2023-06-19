import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible'

const Dashboard = () => {
  const [name, setName] = useState('');
  const [activeSections, setActiveSections] = useState('');
  const [collapsed, setCollapsed] = useState(true)
  const SECTIONS = [
    {
      title: 'Título del acordeón 1',
      content: 'Contenido del acordeón 1',
    },
    {
      title: 'Título del acordeón 2',
      content: 'Contenido del acordeón 2',
    },
  ];

  const renderHeader = (section, _, isActive) => {
    return (
      <TouchableOpacity
        style={[
          styles.accordionHeader,
          isActive ? styles.accordionHeaderActive : null,
        ]}
        onPress={() => toggleSection(section)}
      >
        <Text style={styles.accordionHeaderText}>{section.title}</Text>
      </TouchableOpacity>
    );
  };

  const toggleSection = (section) => {
    const isActive = activeSections.includes(section.content);
    setActiveSections(
      isActive
        ? activeSections.filter((activeSection) => activeSection !== section.content)
        : [...activeSections, section.content]
        
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.accordionContent}>
        <Text>{section.content}</Text>
      </View>
    );
  };

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
      <View>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setActiveSections}
        />
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
  button: {
    marginTop: 50,
    marginLeft: 80,
    height: 70,
    width: 250,
    backgroundColor: '#7300e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  accordionHeader: {
    padding: 10,
    backgroundColor: '#eee',
  },
  accordionHeaderActive: {
    backgroundColor: '#ddd',
  },
  accordionHeaderText: {
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});