import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import ObjectsScreen from './Screens/ObjectsScreen';
import NotesNewScreen from './Screens/NotesNewScreen';
import NotesScreen from './Screens/NotesScreen';
import BottomNavScreen from './Screens/BottomNavScreen';
import BarCodeScan from './Screens/BarCodeScan';
import {  PermissionsAndroid} from "react-native";

const Stack = createStackNavigator();

export default function Root() {

    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                header: ({ navigation, scene, previous,options }) => {
                   
                    return (
                        <Appbar.Header>
                            {previous ? 
                                <Appbar.BackAction onPress={() => navigation.goBack()} /> : null
                            }
                            <Appbar.Content title={scene.descriptor.options.title} />
                            <Appbar.Action onPress={() => navigation.navigate("newnote")}/>
                            {scene.descriptor.options.objects ? <Appbar.Action icon="arrow-up-bold-circle-outline" 
                  
                                onPress={( () => {navigation.navigate("scanner")})} />:null}
                        </Appbar.Header>
                    );
                }
            }}
        >
           
           <Stack.Screen 
                name="login" 
                component={LoginScreen} 
                
                options={({ route }) => ({ title: "Prihlásenie" ,objects:false})} 
            />
             <Stack.Screen 
                name="bottom" 
                component={BottomNavScreen} 
                
                options={({ route }) => ({ title: "Poznamky" ,objects:true})} 
            />
            <Stack.Screen
                name="objects"
               
                component={ObjectsScreen}
                options={({ route }) => ({ title: "Objekty",objects:true })}
            />
            <Stack.Screen 
                name="newnote" 
                component={NotesNewScreen} 
                options={({ route }) => ({ title: "Nova poznamka",objects:false })} 
            />
            
             <Stack.Screen 
                name="notes" 
                component={NotesScreen} 
                options={({ route }) => ({ title: "Poznamky",objects:true })} 
            />
            <Stack.Screen
                name="scanner"

                component={BarCodeScan}
                options={({ route }) => ({ title: "Scanner",objects:false })}
            />
            
        </Stack.Navigator>
    );
}
