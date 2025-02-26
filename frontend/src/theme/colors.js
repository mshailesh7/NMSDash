// Primary brand colors
export const colors = {
  primary: {
    main: '#00c700',     // Main brand color - Green
    light: '#e6f7e6',    // Light green for backgrounds
    dark: '#00b300',     // Darker green for hover states
    100: '#f0faf0',
    200: '#e6f7e6',
    300: '#b3e6b3',
    400: '#80d980',
    500: '#00c700',      // Main brand color
    600: '#00b300',
    700: '#009900',
  },
  
  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic colors
  semantic: {
    success: '#00c700',
    warning: '#fbbf24',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },

  // Text colors
  text: {
    primary: '#1f2937',
    secondary: '#4b5563',
    tertiary: '#6b7280',
    inverse: '#ffffff',
  },

  // Border colors
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
};

// Common styles
export const commonStyles = {
  // Button styles
  button: {
    primary: {
      bg: colors.primary.main,
      text: '#ffffff',
      hoverBg: colors.primary.dark,
      activeBg: colors.primary.dark,
      disabledBg: colors.primary[300],
    },
    secondary: {
      bg: '#ffffff',
      text: colors.primary.main,
      border: colors.primary.main,
      hoverBg: colors.primary.main,
      hoverText: '#ffffff',
    },
    danger: {
      bg: colors.semantic.error,
      text: '#ffffff',
      hoverBg: '#dc2626',
    },
  },

  // Card styles
  card: {
    background: '#ffffff',
    border: colors.border.light,
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    hoverShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },

  // Input styles
  input: {
    background: '#ffffff',
    border: colors.border.medium,
    focusBorder: colors.primary.main,
    text: colors.text.primary,
    placeholder: colors.text.tertiary,
  },
};

// Typography
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
