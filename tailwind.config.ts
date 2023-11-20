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
				whiteFrost: 'rgba(255,255,255,0.3)',
				blackFrost: 'rgba(0,0,0,0.1)',
			},
			colors: {
				burntOrange: '#e16f1f',
			},
			borderColor: {
				burntOrange: '#e16f1f',
			},
			animation: {
				'fade-in': 'fadeIn 0.65s ease-out',
			},
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				gothic: ['Gothic A1', 'sans-serif'],
			},
			keyframes: {
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
