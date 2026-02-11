import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Importamos tus componentes personalizados
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { colors, spacing } from '../../theme';

export const OnboardingName = () => {
    // Aquí usaremos un "Estado" para guardar el nombre temporalmente
    const [name, setName] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Input
                    label="¿CÓMO TE LLAMAS?"
                    placeholder="Escribe tu nombre"
                    value={name}
                    onChangeText={setName} // Guarda lo que el usuario escribe
                />

                <Button
                    title="CONTINUAR"
                    onPress={() => console.log('Siguiente pantalla')}
                    // El botón solo se activa si hay un nombre
                    style={{ marginTop: 20 }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
    },
    content: {
        padding: spacing.paddingGlobal,
        justifyContent: 'center',
        flex: 1,
    },
}); 