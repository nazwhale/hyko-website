import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { rhythm, scale } from "../../utils/typography"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Button from "../../components/button"

class PrivacyPolicyPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageInfo = data.mdx

    const pageTitle = pageInfo.frontmatter.title || pageInfo.slug

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={pageTitle} />
        <h1 style={{ marginTop: "1rem", marginBottom: "3rem" }}>
          <span role="img" aria-label="blog">
            🔐{" "}
          </span>
          {pageTitle}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {`${pageInfo.frontmatter.date} • ${pageInfo.timeToRead} min read`}
        </p>

        <div>
          <p>{pageInfo.frontmatter.description}</p>
        </div>

        <MDXRenderer>{pageInfo.body}</MDXRenderer>

        <Link to="/">
          <Button marginTop="85px" marginBottom="85px">
            Go Home
          </Button>
        </Link>
      </Layout>
    )
  }
}

export default PrivacyPolicyPage

export const pageQuery = graphql`
  query PrivacyPolicyQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: "/privacy-policy/" } }) {
      slug
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
      body
    }
  }
`
