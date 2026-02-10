const config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    // Safelist dynamic classes that can't be detected by JIT compiler
    // Used in ColorsSection for primary color palette display
    safelist: [
        'bg-primary-50',
        'bg-primary-100',
        'bg-primary-200',
        'bg-primary-300',
        'bg-primary-400',
        'bg-primary-500',
        'bg-primary-600',
        'bg-primary-700',
        'bg-primary-800',
        'bg-primary-900',
    ],
    theme: {
        extend: {
            colors: {
                // Primary colors - driven by CSS variables
                primary: {
                    50: 'rgb(var(--color-primary-50) / <alpha-value>)',
                    100: 'rgb(var(--color-primary-100) / <alpha-value>)',
                    200: 'rgb(var(--color-primary-200) / <alpha-value>)',
                    300: 'rgb(var(--color-primary-300) / <alpha-value>)',
                    400: 'rgb(var(--color-primary-400) / <alpha-value>)',
                    500: 'rgb(var(--color-primary-500) / <alpha-value>)',
                    600: 'rgb(var(--color-primary-600) / <alpha-value>)',
                    700: 'rgb(var(--color-primary-700) / <alpha-value>)',
                    800: 'rgb(var(--color-primary-800) / <alpha-value>)',
                    900: 'rgb(var(--color-primary-900) / <alpha-value>)',
                },
                // Status colors
                success: {
                    50: 'rgb(var(--color-success-50) / <alpha-value>)',
                    500: 'rgb(var(--color-success-500) / <alpha-value>)',
                    700: 'rgb(var(--color-success-700) / <alpha-value>)',
                },
                warning: {
                    50: 'rgb(var(--color-warning-50) / <alpha-value>)',
                    500: 'rgb(var(--color-warning-500) / <alpha-value>)',
                    700: 'rgb(var(--color-warning-700) / <alpha-value>)',
                },
                error: {
                    50: 'rgb(var(--color-error-50) / <alpha-value>)',
                    500: 'rgb(var(--color-error-500) / <alpha-value>)',
                    700: 'rgb(var(--color-error-700) / <alpha-value>)',
                },
                info: {
                    50: 'rgb(var(--color-info-50) / <alpha-value>)',
                    500: 'rgb(var(--color-info-500) / <alpha-value>)',
                    700: 'rgb(var(--color-info-700) / <alpha-value>)',
                },
                // Semantic colors
                background: 'rgb(var(--color-background) / <alpha-value>)',
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
                'surface-elevated': 'rgb(var(--color-surface-elevated) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
                'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
                'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
                'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
            },
            fontFamily: {
                sans: 'var(--font-sans)',
                mono: 'var(--font-mono)',
            },
            fontSize: {
                xs: 'var(--font-size-xs)',
                sm: 'var(--font-size-sm)',
                base: 'var(--font-size-base)',
                lg: 'var(--font-size-lg)',
                xl: 'var(--font-size-xl)',
                '2xl': 'var(--font-size-2xl)',
                '3xl': 'var(--font-size-3xl)',
            },
            borderRadius: {
                none: 'var(--radius-none)',
                sm: 'var(--radius-sm)',
                DEFAULT: 'var(--radius-md)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
                '2xl': 'var(--radius-2xl)',
                full: 'var(--radius-full)',
            },
            transitionDuration: {
                fast: 'var(--transition-fast)',
                normal: 'var(--transition-normal)',
                slow: 'var(--transition-slow)',
            },
            spacing: {
                sidebar: 'var(--sidebar-width)',
                'sidebar-collapsed': 'var(--sidebar-collapsed-width)',
                header: 'var(--header-height)',
            },
        },
    },
    plugins: [],
};
export default config;
