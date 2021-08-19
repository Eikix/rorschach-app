module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'beige': '#faf3f3',
        'offwhite': '#fffff4',
        'lightblue': '#e1e5ea',
        'mediumblue':'#a7bbc7',
        'rose': '#da7f8f',
        'color1': '#0b152f',
        'color2': '#153074',
        'color3': '#285ad6',
        'color4': '#628df6',
        'color5': '#93aef0',
        'color6': '#aebde2',
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover", "hover"],
      borderWidth: ["group-hover"],
      animation: ["group-hover", "hover", "focus",],
      fontWeight: ["group-hover","hover",],
    },
  },
  plugins: [],
}
