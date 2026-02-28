/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: 'var(--background)',
					secondary: 'var(--background-secondary)',
					tertiary: 'var(--background-tertiary)',
					elevated: 'var(--background-elevated)',
				},
				surface: {
					DEFAULT: 'var(--surface)',
					hover: 'var(--surface-hover)',
					active: 'var(--surface-active)',
				},
				foreground: {
					DEFAULT: 'var(--foreground)',
					secondary: 'var(--foreground-secondary)',
					tertiary: 'var(--foreground-tertiary)',
					disabled: 'var(--foreground-disabled)',
				},
				primary: {
					DEFAULT: 'var(--primary)',
					hover: 'var(--primary-hover)',
					active: 'var(--primary-active)',
					light: 'var(--primary-light)',
				},
				success: {
					DEFAULT: 'var(--success)',
					bg: 'var(--success-bg)',
				},
				error: {
					DEFAULT: 'var(--error)',
					bg: 'var(--error-bg)',
				},
				warning: {
					DEFAULT: 'var(--warning)',
					bg: 'var(--warning-bg)',
				},
				info: {
					DEFAULT: 'var(--info)',
					bg: 'var(--info-bg)',
				},
				border: {
					DEFAULT: 'var(--border)',
					hover: 'var(--border-hover)',
					focus: 'var(--border-focus)',
				},
			},
			boxShadow: {
				sm: 'var(--shadow-sm)',
				DEFAULT: 'var(--shadow-md)',
				md: 'var(--shadow-md)',
				lg: 'var(--shadow-lg)',
				xl: 'var(--shadow-xl)',
				glow: 'var(--shadow-glow)',
				'glow-lg': 'var(--shadow-glow-lg)',
			},
			borderRadius: {
				sm: 'var(--radius-sm)',
				DEFAULT: 'var(--radius-md)',
				md: 'var(--radius-md)',
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
			},
			transitionDuration: {
				fast: '150ms',
				DEFAULT: '250ms',
				slow: '350ms',
				bounce: '400ms',
			},
			transitionTimingFunction: {
				'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
			},
			spacing: {
				'safe-top': 'var(--safe-area-top)',
				'safe-bottom': 'var(--safe-area-bottom)',
				'safe-left': 'var(--safe-area-left)',
				'safe-right': 'var(--safe-area-right)',
				'touch': '44px',
				'touch-comfortable': '48px',
			},
			minHeight: {
				'touch': '44px',
				'touch-comfortable': '48px',
			},
			minWidth: {
				'touch': '44px',
				'touch-comfortable': '48px',
			},
			backdropBlur: {
				xs: '2px',
			},
			keyframes: {
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px var(--primary-glow)' },
					'50%': { boxShadow: '0 0 40px var(--primary-glow)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-down': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.92)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.95)' },
				},
			},
			animation: {
				'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'fade-in': 'fade-in 250ms ease-out',
				'slide-up': 'slide-up 350ms ease-out',
				'slide-down': 'slide-down 350ms ease-out',
				'scale-in': 'scale-in 250ms ease-out',
				'bounce-subtle': 'bounce-subtle 250ms ease-in-out',
			},
			zIndex: {
				'dropdown': '1000',
				'sticky': '1020',
				'fixed': '1030',
				'modal-backdrop': '1040',
				'modal': '1050',
				'toast': '1060',
				'tooltip': '1070',
			},
		},
	},
	plugins: [],
};
