/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      colors: {
        "on-primary": "#ffffff",
        "on-tertiary": "#ffffff",
        "surface-variant": "#e0e3e5",
        "on-secondary-container": "#57657a",
        "on-surface": "#191c1e",
        "outline-variant": "#c3c6d7",
        "inverse-surface": "#2d3133",
        "on-tertiary-container": "#bdffdb",
        "secondary-fixed": "#d5e3fc",
        "primary": "#004ac6",
        "surface-dim": "#d8dadc",
        "on-background": "#191c1e",
        "inverse-primary": "#b4c5ff",
        "on-tertiary-fixed": "#002113",
        "secondary-fixed-dim": "#b9c7df",
        "on-error": "#ffffff",
        "surface-container-high": "#e6e8ea",
        "secondary-container": "#d5e3fc",
        "on-secondary": "#ffffff",
        "tertiary": "#006242",
        "surface-container-lowest": "#ffffff",
        "surface-container": "#eceef0",
        "primary-container": "#2563eb",
        "primary-fixed": "#dbe1ff",
        "on-error-container": "#93000a",
        "secondary": "#515f74",
        "on-primary-fixed-variant": "#003ea8",
        "on-secondary-fixed-variant": "#3a485b",
        "tertiary-fixed-dim": "#4edea3",
        "tertiary-container": "#007d55",
        "surface-tint": "#0053db",
        "inverse-on-surface": "#eff1f3",
        "on-tertiary-fixed-variant": "#005236",
        "outline": "#737686",
        "error-container": "#ffdad6",
        "on-surface-variant": "#434655",
        "on-secondary-fixed": "#0d1c2e",
        "primary-fixed-dim": "#b4c5ff",
        "surface-bright": "#f7f9fb",
        "surface-container-low": "#f2f4f6",
        "surface": "#f7f9fb",
        "surface-container-highest": "#e0e3e5",
        "on-primary-fixed": "#00174b",
        "tertiary-fixed": "#6ffbbe",
        "background": "#f7f9fb",
        "error": "#ba1a1a",
        "on-primary-container": "#eeefff"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Manrope"],
        body: ["Inter"],
        label: ["Inter"]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}