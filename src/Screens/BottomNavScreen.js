

import { URL,get } from './../global';
import NotesScreen from './NotesScreen';
import ObjectsScreen from './ObjectsScreen';
import { List, IconButton} from 'react-native-paper';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';


const MyComponent = ({ route,navigation }) => {

  
  const ObjectsRoute =  ()  => <ObjectsScreen />;
  const NotesRoute = () => <NotesScreen />;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'notes', title: 'Notes', icon: 'filter' },
    { key: 'objects', title: 'Objects', icon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    notes: NotesRoute,
    objects: ObjectsRoute,
    
  });

  return (
    <BottomNavigation

      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={ renderScene}
    />
  );
};
 //https://callstack.github.io/react-native-paper/bottom-navigation.html
export default MyComponent;