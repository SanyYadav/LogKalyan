import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Main from './Screens/Main';
import AddNewPost from './Screens/AddNewPost';
import Profile from './Screens/Profile';
import McMain from './Screens/McMain';

const Stack = createStackNavigator()
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen component={Splash} name='Splash' options={{ headerShown: false }} />
                <Stack.Screen component={Login} name='Login' options={{ headerShown: false }} />
                <Stack.Screen component={Signup} name='Signup' options={{ headerShown: false }} />
                <Stack.Screen component={Main} name="Main" options={{headerShown: false}} />
                <Stack.Screen component={McMain} name="McMain" options={{headerShown: false}} />
                <Stack.Screen component={AddNewPost} name="AddNewPost" options={{headerShown: true}} />
                <Stack.Screen component={Profile} name="Profile" options={{headerShown: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;