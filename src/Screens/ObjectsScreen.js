
import React, { useEffect, useState } from 'react';
import {  View,ScrollView, StyleSheet } from 'react-native';
import { List,Button, Menu, Provider, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL,get } from './../global';
import MultiSelect from 'react-native-multiple-select';
import { SafeAreaView,Pressable, Modal,TextInput, 
     Text 
  } from 'react-native';





const ObjectsScreen = ({ index,route,navigation }) => {

    const [objects, setObjects] = useState([]);
    const [isOpen, setOpen] = React.useState(false);
    const onPressItemHandler = (value) => {
      setOpen(false);
      navigation.navigate("newnote",{objectId:value})
    };

    if(index==1)
    React.useLayoutEffect(() => {
        
        navigation.setOptions({
          title:  'Objekty' ,
          objects: true
        });
      });

    const loadObjects = async () => {
        setObjects(await get("/api/object"));
    }
    
    useEffect(() => {objects
      console.log("loading objects")
        loadObjects();
    }, []);

    return (
       
        <ScrollView style={{flex:1}}>
                <Menu
                  style={{ marginTop: 70 }}
                  visible={isOpen}
                  onDismiss={() => setOpen(false)}
                  anchor={
                    <Button
                      style={{ marginTop: 25 }}
                      icon="account"
                      mode="contained"
                      onPress={() => setOpen(true)}>
                      New Note
                    </Button>
                  }>
                
                  {
                      objects.map((o, index) => 
                        <Menu.Item
                          key={o.id}
                          onPress={() => onPressItemHandler(o.id)}
                          title={o.name}
                        />
                      )
                  }
                </Menu>                      

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

    containerSelect: {
        
        backgroundColor: 'white',
        padding: 10,
      },
    container: {
        flex: 1,
        padding:20,
        margin: 20,
        marginTop:0,
        marginLeft:10,
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
    item: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
    title: {
        fontSize: 32,
    },
    flexbox: {
        display: 'flex'
    },
    btn:{
        alignSelf: 'flex-end'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      headingText: {
        padding: 8,
      },
});
export default ObjectsScreen;
