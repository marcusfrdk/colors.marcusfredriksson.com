const isDev = process.env.NODE_ENV === "development";
const isAnalyzing = process.env.ANALYZE === "true";
const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: isAnalyzing,
});

const csp = [
  "default-src 'self'",
  "img-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self'${isDev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self' ${isDev ? "*" : ""}`,
].join("; ");

const headerValues = {
  "X-Frame-Options": {
    value: "DENY",
  },
  "X-DNS-Prefetch-Control": {
    value: "on",
  },
  "Strict-Transport-Security": {
    value: "max-age=63072000; includeSubDomains; preload",
  },
  "X-XSS-Protection": {
    value: "1; mode=block",
  },
  "X-Content-Type-Options": {
    value: "nosniff",
  },
  "Referrer-Policy": {
    value: "origin-when-cross-origin, strict-origin-when-cross-origin",
  },
  "Content-Security-Policy": {
    value: csp,
  },
  "Content-Security-Policy-Report-Only": {
    value: csp,
    dev: true,
  },
};

const headers = {
  source: "/(.*)?",
  headers: Object.entries(headerValues)
    .map((header) => {
      if (!header[1].dev || isDev) {
        return {
          key: header[0],
          value: header[1].value,
        };
      }
    })
    .filter((f) => f),
};

const config = {
  poweredByHeader: false,
  pwa: {
    dest: "public",
    disable: isDev,
  },
  i18n: {
    locales: ["en", "se"],
    defaultLocale: "en",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [headers];
  },
};

module.exports = withBundleAnalyzer(withPWA(config));
