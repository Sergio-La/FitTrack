import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Logo from '../components/assets/icons/Logo';
import { COLORS, SIZES } from '../constants/theme';

const LoginScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.container}>
                <Logo></Logo>
                <Text style={styles.title}>Fit Track</Text>
                <Text style={styles.subtitle}>Welcome back. Crush your goals.</Text>
            </View>

            <View style={styles.formContainer}>
                {/*Email*/}
                <TextInput style={styles.textInput} placeholder="Email">
                </TextInput>
                {/*Password*/}
                <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Password">
                </TextInput>

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => {
                    console.log('Log In');
                    router.replace('/(tabs)');
                }}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: SIZES.base * 10,
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: SIZES.font * 2,
        color: COLORS.textHigh,
    },
    subtitle: {
        fontWeight: 'bold',
        color: COLORS.textMedium,
        lineHeight: SIZES.font * 1.5,
        fontSize: SIZES.font
    },
    logoContainer: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SIZES.base * 2
    },
    formContainer: {
        paddingHorizontal: SIZES.base * 2,
        marginTop: SIZES.base * 2,
        width: '100%'
    },
    textInput: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        height: 48,
        paddingHorizontal: SIZES.base * 2,
        color: COLORS.textHigh,
        fontSize: SIZES.font,
        marginBottom: SIZES.base * 2
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 48,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SIZES.base * 2
    },
    buttonText: {
        color: COLORS.textHigh,
        fontWeight: 'bold',
        fontSize: SIZES.font
    }
});

export default LoginScreen;
