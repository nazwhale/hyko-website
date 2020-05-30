import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import husky from "../../content/assets/husky.png"

import { rhythm, scale } from "../utils/typography"

const HuskyIcon = styled.img`
  height: 4rem;
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1),
            marginBottom: rhythm(1.5),
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
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
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
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <HuskyIcon src={husky} />
            <header>{header}</header>
            <main>{children}</main>
          </div>
          <Triangle />
          <FooterContainer>
            <Footer>© {new Date().getFullYear()}</Footer>
          </FooterContainer>
        </Wrapper>
      </>
    )
  }
}

const Triangle = styled.div`
  height: 0;
  width: 0;
  border-left: 100vw solid transparent;
  border-bottom: 4rem solid #1bc47d;
  overflow: hidden;
`

const FooterContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1bc47d;
  height: 20vh;
  overflow: hidden;
`

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout
