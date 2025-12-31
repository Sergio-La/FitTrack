import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// --- IMPORTACIONES DE ASSETS Y LÓGICA ---
import Logo from '../components/assets/icons/Logo';
import { COLORS, SIZES } from '../constants/theme';
import { login } from '../controller/authController';

const LoginScreen = () => {
    // --- ESTADOS (MEMORIA) DEL FORMULARIO ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Hook para la navegación de Expo Router
    const router = useRouter();

    // --- LÓGICA DE AUTENTICACIÓN ---
    const handleLogin = () => {
        // Llamada al controlador con los datos de los inputs
        const response = login(email, password);

        if (response.success) {
            // Si el login es exitoso, redirigimos al Home (Tabs)
            router.replace('/(tabs)');
        } else {
            // Si falla, mostramos una alerta al usuario
            alert("El usuario no existe o la contraseña es incorrecta.");
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
                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.inputContainer}>
                        {/* Icono de sobre para el Email ✉️ */}
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={20}
                            color={COLORS.textMedium}
                            style={styles.inputIcon}
                        />
                        {/* Campo de Email */}
                        <TextInput
                            style={styles.textInputInside}
                            onChangeText={setEmail}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Email"
                            placeholderTextColor={COLORS.textMedium}
                        />
                    </View>

                    {/* SECCIÓN 2.1: INPUT DE CONTRASEÑA */}
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons
                            name="lock-outline"
                            size={20}
                            color={COLORS.textMedium}
                            style={styles.inputIcon}
                        />
                        {/* Campo de Contraseña */}
                        <TextInput
                            style={styles.textInputInside}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={!isPasswordVisible}
                            placeholder="Password"
                            placeholderTextColor={COLORS.textMedium}
                        />

                        {/* Nuestro propio ojo con el color correcto 🎨 */}
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <MaterialCommunityIcons
                                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color={COLORS.textMedium} // Ahora sí es blanco/homogéneo
                            />
                        </TouchableOpacity>
                    </View>


                    {/* Botón de Acción */}
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={handleLogin}
                    >
                        {/* Contenedor interno para alinear texto e icono */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.buttonText}>Log In</Text>

                            {/* La flecha a la derecha ➡️ */}
                            <MaterialCommunityIcons
                                name="arrow-right"
                                size={20}
                                color={COLORS.textMedium} // El mismo color oscuro que definimos para el texto
                                style={{ marginLeft: 8 }} // Pequeño espacio entre el texto y la flecha
                            />
                        </View>
                    </TouchableOpacity>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        height: 56,
        paddingHorizontal: SIZES.base * 2,
        marginBottom: SIZES.base * 2,
    },
    inputLabel: {
        color: COLORS.textMedium,
        fontSize: SIZES.font,
        marginBottom: SIZES.base,
        fontWeight: 'bold',
    },
    inputIcon: {
        marginRight: SIZES.base,
    },

    textInputInside: {
        flex: 1,
        color: COLORS.textMedium,
        fontSize: SIZES.font,
        height: '100%',
        marginLeft: SIZES.base,
        backgroundColor: 'transparent',
        outline: 'none',
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.base,
    },
    buttonText: {
        color: COLORS.textHigh,
        fontWeight: 'bold',
        fontSize: SIZES.font,
        textTransform: 'uppercase',
    }
});

export default LoginScreen;