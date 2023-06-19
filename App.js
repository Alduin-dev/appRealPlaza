import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component, useState, useEffect } from 'react';
import { firebase } from './config';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader ";


const Stack = createStackNavigator();

function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  
  if (initializing) return null;

  if (!user){
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerTitle: () => <Header name="Real Plaza"/>,
            headerStyle: {
              height: 300,
              borderBottomColor:"#7300e0",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 230,
              backgroundColor: "#7300e0",
              shadowColor: "#000",
              elevation:25,
              
            }
          }}
        />
        <Stack.Screen
          name='Registration'
          component={Registration}
          options={{
            headerTitle: () => <Header/>,
            headerStyle: {
              height: 100,
              borderBottomColor:"#8200ff",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 50,
              backgroundColor: "#8200ff",
              shadowColor: "#000",
              elevation:25,
              
            }
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
          name='Dashboard'
          component={Dashboard}
          options={{
            headerTitle: () => <SubHeader name="Opciones"/>,
            headerStyle: {
              borderBottomColor:"#8200ff",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 50,
              backgroundColor: "#8200ff",
              shadowColor: "#000",
              
            }
          }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}