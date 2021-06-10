import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import {
  Heading,
  Box,
  Text,
  VStack,
  Wrap,
  Button,
  Container,
} from "@chakra-ui/react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ArrowForwardIcon } from "@chakra-ui/icons"

class IndexPage extends React.Component {
  emitAnalyticsEvent = () => {
    trackCustomEvent({
      // string - required - The object that was interacted with (e.g.video)
      category: `apply button`,
      // string - required - Type of interaction (e.g. 'play')
      action: `demo-click`,
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
        <Container maxW="container.lg">
          <VStack spacing={6} mb={16} alignItems="normal">
            <Heading size="3xl" as="h1" lineHeight={"1.2"} mb={0}>
              Finally, HR and payroll in one place
            </Heading>

            <Text fontSize={["xl", "2xl"]}>
              A modern people system with time-off, pensions, HR, payroll,
              onboarding, and a suite of integrations.
            </Text>
            <Text fontSize={["xl", "2xl"]}>At £5 / employee / month.</Text>

            <a
              href="https://calendly.com/naz-onfolk/25min"
              style={{ boxShadow: "none" }}
              onClick={this.emitAnalyticsEvent}
            >
              <Button
                my={4}
                rightIcon={<ArrowForwardIcon />}
                color="#eeeeee"
                bg="#1b2244"
                _hover={{ opacity: "0.7", cursor: "pointer" }}
                border="none"
                fontWeight="500"
                letterSpacing="0.05em"
                size="lg"
                variant="solid"
              >
                Book a demo
              </Button>
            </a>

            <Wrap spacing={16}>
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
                <Wrap spacing={8} mt={2} opacity="0.4">
                  <Box pt={2}>
                    <Img
                      fixed={data.commaLogo.childImageSharp.fixed}
                      alt="partnerLogo"
                    />
                  </Box>
                  <Box pt={1}>
                    <Img
                      fixed={data.cableLogo.childImageSharp.fixed}
                      alt="partnerLogo"
                    />
                  </Box>
                  <Img
                    fixed={data.twentyTwentyLogo.childImageSharp.fixed}
                    alt="partnerLogo"
                  />
                </Wrap>
              </Box>
              <Box>
                <Heading
                  textTransform="uppercase"
                  color="#1B2244"
                  size="xs"
                  opacity="0.3"
                  mt={[0, 4]}
                  mb={6}
                >
                  integrated
                </Heading>
                <Wrap spacing={8}>
                  <Img
                    fixed={data.hmrcXeroNestLogos.childImageSharp.fixed}
                    alt="logos"
                  />
                </Wrap>
              </Box>
            </Wrap>
          </VStack>
        </Container>
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
