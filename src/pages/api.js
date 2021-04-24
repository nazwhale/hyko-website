import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Button from "../components/button"
import { HeroSubtitle, HeroTextContainer, ButtonExplainer } from "./index"

function API(props) {
  const { data, location } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="API" />
      <HeroTextContainer>
        <h1>
          <span role="img" aria-label="blog">
            🗼{" "}
          </span>{" "}
          The payroll API for the UK
          <br />
        </h1>
        <HeroSubtitle>
          We're building a modern payroll API for the next generation of
          accounting and HR products
          <br />
        </HeroSubtitle>
        <a href="https://calendly.com/naz-hyko" style={{ boxShadow: "none" }}>
          <Button
            isBig={true}
            fontSize="1.2rem"
            marginBottom="1rem"
            height="4rem"
            paddingHorizontal="40px"
          >
            Talk to us
          </Button>
        </a>
        <ButtonExplainer>
          For the right partner we're open to building to your spec
          <br />
          Documentation + sandbox arriving Summer '21
        </ButtonExplainer>
      </HeroTextContainer>
    </Layout>
  )
}

export default API

export const pageQuery = graphql`
  query APIQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
