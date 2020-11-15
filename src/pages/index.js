import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { theme } from "../theme/theme"
import Layout from "../components/layout"
import Button from "../components/button"
import SEO from "../components/seo"

const HeroTextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  text-align: center;
`

const HeroText = styled.h1`
  font-size: 68px;

  @media (max-width: 768px) {
    font-size: 38px;
  }
`

const HeroSubtitle = styled.p`
  font-size: 28px;
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
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`payroll`, `tax`, `salary`, `money`, `payroll provider`]}
        />
        <HeroTextContainer>
          <HeroText>
            I'm tired of... <br />
            manual spreadsheet uploads
          </HeroText>
          <HeroSubtitle>Help us build your ideal payroll provider</HeroSubtitle>
          <a
            href="https://forms.gle/rmymUndxVvng4cjj9"
            style={{ boxShadow: "none" }}
          >
            <Button marginBottom="1rem">Tell us what's fraustrating you</Button>
          </a>
          <ButtonExplainer>
            Do you run payroll? We'd love to hear from you!
            <br />A few short answers will help us learn a lot.
          </ButtonExplainer>
        </HeroTextContainer>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
