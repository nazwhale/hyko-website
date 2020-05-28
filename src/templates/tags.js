import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMdx.edges
    const tag = this.props.pageContext.tag
    const siteTitle = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMdx.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <section>
          <SEO title={`${tag} | ${siteTitle}`} />
          <div>
            <div>
              <div style={{ marginBottom: "6rem" }}>
                <h3>{tagHeader}</h3>

                {posts.map(({ node }) => {
                  return (
                    <div key={node.fields.slug}>
                      <h3
                        style={{
                          marginBottom: rhythm(1 / 4),
                        }}
                      >
                        <Link
                          style={{ boxShadow: `none` }}
                          to={`/posts${node.fields.slug}`}
                        >
                          {node.frontmatter.title}
                        </Link>
                      </h3>
                      <small>{node.frontmatter.date}</small>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </div>
                  )
                })}

                <p style={{ marginTop: "1.75rem" }}>
                  <Link to="/tags/">Browse all tags</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
