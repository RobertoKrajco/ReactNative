import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from './src/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        danger: 'red'
    },
};

export default function App() {
    
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <RootNavigator>

                </RootNavigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    btnBox: {
    },
});

//https://snack.expo.io/@react-native-paper/github.com-callstack-react-native-paper:example
//https://github.com/callstack/react-native-paper/tree/main/example/src/Examples
