import { FlexRow } from '../styles/Landing'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { BsCalendarWeekFill } from 'react-icons/bs'
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
          <FaTwitter color="white" size={32} />
        </a>
      </Social>
      <Social>
        <a href="https://github.com/adam-maj" target="_blank">
          <FaGithub color="white" size={32} />
        </a>
      </Social>
      <Social>
        <a href="https://www.linkedin.com/in/adam-majmudar-24b596194/" target="_blank">
          <FaLinkedin color="white" size={32} />
        </a>
      </Social>
      <Social>
        <a href="mailto: adam.majmudar@gmail.com" target="_blank">
          <SiGmail color="white" size={30} />
        </a>
      </Social>
    </FlexRow>
  )
}
