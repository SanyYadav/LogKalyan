import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
//import { launchCamera } from 'react-native-image-picker';
//import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions'; // Import Permissions from Expo
//import storage from '@react-native-firebase/storage';
import { db } from '../../firebase';
import { st } from '../../firebase';

let userId = '';

const Profile = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const [data, setData] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const getData = async () => {
        const userIdFromStorage = await AsyncStorage.getItem(userId);
        setUserId(userIdFromStorage);
    };

    const fetchData = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('USERID');
            if (storedUserId) {
                setUserId(storedUserId);
                fetchUserName(storedUserId);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch user data.');
        }
    };

    const openCamera = async () => {
        //const { status } = await Permissions.askAsync(Permissions.CAMERA);
        //if (status !== 'granted') {
        //   alert('Camera permission denied');
        //   return;
        //}

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setData(result);
        }
    };

    const uploadImage = async () => {
        if (!data) {
            alert('Please pick an image first.');
            return;
        }

        const response = await fetch(data.assets[0].uri);
        const blob = await response.blob();

        try {
            const reference = st.ref().child(data.assets[0].fileName);
            // Upload the file
            await reference.put(blob);

            // Get the download URL
            const url = await reference.getDownloadURL();
            console.log(url);

            // Once you have the URL, you can save it along with other data
            updateProfile(url);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const updateProfile = url => {
        db.collection('Users')
            .doc(userId)
            .update({
                profileImage: url,
            })
            .then(() => {
                console.log('User updated!');
                navigation.goBack()
            });
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('EMAIL');
            await AsyncStorage.removeItem('NAME');
            await AsyncStorage.removeItem('USERID');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to log out.');
        }
    };

    const fetchUserName = async userId => {
        try {
            const userDoc = await db.collection('Users').doc(userId).get();
            if (userDoc.exists) {
                setUserName(userDoc.data().name);
            } else {
                console.log('User document does not exist');
            }
        } catch (error) {
            console.error('Error fetching user name:', error);
            Alert.alert('Error', 'Failed to fetch user name.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginVertical: 10, alignSelf: 'center' }}>
                Welcome, {userName}!
            </Text>
            {data != null ? (
                <Image
                    source={{ uri: data.assets[0].uri }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        alignSelf: 'center',
                        marginTop: 50,
                    }}
                />
            ) : (
                <Image
                    source={require('../../assets/user.png')}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        alignSelf: 'center',
                        marginTop: 50,
                    }}
                />
            )}
            <TouchableOpacity
                style={{
                    marginTop: 30,
                    height: 50,
                    width: '50%',
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={() => {
                    openCamera();
                }}>
                <Text>Pick Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    marginTop: 30,
                    height: 50,
                    width: '50%',
                    backgroundColor: 'purple',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={() => {
                    uploadImage();
                }}>
                <Text style={{ color: '#fff' }}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    marginTop: 30,
                    height: 50,
                    width: '50%',
                    backgroundColor: 'red',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                onPress={() => {
                    logout();
                }}>
                <Text style={{ color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;



