import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
} from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { get, URL } from './../global';
import AsyncStorage from '@react-native-community/async-storage';

const TextInputExample = ({navigation}) => {
	const { colors } = useTheme();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const login = () => {
		fetch(URL + "/login", {
			method: 'post',
			body: JSON.stringify({
				username: username,
				password: password,
			}),
			headers: { 'Content-Type': 'application/json' },
		}).then((res) => {
			return res.json();
		}).then( async (json) => {
			if (json.access_token) {
				await AsyncStorage.setItem('@token', json.access_token);
				await AsyncStorage.setItem('@username', username);
				await AsyncStorage.setItem('@password', password);
				global.access_token = json.access_token;
		
				navigation.reset({
					index: 0,
					routes: [{ name: 'bottom' }],
				});
			} else {
				setErrorMessage('Nesprávne meno alebo heslo');
			}
		}).catch(err => {
			setErrorMessage(String(err));
		})
	};

	const  autoLogin = async () => {
		let pass = await AsyncStorage.getItem('@password');
		let log = await AsyncStorage.getItem('@username');
	
		if(log !== undefined && pass !== undefined){		
			setPassword(pass);
			setUsername(log);		
			login();

		}
	}

	autoLogin();

	return (
		<ScrollView
			style={[styles.container]}
			keyboardShouldPersistTaps={'always'}
			removeClippedSubviews={false}
		>
			<View style={styles.inputContainerStyle}>
				<TextInput
					style={styles.inputContainerStyle}
					label="Meno"
					value={username}
					onChangeText={text => setUsername(text)}
					style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
					placeholder="Enter username, only letters"
				/>
				<TextInput
					style={styles.inputContainerStyle}
					label="Heslo"
					secureTextEntry={true}
					value={password}
					onChangeText={text => setPassword(text)}
					style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
					placeholder="Enter username, only letters"
				/>
				{
					errorMessage && 
					<Text 
						style={{ ...styles.mTop, color: colors.danger }}
					>
						{errorMessage}
					</Text>
				}
				<Button 
					mode="contained"
					onPress={login}
					style={styles.mTop}
				>
					Prihlásiť
				</Button>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	},
	inputContainerStyle: {
		margin: 8,
	},
	mTop: {
		marginTop: 8,
	},
});

export default TextInputExample;