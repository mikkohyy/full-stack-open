import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    basicBackground: "lightgrey",
    elementBackground: "white",
    primary: "#0366d6",
    barColor: "#bc93c9",
    separatorColor: "lightgrey",
    languageBackground: "#7a5985",
    languageText: "white",
    buttonColor: "#93c9a0",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    tabItem: 20,
    form: 16,
    score: 22,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
