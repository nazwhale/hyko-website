import React, { useEffect } from "react"
import { graphql } from "gatsby"
import {
  Container,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
  Button,
  Input,
  Select,
  Link,
  ListItem,
  UnorderedList,
  HStack,
} from "@chakra-ui/react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import axios from "axios"

function CostsPage(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title

  const [salary, setSalary] = React.useState("25000")
  const [
    employerPensionContributionPercentage,
    setEmployerPensionContributionPercentage,
  ] = React.useState("3")

  const [
    employerPensionContribution,
    setEmployerPensionContribution,
  ] = React.useState("0")

  const [employerNI, setEmployerNI] = React.useState("0")

  let [otherCosts, setOtherCosts] = React.useState([])

  useEffect(() => {
    async function getCosts() {
      try {
        const rsp = await axios.get(
          `${process.env.GATSBY_ONFOLK_API_URL}/costs/calculate-for-employee`,
          {
            params: {
              salary: salary,
              employer_pension_contribution: employerPensionContributionPercentage,
            },
          }
        )
        if (rsp == null) {
          return null
        }
        console.log("🦉", rsp.data)
        setEmployerPensionContribution(rsp.data.employer_pension_contribution)
        setEmployerNI(rsp.data.employer_ni)
      } catch (err) {
        console.log("❌", err)
      }
    }
    getCosts()
  })

  function totalOtherCosts() {
    return (
      Math.round(
        otherCosts
          .map((c, index) => {
            let cost = parseFloat(c.cost)
            if (c.frequency === "monthly") {
              cost = cost * 12
            }
            return cost
          })
          .reduce((a, b) => a + b, 0) * 100
      ) / 100
    )
  }

  function total() {
    return (
      parseFloat(salary) +
      parseFloat(employerNI) +
      parseFloat(employerPensionContribution) +
      totalOtherCosts()
    )
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <Seo
        title="Work out how much it will cost to hire your new employer"
        keywords={[`payroll`, `software`, `hr`, `provider`, `hris`]}
      />
      <Container maxW="container.lg">
        <VStack spacing={6} mb={16} alignItems="normal">
          <Heading as="h1" lineHeight={"1.2"} mb={0}>
            Calculate how much your employee will cost
          </Heading>

          <Text>Salary</Text>
          <NumberInput
            step={1000}
            defaultValue={25000}
            min={0}
            onChange={valueString => setSalary(valueString)}
            value={salary}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Text>
            Employer Pension Contribution (based on{" "}
            <Link
              href={
                "https://www.nestpensions.org.uk/schemeweb/helpcentre/contributions/calculating-contributions/calculate-contributions-using-qualifying-earnings.html"
              }
            >
              qualifying earnings
            </Link>
            )
          </Text>
          <NumberInput
            step={1}
            defaultValue={3}
            min={3}
            max={15}
            onChange={valueString =>
              setEmployerPensionContributionPercentage(valueString)
            }
            value={employerPensionContributionPercentage}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Button
            border={"none"}
            colorScheme="green"
            onClick={() => {
              setOtherCosts(prevState => {
                return [...prevState, { cost: 4000, frequency: "oneoff" }]
              })
            }}
          >
            Add other expense
          </Button>

          {otherCosts.map((otherCost, index) => {
            return (
              <HStack key={index}>
                <Input placeholder="Name" />
                <Select
                  onChange={e => {
                    setOtherCosts(prevState => {
                      return [
                        ...prevState.slice(0, index),
                        Object.assign({}, prevState[index], {
                          frequency: e.target.value,
                        }),
                        ...prevState.slice(index + 1),
                      ]
                    })
                  }}
                >
                  <option value="oneoff">One off</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </Select>
                <NumberInput
                  step={100}
                  defaultValue={4000}
                  min={0}
                  onChange={valueString => {
                    setOtherCosts(prevState => {
                      return [
                        ...prevState.slice(0, index),
                        Object.assign({}, prevState[index], {
                          cost: valueString,
                        }),
                        ...prevState.slice(index + 1),
                      ]
                    })
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            )
          })}

          <Heading as="h2">Total Costs: £{total()}</Heading>
          <UnorderedList>
            <ListItem>Salary: £{salary}</ListItem>
            <ListItem>Employer's NI: £{employerNI}</ListItem>
            <ListItem>
              Employer Pension Contribution: £{employerPensionContribution}
            </ListItem>
            <ListItem>Other Costs: £{totalOtherCosts()}</ListItem>
          </UnorderedList>
        </VStack>
      </Container>
    </Layout>
  )
}

export default CostsPage

export const pageQuery = graphql`
  query CostsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
