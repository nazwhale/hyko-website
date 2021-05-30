import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import Button from "../components/button"
import styled from "styled-components"
import { theme } from "../theme/theme"

const HeroTextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  text-align: center;
`

const HeroSubtitle = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const ButtonExplainer = styled.p`
  font-size: 18px;
  font-weight: 200;
  color: ${theme.color.darkGrey};
  margin-top: 1rem;
  margin-bottom: 0;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

function API(props) {
  const { data, location } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="API" />
      <HeroTextContainer>
        <h1>
          The payroll API for the UK
          <br />
        </h1>
        <HeroSubtitle>
          We're building a modern payroll API for the next generation of
          accounting and HR products
          <br />
        </HeroSubtitle>
        <a href="https://calendly.com/naz-onfolk" style={{ boxShadow: "none" }}>
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
          For early partners we're open to building to your spec
          <br />
          Documentation + sandbox arriving summer '21
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
