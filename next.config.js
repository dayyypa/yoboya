// next.config.js
module.exports = {
    experimental: {
      scrollRestoration: true,
      largePageDataBytes: 800 * 1000 //which exceeds the threshold of 128 kB 이슈로 인해 추가 현재 800kB로 늘려놓은 상태
    },
    reactStrictMode: false,
    swcMinify: true,
    future: {
      purgeLayersByDefault: true,
      removeDeprecatedGapUtilities: true,
    },
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        variants: {
          lineClamp: ['responsive', 'hover']
        },
      },
    },
    plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/line-clamp')],
  };
  