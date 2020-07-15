import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    html: {
      fontFamily: "Palanquin, sans-serif",
    },
    body: {
      fontFamily: "Palanquin, sans-serif",
    },
    h1: {
      fontFamily: "Palanquin, sans-serif",
      marginTop: "1rem",
    },
    h2: {
      fontFamily: "Palanquin, sans-serif",
    },
    h3: {
      fontFamily: "Palanquin, sans-serif",
    },
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
