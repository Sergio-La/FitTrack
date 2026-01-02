import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// --- IMPORTACIONES DE ASSETS Y LÓGICA ---
import Logo from '../components/assets/icons/Logo';
import { CustomBottom } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { COLORS, SIZES } from '../constants/theme';
import { ejecutarPruebaDB, loginUsuario } from '../database/db-service';

const LoginScreen = () => {
    // --- ESTADOS (MEMORIA) DEL FORMULARIO ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Ejecutar consulta para crear un usuario de prueba
    useEffect(() => {
        ejecutarPruebaDB();
    }, []);

    // Hook para la navegación de Expo Router
    const router = useRouter();

    // --- Validación de email ---
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    // --- LÓGICA DE AUTENTICACIÓN ---
    const handleLogin = () => {
        // validar si los campos estan llenos
        if (!email || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        // validar si el email es correcto
        if (!validateEmail(email)) {
            alert("Por favor, ingresa un email válido.");
            return;
        }
        // Llamada al controlador con los datos de los inputs
        const response = loginUsuario(email, password);

        if (response?.success) {
            // Si el login es exitoso, redirigimos al Home (Tabs)
            router.replace('/(tabs)');
        } else {
            // Si falla, mostramos una alerta al usuario
            alert(response?.message);
        }
    }

    return (
        <SafeAreaProvider style={styles.mainContainer}>
            {/* Contenedor que agrupa y centra todo el contenido verticalmente */}
            <View style={styles.contentContainer}>

                {/* SECCIÓN 1: ENCABEZADO (Logo y Mensajes) */}
                <View style={styles.headerContainer}>
                    <Logo />
                    <Text style={styles.title}>Fit Track</Text>
                    <Text style={styles.subtitle}>Welcome back. Crush your goals.</Text>
                </View>

                {/* SECCIÓN 2: FORMULARIO (Inputs y Botón) */}
                <View style={styles.formContainer}>
                    <CustomInput
                        label="Email"
                        iconLeft="email-outline"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* SECCIÓN 2.1: INPUT DE CONTRASEÑA */}
                    <CustomInput
                        label="Password"
                        iconLeft="lock-outline"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />


                    {/* Botón de Acción */}
                    <CustomBottom
                        label="Log In"
                        iconName="arrow-right"
                        onPress={handleLogin}
                    />
                </View>
            </View>
        </SafeAreaProvider>
    );
};

// --- ESTILOS OPTIMIZADOS ---
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center', // Centra todo el contenido verticalmente 🎯
        paddingHorizontal: SIZES.base * 3, // Margen lateral cómodo
    },
    headerContainer: {
        alignItems: 'center', // Centra logo y textos horizontalmente
        marginBottom: SIZES.base * 4, // Espacio antes del formulario
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: SIZES.font * 2,
        color: COLORS.textHigh,
        marginTop: SIZES.base * 2,
    },
    subtitle: {
        color: COLORS.textMedium,
        fontSize: SIZES.font,
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
    },
});

export default LoginScreen;