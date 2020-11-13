import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const HeroTextContainer = styled.div`
  margin-bottom: 8rem;
  text-align: center;
`

const HeroText = styled.h1`
  font-size: 72px;
`

const HeroSubtitle = styled.p`
  font-size: 20px;
  font-weight: 100;
`

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`payroll`, `tax`, `salary`, `money`, `payroll provider`]}
        />
        <HeroTextContainer>
          <HeroText>Payroll software you can rely on</HeroText>
          <HeroSubtitle>
            Say goodbye to spreadsheet uploads and stressful payroll runs.
          </HeroSubtitle>
        </HeroTextContainer>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
