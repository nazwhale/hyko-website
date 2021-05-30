// src/@chakra-ui/gatsby-plugin/theme.js
import { extendTheme } from "@chakra-ui/react"
const theme = {
  fonts: {
    body: `"Palanquin", "Helvetica"`,
    heading: `"Palanquin", "Helvetica"`,
  },
  styles: {
    global: {
      body: {
        fontFamily: "Palanquin",
      },
    },
  },
}

export default extendTheme(theme)
