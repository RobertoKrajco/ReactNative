

import React, { useEffect, useState } from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import { List, Searchbar,IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { URL,get,remove } from './../global';


export default function NotesScreen({ index,route,navigation }) {

    const [notes, setNotes] = useState([]);
    let {objectId} = 0;
    if(route.params !== undefined)
        objectId = route.params.objectId;
    let {render} = false;
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query) => setSearchQuery(query);
    console.log("Poznamky"+objectId);
    if(index ==0)
    if(objectId==0 || objectId==undefined)
    React.useLayoutEffect(() => {
        
        navigation.setOptions({
          title:  'Poznamky' ,
          objects: false
        });

      });
      else
      React.useLayoutEffect(() => {
       
        navigation.setOptions({
          title:  'Poznamky objektu '+objectId ,
          objects: false
        });
      });
      

    const loadNotes = async () => {
        console.log("objid "+objectId +objectId==0 || objectId==undefined)
        if(objectId==0 || objectId==undefined){
            let note = await get("/api/note");
            setNotes(note);
        }
        else {
            let note = await get("/api/note/"+objectId);
            setNotes(note);
        }
        
        console.log("notes");
        console.log(notes);
    }

    const deleteNote = async (index) => {
        await remove("/api/note/"+index); 
        loadNotes();
       
    }
   
    useEffect(() => {notes
         loadNotes();
     
    }, []);

    const searchNotes = () => {
        
        
    }

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
               
                if(note.content.includes(searchQuery) || searchQuery === '')
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
                    console.log("null");
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


