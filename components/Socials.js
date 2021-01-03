import { FlexRow } from '../styles/Landing'
import styled from 'styled-components'

const Social = styled.li`
  display: flex;
  align-items: center;

  & > a > i {
    color: white !important;
    margin-right: 40px !important;
  }
`

export default function Socials() {
  return (
    <FlexRow>
      <Social>
        <a href="https://twitter.com/MajmudarAdam" target="_blank">
          <i class="fab fa-twitter fa-2x"></i>
        </a>
      </Social>
      <Social>
        <a href="https://github.com/adam-maj" target="_blank">
          <i class="fab fa-github fa-2x"></i>
        </a>
      </Social>
      <Social>
        <a href="https://www.linkedin.com/in/adam-majmudar-24b596194/" target="_blank">
          <i class="fab fa-linkedin fa-2x"></i>
        </a>
      </Social>
      <Social>
        <a href="mailto: adam.majmudar@gmail.com" target="_blank">
          <i style={{ marginRight: 0 }} class="fas fa-envelope-square fa-2x"></i>
        </a>
      </Social>
    </FlexRow>
  )
}
