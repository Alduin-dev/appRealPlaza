import { View, Text } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const SubHeader = (props) => {
        let [fontsLoaded] = useFonts({
            'Inter': require('./../assets/fonts/Inter-VariableFont_slntwght.ttf')
        });

        if (!fontsLoaded) {
            return <AppLoading />
        }
    return (
        <View style={{display:'flex', alignContent:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:35, textAlign: 'center', fontFamily: "Inter", color: '#fff'}}>
                {props.name}
            </Text>
        </View>
    )
}

export default SubHeader