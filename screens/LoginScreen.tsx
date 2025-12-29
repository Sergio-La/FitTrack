import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants/theme';

const LoginScreen = () => {
    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.container}>
                {/* Aquí irá el Logo que ves en tu maqueta */}

                {/* Aquí irán los textos de bienvenida */}
            </View>
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
    }
});

export default LoginScreen;
