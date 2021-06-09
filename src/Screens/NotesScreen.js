

import React, { useEffect, useState } from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import { List, Searchbar,IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL,get,remove } from './../global';
import { set } from 'react-native-reanimated';


export default function NotesScreen({ index,route,navigation }) {

    const [notes, setNotes] = useState([]);
    let {objectId} = 0;
    const [loading, setloading] = useState(false)
    if(route.params !== undefined)
        objectId = route.params.objectId;
    let {render} = false;
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query) => setSearchQuery(query);
    console.log("index "+ index +"obj id "+objectId);
    if(index ==0 || index==undefined){
        
    if(objectId==0 || objectId==undefined)
    React.useLayoutEffect(() => {
        
        navigation.setOptions({
          title:  'Poznamky' ,
          objects: true
        });

      });
      else
      React.useLayoutEffect(() => {
       
        navigation.setOptions({
          title:  'Poznamky objektu '+objectId ,
          objects: true
        });
      });
      
    }

    const loadNotes = async () => {
        
        if(objectId==0 || objectId==undefined){
            let note = await get("/api/note");
            setNotes(note)
            
        }
        else {
            
            let note = await get("/api/note/byobject/"+objectId);
            setNotes(note)
               
           
        }
    }

    const deleteNote = async (index) => {
        await remove("/api/note/"+index); 
        loadNotes();
       
    }
   
    useEffect(() => {
        loadNotes();
    }, [route]);


    return (
        <ScrollView style={[styles.container]}>
            <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      
    />
        <List.Section>
            {
            
            notes && 
            notes.map((note,index)=>{
               
                if(String(note.content).toLowerCase().includes(String(searchQuery).toLowerCase()) 
                    || searchQuery === '')
                {
                    return   (
                    <List.Item
                        key={index}
                        title={note.content}
                        description={note.created_at}
                        right = {() =>  
                        <View style={{flexDirection:"row"}}>
                                <IconButton
                                icon="format-list-bulleted"
                                size={20}
                                onPress={() => navigation.navigate("newnote",{note:note})}
                            />
                            <IconButton
                                icon="trash-can-outline"
                                size={20}
                                onPress={()=>deleteNote(note.id)}
                            />
                        </View>}
                        
                    />
                )
                } else{
                    return null;
                }
                
            })
       
            }
            </List.Section>
           
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
       
        
        borderWidth: 1,

    },
    title: {
        fontSize: 32,
    },
    flexbox: {
        display: 'flex'
    },
    btn:{
        alignSelf: 'flex-end'
    }
});


