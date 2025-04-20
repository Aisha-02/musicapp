const tintColorLight = "#3A86FF"; // Bright blue
const tintColorDark = "#FF006E";  // Vibrant dark pink
const primary = "#FF006E";        // Main pink
const secondary = "#0A0A23";      // Deep navy background

export const Colors = {
  light: {
    text: "#0A0A23",           // Very dark blue for text
    background: "#FFFFFF",     // White background
    tint: tintColorLight,      
    icon: "#5C5F66",           // Slightly muted blue-grey
    tabIconDefault: "#5C5F66",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#F5F5FA",           // Light grey for dark mode text
    background: "#0A0A23",     // Deep navy
    tint: tintColorDark,       
    icon: "#B0B3B8",           // Soft light grey
    tabIconDefault: "#B0B3B8",
    tabIconSelected: tintColorDark,
  },
  PRIMARY: primary,             // Pink
  SECONDARY: secondary,         // Deep navy
};
