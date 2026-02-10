export const colors = {
    dark: {
        background: '#1A1A1A',
        surface1: '#2C2C2E',
        surface2: '#3A3A3C',
        textHigh: '#FFFFFF',
        textMed: '#BDBDBD',
        border: '#3A3A3C',
    },
    light: {
        background: '#F4F4F7',
        surface1: '#FFFFFF',
        surface2: '#E5E5EA',
        textHigh: '#1A1A1A',
        textMed: '#636366',
        border: '#D1D1D6',
    }
};

export const branding = {
    primary: '#FF5733',
    success: '#4CAF50',
    danger: '#D32F2F',
};

export const spacing = {
    base: 8,
    paddingGlobal: 16,
    gutter: 16,
};

export const borderRadius = {
    card: 16,
    inner: 12,
    button: 12, // Basado en tu radio de borde
};

export const typography = {
    display: {
        fontFamily: 'Bebas-Neue', // Asegúrate de cargarla después
        textTransform: 'uppercase',
        lineHeight: 1.1,
    },
    body: {
        fontFamily: 'Inter',
        lineHeight: 1.5,
    }
} as const;