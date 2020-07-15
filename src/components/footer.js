import React from "react"
import styled from "styled-components"
import { theme } from "../theme/theme"

const Footers = styled.div`
  overflow: hidden;
  margin-top: -80px;
  padding-top: 80px;
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

const SkewBox = styled.div`
  position: absolute;
  z-index: -1;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  background-color: ${theme.color.green};
  overflow: hidden;
  -webkit-transform: skew(0deg, -2deg);
  -ms-transform: skew(0deg, -2deg);
  transform: skew(0deg, -2deg);
  bottom: -60px;
`

const Content = styled.footer`
  text-align: center;
  margin: 24px;
  color: ${theme.color.footer};
  font-size: 14px;
`

function Footer() {
  return (
    <Footers>
      <FooterContainer>
        <SkewBox />
        <Content>© Hyko.uk {new Date().getFullYear()} </Content>
      </FooterContainer>
    </Footers>
  )
}

export default Footer
