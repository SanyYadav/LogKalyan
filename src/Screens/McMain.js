import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
//import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
// import { db } from '../../firebase';
import { rd } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const McMain = () => {

    // alert("this is BMC");

    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    //const [claimedMessage, setClaimedMessage] = useState('');

    const isFocused = useIsFocused();

    useEffect(() => {
        getPosts();
    }, [isFocused]);

    const getPosts = () => {
        console.log("Inside mcMain page");
        rd.ref('Posts')
            .once('value')
            .then(snapshot => {
                const data = snapshot.val();
                if (data) {
                    const postData = Object.keys(data)
                        .map(key => ({ id: key, ...data[key] }))
                        .filter(post => post.claimCount >= 10); // Filter posts with claimCount >= 10
                    setPosts(postData);
                }
            })
            .catch(error => {
                console.error('Error getting posts:', error);
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'purple',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: '#fff',
                        marginLeft: 20,
                        fontSize: 18,
                        fontWeight: '700',
                    }}>
                    LogKalyan
                </Text>
                <Text
                    style={{
                        color: '#fff',
                        marginRight: 20,
                        fontSize: 18,
                        fontWeight: '700',
                    }}
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    Profile
                </Text>
            </View>
            <FlatList
                data={posts}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width: '90%',

                                alignSelf: 'center',
                                elevation: 3,
                                backgroundColor: '#fff',
                                marginTop: 20,
                                borderRadius: 10,
                            }}>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                {item.userImage == '' ? (
                                    <Image
                                        source={require('../../assets/user.png')}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            marginTop: 10,
                                            marginLeft: 10,
                                        }}
                                    />
                                ) : (
                                    <Image
                                        source={{ uri: item.userImage }}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            marginTop: 10,
                                            marginLeft: 10,
                                        }}
                                    />
                                )}

                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: 18,
                                        fontWeight: '600',
                                        marginLeft: 10,
                                    }}>
                                    {item.name}
                                </Text>
                            </View>

                            <Image
                                source={{ uri: item.postImage }}
                                style={{
                                    width: '90%',
                                    height: 200,
                                    borderRadius: 10,
                                    alignSelf: 'center',
                                    marginBottom: 20,
                                }}
                            />
                            <Text style={{ margin: 10, fontSize: 16, fontWeight: '600' }}>
                                {item.caption}
                            </Text>
                            <Text style={{ fontWeight: '600' }}>{item.claimCount || 0}</Text>
                        </View>
                    );
                }}

            />
                
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default McMain;