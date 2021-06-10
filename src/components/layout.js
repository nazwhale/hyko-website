import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { theme } from "../theme/theme"
import Footer from "./footer"

import { Container, Heading, Flex, Box, Button, Center } from "@chakra-ui/react"
import { rhythm } from "../utils/typography"
import { ArrowForwardIcon } from "@chakra-ui/icons"

const SkewBoxContainer = styled.div`
  position: relative;
  padding: ${rhythm(1.5)} 0;
  display: flex;
  justify-content: center;
`

const SkewBox = styled.div`
  position: absolute;
  z-index: -1;

  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;

  background-color: ${theme.color.green};
  -webkit-transform: skew(0deg, -2deg);
  -ms-transform: skew(0deg, -2deg);
  transform: skew(0deg, -2deg);
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <Flex justify="space-between" align="center">
          <Heading
            as="h2"
            my={0}
            bgGradient="linear(to-r, #BA42C0, #1b2244)"
            bgClip="text"
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to="/"
            >
              {title}
            </Link>
          </Heading>
          <Flex>
            <Heading
              as="h2"
              size="md"
              my={0}
              _hover={{ opacity: "0.7", cursor: "pointer" }}
            >
              <Link style={{ boxShadow: `none`, color: "inherit" }} to={`/api`}>
                API
              </Link>
            </Heading>
            <Heading
              as="h2"
              size="md"
              my={0}
              _hover={{ opacity: "0.7", cursor: "pointer" }}
              ml={4}
            >
              <Link
                style={{ boxShadow: `none`, color: "inherit" }}
                to={`/blog`}
              >
                Blog
              </Link>
            </Heading>
          </Flex>
        </Flex>
      )
    } else {
      header = (
        <Heading as="h2" my={0}>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </Heading>
      )
    }
    return (
      <>
        <Wrapper>
          <Box mx={[0, 6]} mt={6}>
            <Container maxW="container.lg">{header}</Container>

            <main>{children}</main>
          </Box>

          {location.pathname === rootPath && (
            <>
              <SkewBoxContainer>
                <SkewBox />
                <Container maxW="container.lg" py={8} mx={[0, 6]}>
                  <ContentHeaderSmall>A system that scales</ContentHeaderSmall>
                  <ContentHeaderLarge>
                    All your people information in one place
                  </ContentHeaderLarge>
                  <Content>
                    That means less spreadsheets and no more emailing sensitive
                    data to your accountant. No more mid-month cutoff dates and
                    checking payroll by hand.
                  </Content>
                  <Content>
                    With Onfolk, salary updates and new joiners can be added
                    right up until payday. Payroll is reported to HMRC from the
                    same tool – no 3rd party needed.
                  </Content>
                </Container>
              </SkewBoxContainer>

              <Center>
                <Container maxW="container.lg" pb={8} pt={16} mx={[0, 6]}>
                  <ContentHeaderSmall>Who we are</ContentHeaderSmall>
                  <ContentHeaderLarge>
                    We've been building Monzo Bank for the last 4 years
                  </ContentHeaderLarge>
                  <Content>
                    Having worked in extensively in operations, financial crime,
                    and growth, we understand what process automation is all
                    about.
                  </Content>
                  <Content>
                    We're at home building software at scale that saves time on
                    internal processes.
                  </Content>
                  <a href="https://calendly.com/naz-onfolk/25min">
                    <Button
                      my={8}
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
                </Container>
              </Center>
            </>
          )}

          <Footer />
        </Wrapper>
      </>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const ContentHeaderSmall = styled.h4`
  margin-top: 1em;
  color: ${theme.color.darkBlue};
`

const ContentHeaderLarge = styled.h3`
  font-weight: 600;
  margin-top: 0.5em;
`

const Content = styled.p`
  margin-top: 0;
  margin-bottom: 0.5em;
  color: ${theme.color.darkBlue};
`

export default Layout
