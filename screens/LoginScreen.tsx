import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants/theme';

const LoginScreen = () => {
    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.container}>
                {/* Aquí irá el Logo que ves en tu maqueta */}

                {/* Aquí irán los textos de bienvenida */}
            </View>
            {/*Email*/}
            <TextInput style={styles.textInput} >
            </TextInput>
            {/*Password*/}
            <TextInput style={styles.textInput} >
            </TextInput>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: SIZES.base * 10,
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: SIZES.font * 2
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
    }
});

export default LoginScreen;
