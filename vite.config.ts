import { defineConfig, loadEnv } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        define: {
            LINE_CHANNEL_ACCESS_TOKEN: JSON.stringify(env.LINE_CHANNEL_ACCESS_TOKEN),
            LINE_CHANNEL_SECRET: JSON.stringify(env.LINE_CHANNEL_SECRET),
        },
        plugins: [
            ...VitePluginNode({
                adapter: 'express',
                appPath: './src/line-bot.cjs',
                exportName: "app",
            }),
        ],
    }
});
