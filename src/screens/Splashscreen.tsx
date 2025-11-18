import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        setTimeout(async () => {
            const user = await AsyncStorage.getItem("USER");

            if (user) {
                navigation.replace("Dashboard");
            } else {
                navigation.replace("Login");
            }
        }, 2000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 26, fontWeight: "bold" }}>Discover the World</Text>
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        </View>
    );
}
