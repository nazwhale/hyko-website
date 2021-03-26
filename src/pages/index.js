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
          title="Cloud payroll software"
          keywords={[`payroll`, `software`, `cloud`, `accountant`, `payroll provider`]}
        />
        <HeroTextContainer>

          <Image
            fixed={data.hmrcXeroNestLogos.childImageSharp.fixed}
            alt="hmrc-recognised-logo"
            style={{
              marginBottom: "1.5rem"
            }}
          />

          <HeroText>
            Cloud payroll software for accountants
            <br />
          </HeroText>
          <HeroSubtitle>
            Hyko lets you earn from more clients in less time with end-to-end process automation.<br/>Start making real margins on payroll.
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
              Become a partner
            </Button>
          </a>
          <ButtonExplainer>
            Click to book a meeting with us.<br/>Our early partners get 50% off the retail price for life.
          </ButtonExplainer>
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
