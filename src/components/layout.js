import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import husky from "../../content/assets/hyko-logo.svg"
import Footer from "./footer"

import { rhythm, scale } from "../utils/typography"

const HuskyIcon = styled.img`
  height: 4rem;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
              ...scale(1),
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
          <p style={{ textAlign: "center", fontWeight: "bolder" }}>
            Payroll APIs you can rely on
          </p>
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
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <HeaderContainer>
              <HuskyIcon src={husky} />
              <header>{header}</header>
            </HeaderContainer>
            <main>{children}</main>
          </div>
          <Footer />
        </Wrapper>
      </>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

export default Layout
