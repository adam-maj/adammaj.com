import { Flex, Text } from '../styles/Styles'
import Scrollspy from 'react-scrollspy'
import styled, { css } from 'styled-components'

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
`

const ScrollSpy = styled(Scrollspy)`
  margin: 0px !important;
  padding: 0px !important;
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
        <Text color="white" mb="0px" fs="32px" fw="700" cursor="pointer">
          Adam.
        </Text>
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