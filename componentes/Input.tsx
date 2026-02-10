import react from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, borderRadius, typography, branding } from '../theme';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}