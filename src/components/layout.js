import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import { theme } from "../theme/theme"
import Footer from "./footer"
import Button from "./button"

import { rhythm } from "../utils/typography"

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 5rem;
  padding-bottom: 0;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    padding-bottom: 0;
  }
`

const HeaderOptions = styled.div`
  display: flex;
  align-items: center;
`

const HeaderOption = styled.h3`
  margin-top: 0;

  &:hover {
    color: grey;
  }
`

const SkewBoxContainer = styled.div`
  position: relative;
  padding: ${rhythm(1.5)} 0;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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
        <>
          <h1
            style={{
              fontSize: "2rem",
              fontFamily: `Palanquin, sans-serif`,
              marginTop: 0,
            }}
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
          </h1>
          <HeaderOptions>
            <HeaderOption>
              <Link style={{ boxShadow: `none`, color: "inherit" }} to={`/api`}>
                API
              </Link>
            </HeaderOption>
            <HeaderOption style={{ marginLeft: "1.5rem" }}>
              <Link
                style={{ boxShadow: `none`, color: "inherit" }}
                to={`/blog`}
              >
                Blog
              </Link>
            </HeaderOption>
          </HeaderOptions>
        </>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Palanquin, sans-serif`,
            marginTop: 0,
          }}
        >
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
        </h3>
      )
    }
    return (
      <>
        <Wrapper>
          <HeaderContainer>{header}</HeaderContainer>

          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <main>{children}</main>
          </div>

          {location.pathname === rootPath && (
            <>
              <SkewBoxContainer>
                <SkewBox />
                <ContentContainerWithImage>
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
                    With Hyko, salary updates and new joiners can be added right
                    up until payday. Payroll is reported to HMRC from the same
                    tool – no 3rd party needed.
                  </Content>
                </ContentContainerWithImage>
              </SkewBoxContainer>

              <ContentContainer>
                <ContentHeaderSmall style={{ marginTop: "3rem" }}>
                  Who we are
                </ContentHeaderSmall>
                <ContentHeaderLarge>
                  We've been building Monzo Bank for the last 3 years
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
                <OutboundLink href="https://calendly.com/naz-hyko">
                  <Button marginTop="2rem" marginBottom="2rem">
                    Book a demo
                  </Button>
                </OutboundLink>
              </ContentContainer>
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

const ContentContainer = styled.div`
  max-width: 42em;
  margin-left: auto;
  margin-right: auto;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

const ContentContainerWithImage = styled.div`
  max-width: 42em;
  margin-left: auto;
  margin-right: auto;
  //margin-top: 20rem;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

  @media (max-width: 768px) {
    //margin-top: 8rem;
  }
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
