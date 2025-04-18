import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configArcoResolverPlugin from './plugin/arcoResolver';
import configStyleImportPlugin from './plugin/styleImport';
import configImageminPlugin from './plugin/imagemin';

const timestamp = new Date().getTime();
export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configStyleImportPlugin(),
      configImageminPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
          // 文件名哈希化
          chunkFileNames: `assets/[name].[hash]${timestamp}.js`,
          entryFileNames: `assets/[name].[hash]${timestamp}.js`,
          assetFileNames: `assets/[name].[hash]${timestamp}.[ext]`,
        },
      },
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: [
        {
          find: 'vue',
          replacement: 'vue/dist/vue.esm-bundler.js', // 需要编译tmp
        },
      ],
    },
  },
  baseConfig
);
