import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Container, Heading, Text, Button } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"

const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

function API(props) {
  const { data, location } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="The Payroll API for the UK"
        keywords={[`payroll`, `api`, `uk`, `integrate`, `remote`]}
      />
      <Container maxW="container.lg" mb={24}>
        <HeroTextContainer>
          <Heading size="3xl" as="h1">
            The payroll API for the UK
          </Heading>
          <Text fontSize={["xl", "2xl"]}>
            Onolk's modern API is built to power next generation of accounting
            and HR products
          </Text>
          <a
            href="https://calendly.com/naz-onfolk"
            style={{ boxShadow: "none" }}
          >
            <Button
              my={4}
              mb={8}
              rightIcon={<ArrowForwardIcon />}
              color="#eeeeee"
              bg="#1b2244"
              _hover={{ opacity: "0.7", cursor: "pointer" }}
              border="none"
              fontWeight="500"
              letterSpacing="0.05em"
              size="lg"
              variant="solid"
            >
              Talk to us
            </Button>
          </a>
          <Text color="gray" fontWeight={200} fontSize="lg">
            Sandbox arriving summer '21
          </Text>
        </HeroTextContainer>
      </Container>
    </Layout>
  )
}

export default API

export const pageQuery = graphql`
  query APIQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
