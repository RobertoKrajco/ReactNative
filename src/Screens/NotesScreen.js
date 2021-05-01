

import React, { useEffect, useState } from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import { List, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { URL,get,remove } from './../global';


export default function NotesScreen({ route,navigation }) {
    const [notes, setNotes] = useState([]);
    const { objectId } = 0;


    const loadNotes = async () => {
        let note = await get("/api/note");
        setNotes(note);
        console.log(note);
    }

    const deleteNote = async (index) => {
        await remove("/api/note/"+index); 
        loadNotes();
       
    }
   
    useEffect(() => {notes
         loadNotes();
         console.log("asdfasdf"+notes);
    }, []);

    return (
        <ScrollView style={[styles.container]}>
        <List.Section>
            {
            
                notes && notes.map((note, index) =>
                    <List.Item
                        key={index}
                        title={note.content}
                       
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


