import  React, { useState,useEffect } from 'react';
import { SafeAreaView,Pressable, Modal,TextInput,Button, 
    View, Text ,Switch,StyleSheet,ScrollView,ToastAndroid,
    Platform,AlertIOS} from 'react-native';
    import {  PermissionsAndroid,  StatusBar } from "react-native";
import {Chip,List} from 'react-native-paper';
import Permissions from "./Permissions";
import DateTimePicker from '@react-native-community/datetimepicker';
import { URL,get,create,update } from './../global';
import AsyncStorage from '@react-native-community/async-storage';
import MultiSelect from 'react-native-multiple-select';
import RNPickerSelect from "react-native-picker-select";


const NoteNewScreen = ({route, navigation}) => {
    const { note } = useState(route.params);
    const [selectedValue, setSelectedValue] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [date, setDate] = useState(route?.params?.note !== undefined?new Date(route?.params?.note.created_at.toString().replace(' ','T')):new Date());
    const timeFormat =()=>{
        let datetime = '';
        if(date.getHours().toString().length>1) 
            datetime = date.getHours().toString()+':';
        else
            datetime = '0'+date.getHours().toString()+':';
        if(date.getMinutes().toString().length>1)
            datetime += date.getMinutes().toString();
        else
            datetime += '0'+date.getMinutes().toString();
       return datetime;
    }
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState(typeof route?.params?.note !== "undefined"?route?.params?.note.content:'2021-01-01');
    const [newTag, setNewTag] = useState('newTag');
    const [tags,setTags] = useState([{id: 1, name: 'angellist'}]);
    const currentDate = date.getDate().toString()+'.'+(date.getMonth()+1).toString()+'.'+date.getFullYear().toString();
    const currentTime = timeFormat();
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
        console.log(selectedDate);
      setDate(currentDate);
      setShow(Platform.OS === 'ios' ? true : false);
    };
    
   

   
    
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
      
    };

    const loadTags = async () => {
        setTags(await get("/api/tag"));

    }
   
    const onSelectedItemsChange = (selectedItems) => {
        // Set Selected Items
        setSelectedItems(selectedItems);
      };

    useEffect(() => {tags
        loadTags();
    }, []);

    const createTag = async () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show("Tag was created", ToastAndroid.SHORT)
        } else {
            AlertIOS.alert("Tag was created");
        }
        await create("/api/tag",{name:newTag});
        useEffect(() => {tags
            loadTags();
        }, []);
    }
    const saveNote = async () => {

       if(!route?.params?.note){
        console.debug("saveNote");
            await create("/api/note",{
                content: text,
                def: 1,
                scan_at: date.toISOString(),
                send_at: date.toISOString(),
                object_id: 1
            });
        }else{
            
            let asdf = await update("/api/note/"+route.params.note.id,{
                content: text,
                def: route.params.note.def,
                scan_at: date.toISOString(),
                send_at: date.toISOString(),
                object_id: route.params.note.object_id
            });
            if (Platform.OS === 'android') {
                ToastAndroid.show("Note was updated", ToastAndroid.SHORT)
            } else {
                AlertIOS.alert("Note was updated");
            }
            navigation.navigate("objects");
            
        }
    }

    
    return (
        
        <View style={styles.container}>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.item}>Datum:</Text> 
                <Pressable style={{padding:10,width:150,
                borderWidth: 1,
                borderRadius: 10}}
                onPress={showDatepicker}  >
                    <Text>{currentDate}</Text>
                </Pressable>
            </View>

            <View style={{flexDirection: 'row',marginTop:10}}>
                <Text style={styles.item}>Cas:     </Text> 
                <Pressable style={{padding:10,width:150,
                borderWidth: 1,
                borderRadius: 10}}
                onPress={showTimepicker}  >
                    <Text>{currentTime}</Text></Pressable>
            </View>

            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
                
            )}

            <View style={{flexDirection: 'row',marginTop:10}}>
                <Text style={styles.item}>Merat  cas: </Text>
                    <Switch  style={styles.btn,{marginLeft:20}}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
            </View>
            <View style={{
                width:"100%",
                borderWidth: 2,
                borderRadius: 10}}> 
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder='Text poznamky'
                    onChangeText={(text) => setText(text)}
                    value={text}
                    style={{backgroundColor: '#fafafa'},styles.item}/>
            </View>
            <View style={{flexDirection: 'row',marginTop:10,marginBottom:10}}>
                <Text style={styles.item}>Zadat trvanie: </Text> 
                <View style={{padding:10,width:150,
                borderWidth: 1,
                borderRadius: 10}}>
                    <RNPickerSelect
                        
                        value={selectedValue}
                        useNativeAndroidPickerStyle={false}
                    
                        onValueChange={(label) => setSelectedValue(label)
                       }
                            items={[
                                { label: '1/2 hour', value: 0.5 },
                                { label: '1 hour', value: 1 },
                                { label: '2 hours', value: 2 },
                                { label: '24 hours', value: 24 },
                            ]}
                    />
                </View>
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.item}>Tagy </Text>
                <Text style={styles.item}>  {
                    tags.map((tag)=>{
                        if(selectedItems.includes(tag.id))
                        {
                            return <Chip key={tag.id} style={{border:'1px solid black'}}>{tag.name}</Chip>;
                        } else{
                            return null;
                        }
                    })
                    
                }</Text>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <SafeAreaView style={styles.container}>
                                        <List.Section style={styles.containerSelect}>
                                            <Text style={styles.titleText}>
                                            Multiple Select Tag
                                            </Text>
                                            <View style={{flexDirection: 'row',marginRight:5,}}>
                                                <Text style={{marginTop:15}}>Create new tag:</Text>
                                                <View style={{
                                                    borderWidth: 1,marginLeft:5,
                                                    marginBottom:10,
                                                    borderRadius: 5}}>
                                                <TextInput
                                                    placeholder='New tag'
                                                    onChangeText={(newtag) => {setNewTag(newtag)
                                                    }}
                                                    value={newTag}
                                                    style={{backgroundColor: '#fafafa'},
                                                    styles.item}/>   
                                                    </View>
                                                    
                                            </View>
                                            <Button  onPress={createTag} title="Save"></Button>
                                            <MultiSelect
                                            hideTags
                                            items={tags}
                                            uniqueKey="id"
                                            onSelectedItemsChange={onSelectedItemsChange}
                                            selectedItems={selectedItems}
                                            selectText="Pick Tags"
                                            
                                            onChangeInput={(text) => console.log(text)}
                                            
                                            displayKey="name"
                                            searchInputStyle={{color: '#CCC'}}
                                            submitButtonColor="#2196F3"
                                            submitButtonText="Submit"
                                            />
                                            
                                        </List.Section>
                                </SafeAreaView>
                                    <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                    >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                    </Pressable>
                                </View>
                                </View>
                        </Modal>
                            
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>+</Text>
                    </Pressable>

            </View>

            <View style={{paddingTop:10,marginLeft:'20%'}}>
            <Button style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}} title="Vyber z predvolenych"></Button>
            </View> 

            <View style={{paddingTop:10,marginLeft:'26%'}}>
            <Button  onPress={saveNote} title="Ulozit poznamku"></Button>
            </View>
        </View>
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

export default NoteNewScreen;
