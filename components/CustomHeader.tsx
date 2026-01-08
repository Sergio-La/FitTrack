import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface Props {
    title: string;
    showBackButton?: boolean;
    onPress: () => void;
}

export const CustomHeader = ({ title, showBackButton = false, onPress }: Props) => {
    return (
        <View style={styles.container}>
            {showBackButton && (
                <TouchableOpacity onPress={onPress}>
                    <MaterialCommunityIcons name="arrow-left" size={SIZES.headerIcon} color={COLORS.textHigh} />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
    },
    title: {
        fontSize: SIZES.font,
        fontWeight: 'bold',
        color: COLORS.textHigh,
    },
});
