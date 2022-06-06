import * as React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles.css"
import getTokens from "@kiwicom/orbit-components/lib/getTokens"
import ThemeProvider from "@kiwicom/orbit-components/lib/ThemeProvider"

const customTokens = getTokens({
  palette: {
    product: {
      light: "#9ae5da",
      lightHover: "#7fded0",
      lightActive: "#64d7c6",
      normal: "#00a991",
      normalHover: "#009882",
      normalActive: "#008f7b",
      dark: "#005448",
    },
  },
  base: {

  }
})

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <ThemeProvider
        theme={{
            yourCustomTheme: { black: "#000" },
            orbit: customTokens,
            rtl: false,
            transitions: false,
            lockScrolling: false,
        }}
    >
        <App />
    </ThemeProvider>
)