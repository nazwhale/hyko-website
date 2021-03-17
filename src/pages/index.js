import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

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
  margin-top: 0;
  font-size: 58px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 38px;
  }
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

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="The Modern Payroll Platform"
          keywords={[`payroll`, `tax`, `salary`, `money`, `payroll provider`]}
        />
        <HeroTextContainer>

          <Image
            fixed={data.hmrcRecognisedLogo.childImageSharp.fixed}
            alt="hmrc-recognised-logo"
            style={{
              marginBottom: "1.5rem"
            }}
          />

          <HeroText>
            We're building best-in-class payroll software
            <br />
          </HeroText>
          <HeroSubtitle>
            And we need feedback from the best possible customers. We're looking for truly modern accountancy and FinOps providers to work closely with.
          </HeroSubtitle>
          <a
            href="https://calendly.com/naz-hyko"
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
              That's me!
            </Button>
          </a>
          <ButtonExplainer>
            Click to book a meeting with us
          </ButtonExplainer>
        </HeroTextContainer>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    hmrcRecognisedLogo: file(absolutePath: { regex: "/hmrc-recognised.png/" }) {
      childImageSharp {
        fixed(width: 86, height: 29) {
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
