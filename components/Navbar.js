import { Flex, Text } from '../styles/Styles'
import Scrollspy from 'react-scrollspy'
import styled, { css } from 'styled-components'

const Brand = styled(Text)`
  color: white;
  margin-bottom: 0px;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 900px) {
    display: none;
  }
` 

const Nav = styled.nav`
  width: 100vw;
  height: 64px;
  background: #222222;
  position: fixed;
  top: 0;
  z-index: 100;
  
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0px 150px;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }

  @media (max-width: 764px) {
    padding: 0px 20vw;
  }

  @media (max-width: 640px) {
    padding: 0px 15vw;
  }

  @media (max-width: 480px) {
    padding: 0px 35px;
  }
`

const Navlink = styled.a`
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 20px;
  margin-right: 25px;
  margin-left: 25px;
  cursor: pointer;

  color: rgba(255, 255, 255, 0.6) !important;

  &:hover {
    color: white !important;
  }

  &.active {
    color: white !important;
  }

  ${props => props.active && css`
    color: white !important;
  `}

  @media (max-width: 540px) {
    margin-left: 15px;
    margin-right: 15px;
  }

  @media (max-width: 540px) {
    font-size: 16px;
  }
`

const ScrollSpy = styled(Scrollspy)`
  margin: 0px !important;
  padding: 0px !important;


  @media (max-width: 900px) {
    & > a:first-child {
      margin-left: 0px;
    }
  }
`

export default function Navbar({ blog }) {
  return (
    <Nav 
      width="100vw" 
      height="64px" 
      bg="dark" 
      position="fixed" 
      top="0"
    >
      <a href="/">
        <Brand>
          Adam.
        </Brand>
      </a>
      <Flex justify="space-evenly">
        <ScrollSpy 
          items={['home', 'about', 'portfolio']} 
          currentClassName="active"
        >
          <Navlink href={blog ? "/" : "#home"}>
            Home
          </Navlink>
          <Navlink href={blog ? "/#about" : "#about"}>
            About
          </Navlink>
          <Navlink href={blog ? "/#portfolio" : "#portfolio"}>
            Portfolio
          </Navlink>
          <Navlink href="/blog" active={blog}>
            Blog
          </Navlink>
        </ScrollSpy>
      </Flex>
    </Nav>
  )
}