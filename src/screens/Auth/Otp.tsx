import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Otp({ route, navigation }) {
    const { mobile, otp } = route.params;

    const [digits, setDigits] = useState(["", "", "", ""]);
    const inputs = useRef(digits.map(() => React.createRef())).current;

    const handleChange = (value, index) => {

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        if (value && index < 3) {
            inputs[index + 1].current.focus();
        }
    };

    const handleConfirm = async () => {
        const entered = digits.join("");

        if (entered === otp) {
            await AsyncStorage.setItem("USER", JSON.stringify({ mobile }));
            navigation.replace("Dashboard");
        } else {
            Alert.alert("Invalid OTP");
        }
    };

    return (
        <View style={{ flex: 1, padding: 30, backgroundColor: "#fff", justifyContent: "center" }}>
            <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 10, color: "#222", textAlign: "center" }}>
                Verification Code
            </Text>
            <Text style={{ color: "#666", marginBottom: 30, textAlign: "center" }}>
                OTP to your phone number {mobile}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 40 }}>
                {digits.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={inputs[index]}
                        value={digit}
                        onChangeText={(value) => handleChange(value.slice(-1), index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={{
                            width: 60,
                            height: 60,
                            borderWidth: 1.5,
                            borderColor: "#ddd",
                            borderRadius: 12,
                            fontSize: 24,
                            textAlign: "center",
                            fontWeight: "600",
                            color: "#222"
                        }}
                    />
                ))}
            </View>


            <TouchableOpacity
                onPress={handleConfirm}
                style={{
                    backgroundColor: "#4d90fe",
                    padding: 16,
                    borderRadius: 50,
                    alignItems: "center"
                }}
            >
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600"  }}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
}
