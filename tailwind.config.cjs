module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				fira: ['Fira Code', 'monospace'],
				roboto: ['Roboto', 'sans-serif'],
				ibm: ['IBM Plex Sans', 'sans-serif']
			},
			colors: {
				vulcan: '#0A0E17',
				mirage: '#111722',
				caribbean: '#01c77a',
				radical: '#ff3b6a',
				cerulean: '#00b4c8',
				oslo: '#878b90',
				gray: '#3A3F48'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
