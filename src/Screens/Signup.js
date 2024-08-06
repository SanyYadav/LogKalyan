import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase'; // Import your Firebase configuration

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setType] = useState('Normal User');

    const saveData = async () => {
        try {
            const userId = uuidv4();
            await db.collection('Users').doc(userId).set({
                name: name,
                userId: userId,
                email: email,
                password: password,
                usertype: usertype
            });
            console.log('User added!');
        } catch (error) {
            console.error('Error adding user: ', error);
            Alert.alert('Error', 'Failed to save user data.');
        }
    };

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '800', alignSelf: 'center', marginTop: 100 }}>Signup</Text>
            <TextInput
                value={usertype}
                onChangeText={txt => setType(txt)}
                style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignSelf: 'center',
                    marginTop: 50,
                    paddingLeft: 20,
                }}
                editable={false}
            />

            <TextInput
                placeholder="Enter Name"
                value={name}
                onChangeText={txt => setName(txt)}
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
                placeholder="Enter Email Id"
                value={email}
                onChangeText={txt => setEmail(txt)}
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
                onPress={() => {
                    if (name !== '' && email !== '' && password !== '') {
                        saveData();
                    } else {
                        Alert.alert('Error', 'Please Enter All Data');
                    }
                }}
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>Sign up</Text>
            </TouchableOpacity>
            <Text
                style={{
                    textDecorationLine: 'underline',
                    fontSize: 18,
                    marginTop: 60,
                    alignSelf: 'center'
                }}
                onPress={() => navigation.goBack()}
            >
                Already have an Account
            </Text>
        </View>
    );
};

export default Signup;