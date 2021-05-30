import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

import { theme } from "../theme/theme"
import Layout from "../components/layout"
import Button from "../components/button"
import SEO from "../components/seo"

export const HeroTextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  text-align: center;
`

export const HeroText = styled.h1`
  margin-top: 0;
  font-size: 58px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 38px;
  }
`

export const HeroImgContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: -27rem;

  @media (max-width: 768px) {
    margin-bottom: -15rem;
  }
`

export const HeroSubtitle = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

export const ButtonExplainer = styled.p`
  font-size: 18px;
  font-weight: 200;
  color: ${theme.color.darkGrey};
  margin-top: 1rem;
  margin-bottom: 0;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

class IndexPage extends React.Component {
  emitAnalyticsEvent = () => {
    trackCustomEvent({
      // string - required - The object that was interacted with (e.g.video)
      category: `apply button`,
      // string - required - Type of interaction (e.g. 'play')
      action: `click`,
      // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
      label: `Apply for early access`,
    })
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    // Set up the array of image data and `media` keys.
    // You can have as many entries as you'd like.
    // const heroSources = [
    //   data.mobileImage.childImageSharp.fixed,
    //   {
    //     ...data.desktopImage.childImageSharp.fixed,
    //     media: `(min-width: 768px)`,
    //   },
    // ]

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="The Complete People Platform"
          keywords={[`payroll`, `software`, `hr`, `provider`, `hris`]}
        />
        <HeroTextContainer>
          <Img
            fixed={data.hmrcXeroNestLogos.childImageSharp.fixed}
            alt="logos"
            style={{
              marginBottom: "1.5rem",
            }}
          />

          <HeroText>
            Finally, HR and payroll in one place
            <br />
          </HeroText>
          <HeroSubtitle>
            A complete platform with onboarding, HR, payroll, time-off (coming
            soon!), and Xero & Nest integrations
          </HeroSubtitle>
          <a
            href="https://calendly.com/naz-onfolk"
            style={{ boxShadow: "none" }}
            onClick={this.emitAnalyticsEvent}
          >
            <Button
              isBig={true}
              fontSize="1.2rem"
              marginBottom="1rem"
              height="4rem"
              paddingHorizontal="40px"
            >
              Book a demo
            </Button>
          </a>
        </HeroTextContainer>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    hmrcXeroNestLogos: file(absolutePath: { regex: "./hmrcxeronest.png/" }) {
      childImageSharp {
        fixed(width: 271, height: 54) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    mobileImage: file(absolutePath: { regex: "./accountant-review4x.png/" }) {
      childImageSharp {
        fixed(width: 360, height: 211) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    desktopImage: file(absolutePath: { regex: "./accountant-review4x.png/" }) {
      childImageSharp {
        fixed(width: 800, height: 470) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
