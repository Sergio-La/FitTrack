// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { colors, typography } from '../theme';

// Creamos el "objeto" que controlará las pestañas
const Tab = createBottomTabNavigator();
// Estas funciones representan tus 5 pantallas vacías
const Dashboard = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Dashboard</Text></View>;
const Ejercicios = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Ejercicios</Text></View>;
const Rutinas = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Rutinas</Text></View>;
const PlanSemanal = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Plan Semanal</Text></View>;
const IniciarRutina = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Iniciar Rutina</Text></View>;

