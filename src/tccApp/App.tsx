import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Pages/Main';

const Stack = createNativeStackNavigator();


export default function App() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
            />
        </Stack.Navigator>
    </NavigationContainer>

}
