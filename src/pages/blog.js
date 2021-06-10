import React from "react"
import { Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
import { Container } from "@chakra-ui/react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Button from "../components/button"

class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo title="Blog" />
        <Container maxW="container.lg">
          <h1 style={{ marginTop: "4rem", marginBottom: "3rem" }}>
            <span role="img" aria-label="blog">
              📖{" "}
            </span>
            Blog
          </h1>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginTop: "1em",
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{ boxShadow: `none` }}
                    to={`/blog${node.fields.slug}`}
                  >
                    {title}
                  </Link>
                </h3>
                <small>
                  {`${node.frontmatter.date} • ${node.timeToRead} min read`}
                </small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </div>
            )
          })}
          <Link to="/">
            <Button marginTop="85px" marginBottom="85px">
              Go Home
            </Button>
          </Link>
        </Container>
      </Layout>
    )
  }
}

export default BlogPage

export const pageQuery = graphql`
  query BlogQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          timeToRead
        }
      }
    }
  }
`
