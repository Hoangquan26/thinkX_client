module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure all component files are included
    './src/components/**/*.{js,jsx,ts,tsx}', // Include components directory
    './src/components/ui/**/*.{js,jsx,ts,tsx}', // Include UI components directory
    // ...existing paths...
  ],
  theme: {
    extend: {
      // ...existing theme extensions...
    },
  },
  plugins: [
    // ...existing plugins...
  ],
}
