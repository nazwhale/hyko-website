import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { theme } from "../theme/theme"
import husky from "../../content/assets/hyko-logo-grey.svg"
import { rhythm } from "../utils/typography"

const Footers = styled.div`
  overflow: hidden;
  margin-top: -80px;
  padding-top: 80px;
`

const HuskyIcon = styled.img`
  height: 2rem;
  padding-right: 0.5em;
  margin-bottom: -5px;
`

const FooterContainer = styled.div`
  position: relative;
  z-index: 99;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 94px;
  padding-bottom: 94px;
`

const Items = styled.div`
  margin-bottom: 1rem;
`

const FinalSkewBox = styled.div`
  position: absolute;
  z-index: -1;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  background-color: ${theme.color.darkBlue};
  overflow: hidden;
  -webkit-transform: skew(0deg, -2deg);
  -ms-transform: skew(0deg, -2deg);
  transform: skew(0deg, -2deg);
  bottom: -60px;
`

const Content = styled.footer`
  color: ${theme.color.lightGrey};

  max-width: 42em;
  margin-left: auto;
  margin-right: auto;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

function Footer() {
  return (
    <Footers>
      <FooterContainer>
        <FinalSkewBox />
        <Content>
          <Items>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: "none",
                color: "inherit",
                fontSize: "14px",
                paddingRight: "1rem",
              }}
              to={`/blog`}
            >
              Blog
            </Link>

            <span style={{ fontSize: "14px" }}>
              <a
                href="http://docs.hyko.uk"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  boxShadow: "none",
                  paddingRight: "1rem",
                }}
              >
                API documentation
              </a>
            </span>

            <Link
              style={{
                boxShadow: `none`,
                textDecoration: "none",
                color: "inherit",
                fontSize: "14px",
                paddingRight: "1rem",
              }}
              to={`/legal/privacy`}
            >
              Privacy policy
            </Link>
          </Items>

          <hr style={{ backgroundColor: theme.color.darkGrey }} />

          <HuskyIcon src={husky} />
          <span
            style={{
              fontSize: "24px",
              paddingRight: "1em",
              letterSpacing: "0.05em",
            }}
          >
            Hyko
          </span>
          <span style={{ fontSize: "14px" }}>
            © Hyko.uk {new Date().getFullYear()}
          </span>
        </Content>
      </FooterContainer>
    </Footers>
  )
}

export default Footer
