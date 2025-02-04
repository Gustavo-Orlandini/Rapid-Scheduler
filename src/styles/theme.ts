import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        gray: {
            "cardBackground": "#4e4e4e39",
            "999": "#0C0C0C",
            "table": "#1a1a1a",
            "900": "#282828",
            "700": "#3A3A3A",
            "600": "#606060",
            "500": "#949494",
            "400": "#C7C7C7",
            "300": "#EFEFEF",
            "200": "#F8F8F8",
            "10": "#FFFAF2",
        },
        orange: {
            "900": "#ED651D",
            "700": "#F7A31E",
            "500": "#F3BC64",
            "300": "#FBD79E",
        },
        merged: {
            "700": "#ED651D",
            "500": "#FF9761",
            "300": "#FFC3A4",
            "100": "#FFDECD",
        },
        blue: {
            "900": "#04557D",
            "700": "#1C8AC0",
            "500": "#1C8AC0",
            "200": "#DDF4FF",
        },
    },

    styles: {
        global: {
            'html, body': {
                bgColor: 'gray.800',
                h: '100vh',
                maxH: '100vh',
                listStylePosition: 'inside',
            },
        },
    },
    fonts: {
        body: "Inter, sans-serif",
        heading: "Roboto, sans-serif",
        akshar: "Akshar, sans-serif",
    },
});