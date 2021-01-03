import { FlexRow } from '../styles/Landing'
import Calendly from './icons/Calendly'
import Github from './icons/Github'
import Gmail from './icons/Gmail'
import Linkedin from './icons/Linkedin'
import Twitter from './icons/Twitter'
import Youtube from './icons/Youtube'
import styled from 'styled-components'

const Social = styled.li`
  display: flex;
  align-items: center;
  margin-right: 32px;
  height: 40px;
  width: 40px;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    margin-right: 24px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
`

export default function Socials({ id }) {
  return (
    <FlexRow>
      <Social>
        <a href="https://twitter.com/MajmudarAdam" target="_blank">
          <Twitter id={id} />
        </a>
      </Social>
      <Social>
        <a href="https://github.com/adam-maj" target="_blank">
          <Github id={id + 1} />
        </a>
      </Social>
      <Social>
        <a href="https://www.linkedin.com/in/adam-majmudar-24b596194/" target="_blank">
          <Linkedin id={id + 2} />
        </a>
      </Social>
      <Social>
        <a href="mailto: adam.majmudar@gmail.com" target="_blank">
          <Gmail id={id + 3} />
        </a>
      </Social>
      <Social>
        <a href="https://calendly.com/adam-maj" target="_blank">
          <Calendly id={id + 4} />
        </a>
      </Social>
      <Social style={{ marginRight: 0 }}>
        <a href="https://www.youtube.com/channel/UChRuoAb-aIi-N4LWsRKOYLg" target="_blank">
          <Youtube id={id + 5} />
        </a>
      </Social>
    </FlexRow>
  )
}
