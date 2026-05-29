/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        body: 'var(--bg-primary)',
        surface: 'var(--surface)',
        card: 'var(--card-bg)',
        sidebar: 'var(--sidebar-bg)',
        sidebarText: 'var(--sidebar-text)',
        navbar: 'var(--navbar-bg)',
        navbarText: 'var(--navbar-text)',
        sidebarActive: 'var(--sidebar-active)',
        sidebarHover: 'var(--sidebar-hover)',
        sidebarBorder: 'var(--sidebar-border)',
        input: 'var(--input-bg)',
        border: 'var(--border-color)',
        muted: 'var(--muted)',
        primary: 'var(--text-primary)',
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
        button: 'var(--button-bg)',
        buttonText: 'var(--button-text)',
        buttonHover: 'var(--button-hover)',
        buttonAltBorder: 'var(--button-alt-border)',
        buttonAlt: 'var(--button-alt-bg)',
        buttonAltText: 'var(--button-alt-text)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        info: 'var(--info)',
      },
      boxShadow: {
        card: '0 12px 28px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      spacing: {
        sidebar: '16rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
