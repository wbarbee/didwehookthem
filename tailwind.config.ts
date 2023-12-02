import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundColor: {
				whiteFrost: 'rgba(255,255,255,0.5)',
				blackFrost: 'rgba(0,0,0,0.1)',
			},
			colors: {
				burntOrange: '#c05700',
			},
			borderColor: {
				burntOrange: '#c05700',
			},
			animation: {
				'fade-in': 'fadeIn 0.65s ease-out',
				'pulse-opacity': 'pulse 5s infinite',
				spin: 'spin 2s linear infinite',
			},
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				gothic: ['Gothic A1', 'sans-serif'],
				oxanium: ['Oxanium', 'sans-serif'],
				graduate: ['Graduate', 'serif'],
			},
			keyframes: {
				pulse: {
					'0%, 100%': { opacity: '1.0' },
					'50%': { opacity: '0.3' },
				},
				spin: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				fadeIn: {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				},
			},
		},
	},
	plugins: [],
};
export default config;
