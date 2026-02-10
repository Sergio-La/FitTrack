import react from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { colors, typography, spacing, branding } from '../theme';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
}

export const Header = ({
    title,
    showBack,
    onBack,
}: HeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {
                    showBack && (
                        <Pressable onPress={onBack} style={styles.backButton}>
                            <ChevronLeft size={28} color={branding.primary} />
                        </Pressable>
                    )
                }
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
            <View style={styles.rightContainer}>
                {/* Right content can be added here */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.paddingGlobal,
        backgroundColor: colors.dark.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.dark.border,
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    backButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...typography.display,
        color: colors.dark.textHigh,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    centerContainer: {
        flex: 2,
        alignItems: 'center',
    },
});