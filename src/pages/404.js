import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Button from "../components/button"
import { Container } from "@chakra-ui/react"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo title="404: Not Found" />
        <Container maxW="container.md" mb={40}>
          <h1>Not Found</h1>
          <p>You're in a place that doesn&#39;t exist...</p>
          <Link to="/">
            <Button marginTop="2rem">Go Home</Button>
          </Link>
        </Container>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
