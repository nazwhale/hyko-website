import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { theme } from "../theme/theme"
import Footer from "./footer"
import Button from "./button"

import { rhythm } from "../utils/typography"

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: ${rhythm(3 / 4)} ${rhythm(3 / 4)};
  padding-bottom: 0;
`

const HeaderOptions = styled.div`
  display: flex;
  align-items: center;
`

const HeaderOption = styled.h3`
  margin-top: 0;
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
            <SkewBoxContainer>
              <SkewBox />
              <ContentContainer>
                <ContentHeaderSmall>Designed for developers</ContentHeaderSmall>
                <ContentHeaderLarge>
                  Powerful payroll APIs you can trust
                </ContentHeaderLarge>
                <Content>
                  We agonize over reliability, security, and keeping payroll
                  compliant so you don't have to.
                </Content>
                <a href="http://docs.hyko.uk">
                  <Button>Read the docs</Button>
                </a>
              </ContentContainer>
            </SkewBoxContainer>
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

const ContentHeaderSmall = styled.h4`
  margin-top: 1em;
  color: ${theme.color.darkBlue};
`

const ContentHeaderLarge = styled.h3`
  font-weight: 600;
  margin-top: 0.5em;
`

const Content = styled.p`
  margin-top: 0.5em;
  color: ${theme.color.darkBlue};
`

export default Layout
