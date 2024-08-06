import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage";


const Splash = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            checkLogin();
            navigation.navigate('Login');
            
        }, 3000);
    }, []);

    const checkLogin = async () => {
        const email = await AsyncStorage.getItem('EMAIL');
        console.log(email);
        if (email != null) {
            navigation.navigate('Main');
        } else {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '800' }}> Welcome </Text>
        </View>
    )
}

export default Splash;