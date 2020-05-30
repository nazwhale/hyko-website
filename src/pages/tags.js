import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Tags extends React.Component {
  render() {
    const { data } = this.props
    const { group } = data.allMdx
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={`Tags | ${siteTitle}`} />
        <div style={{ marginBottom: "6rem" }}>
          <h1>Tags</h1>
          <ul style={{ listStyleType: "none" }}>
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link
                  style={{ boxShadow: `none`, textTransform: "capitalize" }}
                  to={`/tags/${tag.fieldValue}/`}
                >
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/">Go Home</Link>
        </div>
      </Layout>
    )
  }
}

export default Tags

export const tagsQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMdx(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
