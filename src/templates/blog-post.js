import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tag from "../components/tag"
import { Container, Heading, Divider, Text, Box } from "@chakra-ui/react"

const TagContainer = styled.div`
  display: flex;
`

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <Container maxW="container.md" mt={6}>
          <Box mb={8}>
            <Heading mb={0}>{post.frontmatter.title}</Heading>
            <Text as="sub">{`${post.frontmatter.date} • ${post.timeToRead} min read`}</Text>
          </Box>

          <MDXRenderer>{post.body}</MDXRenderer>

          <TagContainer>
            {post.frontmatter.tags.map(tag => {
              return (
                <div key={tag} style={{ marginRight: "0.5rem" }}>
                  <Link style={{ boxShadow: `none` }} to={`/tags/${tag}`}>
                    <Tag marginBottom="1.75rem">{tag}</Tag>
                  </Link>
                </div>
              )
            })}
          </TagContainer>

          <Divider mb={12} mt={6} />

          <Bio />

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
              marginBottom: "4rem",
            }}
          >
            <li>
              {previous && (
                <Link to={`/blog${previous.fields.slug}`} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={`/blog${next.fields.slug}`} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Container>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
      timeToRead
    }
  }
`
