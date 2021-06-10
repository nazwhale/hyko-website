import React from "react"
import styled from "styled-components"
import { theme } from "../theme/theme"

const Button = props => (
  <ButtonWrapper props={props}>{props.children}</ButtonWrapper>
)

const ButtonWrapper = styled.button`
  display: block;
  border: none;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  letter-spacing: 0.05em;

  background: ${props => props.props.background || theme.color.darkBlue};
  color: ${props => props.props.color || theme.color.lightGrey};
  font-size: ${props => props.props.fontSize || "15px"};
  font-weight: ${props => props.props.fontWeight || "500"};

  height: ${props => props.props.height};

  border-radius: ${props => props.props.radius || "6px"};
  margin-top: ${props => props.props.marginTop || "1rem"};
  margin-bottom: ${props => props.props.marginBottom};

  padding-left: ${props => props.props.paddingHorizontal};
  padding-right: ${props => props.props.paddingHorizontal};

  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  height: ${props => props.props.isBig && "3.5rem"};

  @media (max-width: 480px) {
    width: ${props => props.props.isBig && "95vw"};
  }

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
  }
`

export default Button
