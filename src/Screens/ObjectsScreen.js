
import React, { useEffect, useState } from 'react';
import {  View,ScrollView, StyleSheet } from 'react-native';
import { List, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { URL,get } from './../global';
import NotesScreen from './NotesScreen';
import { render } from 'react-dom';



const ObjectsScreen = ({ navigation }) => {
    const [objects, setObjects] = useState([]);

    const loadObjects = async () => {
        
        setObjects(await get("/api/object"));
        
    }
    
    useEffect(() => {objects
        loadObjects();
    }, []);

   
    return (
       
        <ScrollView style={[styles.container]}>
            <List.Section>
                {
                
                    objects.map((o, index) => 
                        <List.Item
                           
                            key={index}
                            title={o.name}
                            description={o.description}
                            right = {() =>  <IconButton
                                icon="format-list-bulleted"
                              
                                size={20}
                                onPress={() => navigation.navigate("notes",{objectId:o.id})}
                              />}
                        />
                    )
                }
            </List.Section>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default ObjectsScreen;
