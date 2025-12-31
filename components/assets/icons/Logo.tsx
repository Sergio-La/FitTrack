import * as React from "react";
import Svg, { G, Rect } from "react-native-svg";
import { COLORS } from "../../../constants/theme";

const Logo = ({ size = 80, ...props }) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            fill="none"
            {...props}
        >
            {/* 🟠 Fondo circular */}
            <Rect
                x="0"
                y="0"
                width="512"
                height="512"
                rx="100"
                ry="100"
                fill={COLORS.primary}
            />

            {/* 📊 Grupo centrado matemáticamente */}
            <G transform="translate(136, 126)">
                {/* Barra 1: Pequeña */}
                <Rect x="0" y="160" width="60" height="100" rx="10" fill="#F5F5F5" />

                {/* Barra 2: Mediana */}
                <Rect x="90" y="80" width="60" height="180" rx="10" fill="#F5F5F5" />

                {/* Barra 3: Grande */}
                <Rect x="180" y="0" width="60" height="260" rx="10" fill="#F5F5F5" />
            </G>
        </Svg>
    );
};

export default Logo;