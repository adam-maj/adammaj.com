import styled from 'styled-components'

export const Nav = styled.nav`
  background: #222222 !important;
  padding-left: 30px;
  padding-right: 30px;

  @media (max-width: 480px) {
    display: none;
  }

  @media (min-width: 480px) {
    padding-left: 150px;
    padding-right: 150px;
  }
`
export const Navlink = styled.a`
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 20px !important;
  margin-right: 30px;
`
export const Brand = styled.a`
  font-family: 'Rubik' !important;
  font-weight: 800 !important;
  font-size: 35px !important;
  color: white !important;
  text-decoration: none !important;
  margin-bottom: 0px;
`
export const ListItem = styled.li`
  display: flex;
  align-items: center;
`