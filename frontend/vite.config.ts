import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/assets'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@service': path.resolve(__dirname, './src/service'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
});
