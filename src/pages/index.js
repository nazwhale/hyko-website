import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { Heading, Box, Text, VStack, Wrap } from "@chakra-ui/react"

import Layout from "../components/layout"
import Button from "../components/button"
import Seo from "../components/seo"

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
        <Seo
          title="The All-In-One People Platform for Payroll, HR, Time-Off"
          keywords={[`payroll`, `software`, `hr`, `provider`, `hris`]}
        />
        <VStack textAlign="center" spacing={8} mb={8}>
          <Img
            fixed={data.hmrcXeroNestLogos.childImageSharp.fixed}
            alt="logos"
          />
          <Heading size="2xl" as="h1" lineHeight={"1.2"}>
            Finally, modern HR and payroll in one place
          </Heading>
          l
          <Text fontSize={["xl", "2xl"]}>
            Onfolk is your people platform. With time-off, pensions, HR,
            payroll, onboarding, and a Xero integration
          </Text>
          <Text fontSize={["xl", "2xl"]}>At £5 per employee per month</Text>
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
          <Box>
            <Heading
              textTransform="uppercase"
              color="#1B2244"
              size="xs"
              opacity="0.3"
              mt={4}
            >
              trusted by
            </Heading>
            <Wrap justify="center" spacing={16} mt={2} opacity="0.4">
              <Box pt={1.5}>
                <Img
                  fixed={data.commaLogo.childImageSharp.fixed}
                  alt="partnerLogo"
                />
              </Box>
              <Img
                fixed={data.cableLogo.childImageSharp.fixed}
                alt="partnerLogo"
              />
              <Img
                fixed={data.twentyTwentyLogo.childImageSharp.fixed}
                alt="partnerLogo"
              />
            </Wrap>
          </Box>
        </VStack>
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
    commaLogo: file(absolutePath: { regex: "./CommaLogo.png/" }) {
      childImageSharp {
        fixed(width: 124, height: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    cableLogo: file(absolutePath: { regex: "./CableLogo.png/" }) {
      childImageSharp {
        fixed(width: 93, height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twentyTwentyLogo: file(absolutePath: { regex: "./TwentyTwentyLogo.png/" }) {
      childImageSharp {
        fixed(width: 124, height: 40) {
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
