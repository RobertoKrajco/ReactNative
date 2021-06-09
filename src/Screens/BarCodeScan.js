import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { URL,get } from './../global';

export default function BarCodeScan({route,navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const verifyObject = async (scannedId) => {
        let objects = await get("/api/object");
        objects.array.forEach(object => {
            if(object.id == scannedId){
                console.log("valid");
                return true;
            }
        });
        return false;
    }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if(verifyObject(data))
        navigation.navigate("newnote",{objectId:data})
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
      }});