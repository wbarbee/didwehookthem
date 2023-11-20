import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			backgroundColor: {
				whiteFrost: 'rgba(255,255,255,0.3)',
				blackFrost: 'rgba(0,0,0,0.1)',
			},
			color: {
				burntOrange: '#BF5700',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out',
			},
			fontFamily: {
				playfair: 'Playfair Display',
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
