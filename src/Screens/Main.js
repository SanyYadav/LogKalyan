import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { db } from '../../firebase';
import { rd } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const Main = () => {


  // alert("This is admin");
  // console.log("Inside Main");

  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [claimedMessages, setClaimedMessages] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getPosts();
  }, [isFocused]);

  const getPosts = () => {
    rd.ref('Posts')
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        if (data) {
          const postData = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setPosts(postData);

          setClaimedMessages(new Array(postData.length).fill(''));
        }
      })
      .catch(error => {
        console.error('Error getting posts:', error);
      });
  };

  const incrementClaim = (postId, index) => {
    const userId = '';
    rd.ref('Posts/' + postId + '/claimedBy/' + userId)
      .once('value')
      .then(snapshot => {
        const alreadyClaimed = snapshot.exists();

        if (alreadyClaimed) {
          const updatedClaimedMessages = [...claimedMessages];
          updatedClaimedMessages[index] = 'You have already claimed this post';
          setClaimedMessages(updatedClaimedMessages);
        } else {
          rd.ref('Posts/' + postId + '/claimCount').transaction(currentCount => {
            return (currentCount || 0) + 1;
          }, (error, committed, snapshot) => {
            if (error) {
              console.error('Error incrementing claim:', error);
            } else if (!committed) {
              console.error('Transaction aborted');
            } else {
              rd.ref('Posts/' + postId + '/claimedBy/' + userId).set(true);
              console.log('Claim count incremented successfully');
            }
          });
        }
      })
      .catch(error => {
        console.error('Error checking claim status:', error);
      });
  };

  return (
    <div className='mainDiv'>
    <View style={{ flex: 1 , padding: '10px',}}>
      <View
        style={{

          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20, 
          backgroundColor: 'purple',
          height: 50,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: '900',
          }}
          onPress={() => {
            navigation.navigate('AddNewPost');
          }}>
          +
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '700',
          }}>
          LogKalyan
        </Text>
        <Text
          style={{
            color: '#fff',
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
              {claimedMessages[index] ? (
                <Text
                  style={{ color: 'red', alignSelf: 'center', marginTop: 10 }}
                >
                  {claimedMessages[index]}
                </Text>
              ) : null}
              <TouchableOpacity
                style={{
                  backgroundColor: 'purple',
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}
                onPress={() => incrementClaim(item.id, index)}
              >
                <Text style={{ color: '#fff' }}>Claim</Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: '600' }}>{item.claimCount || 0}</Text>
            </View>
          );
        }}
      />
    </View>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Main;