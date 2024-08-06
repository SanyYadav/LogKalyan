import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signin = async () => {
        console.log("Right now inside signin method");
        try {
            const querySnapshot = await db.collection('Users')
                .where('email', '==', email)
                .get();

            if (querySnapshot.empty) {
                Alert.alert('User Not Found');
            } else {
                const userData = querySnapshot.docs[0].data();
                if (userData.password === password) {

                    saveData(userData.name, userData.userId, userData.usertype);

                    if (userData.usertype === 'Normal User') {
                        console.log(userData);
                        console.log("Before Main navigation");
                        navigation.navigate('Main');
                        console.log("After Main navigation");

                    } 
                    else if (userData.usertype === 'Municipal Corporation') {
                        console.log(userData);
                        console.log("Before McMain navigation");
                        navigation.navigate('McMain');
                        console.log("After McMain navigation");
                        
                    }
                } else {
                    Alert.alert('Password Incorrect');
                }
            }
        } catch (error) {
            console.error('Error signing in: ', error);
            Alert.alert('Error', 'Failed to sign in.');
        }
    };

    const saveData = async (name, userId) => {
        try {
            // Assuming you've imported AsyncStorage properly
            // If not, import AsyncStorage from 'react-native';
            await AsyncStorage.setItem('EMAIL', email);
            await AsyncStorage.setItem('NAME', name);
            await AsyncStorage.setItem('USERID', userId);
            // navigation.navigate('Main');
        } catch (error) {
            console.error('Error saving data: ', error);
            Alert.alert('Error', 'Failed to save user data.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '800', alignSelf: 'center', marginTop: 100 }}>Login</Text>
            <TextInput
                placeholder="Enter Email Id"
                value={email}
                onChangeText={txt => setEmail(txt)}
                style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignSelf: 'center',
                    marginTop: 50,
                    paddingLeft: 20,
                }}
            />
            <TextInput
                placeholder="Enter Password"
                value={password}
                onChangeText={txt => setPassword(txt)}
                secureTextEntry={true}
                style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignSelf: 'center',
                    marginTop: 20,
                    paddingLeft: 20,
                }}
            />
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    width: '90%',
                    height: 50,
                    backgroundColor: 'purple',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                }}
                onPress={() => signin()}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Login</Text>
            </TouchableOpacity>
            <Text
                style={{
                    textDecorationLine: 'underline',
                    fontSize: 18,
                    marginTop: 60,
                    alignSelf: 'center'
                }}
                onPress={() => navigation.navigate('Signup')}>
                Want to Create a New Account
            </Text>
        </View>
    );
};

export default Login;