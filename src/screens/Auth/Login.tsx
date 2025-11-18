import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

export default function Login({ navigation }) {
    const [mobile, setMobile] = useState("");

    const handleContinue = () => {
        if (mobile.length !== 10) {
            Alert.alert("Enter a valid 10-digit phone number");
            return;
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        Alert.alert("OTP Sent", `Your OTP is ${otp}`);
        navigation.navigate("Otp", { mobile, otp });
    };

    return (
        <View style={{
            flex: 1,
            padding: 30,
            backgroundColor: '#fff',
            justifyContent: 'center'
        }}>

            <View style={{ alignItems: "center", marginBottom: 30 }}>
                <Image
                    source={require('../../assets/login.jpg')}
                    style={{ width: 140, height: 140, backgroundColor: '#fff', borderRadius: 70 }}
                />
            </View>

            <Text style={{
                fontSize: 26,
                fontWeight: "700",
                marginBottom: 10,
                color: "#222",
                textAlign: "center"
            }}>Send OTP</Text>

            <Text style={{ fontSize: 14, marginBottom: 8, color: "#444" }}>
                Phone Number
            </Text>

            <TextInput
                placeholder="Enter 10-digit number"
                keyboardType="number-pad"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
                style={{
                    borderWidth: 1.5,
                    borderColor: "#ddd",
                    padding: 14,
                    borderRadius: 12,
                    fontSize: 16,
                    marginBottom: 20,
                    color: "#222"
                }}
            />

            <TouchableOpacity
                onPress={handleContinue}
                style={{
                    backgroundColor: "#4d90fe",
                    padding: 16,
                    borderRadius: 50,
                    alignItems: "center",
                    marginTop: 10
                }}
            >
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    );
}
