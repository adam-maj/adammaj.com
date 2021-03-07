import styled, { css } from 'styled-components';

export const theme = {
  'primary': '#33CCFE',
  'dark': '#222222',
  'gray.200': '#F6F6F6',
  'gray.300': '#F0F0F0',
  'gray.400': '#E8E8E8',
  'gray.500': '#D9D9D9',
  'gray.600': '#BABABA',
  'gray.700': '#919191',
  'gray.800': '#737373',
  'gray.900': '#4A4A4A',
  'gray.1000': '#333333',
}

const margin = css`
  margin: ${props => props.margin || 'default'};
  margin-right: ${props => props.mr || 'default'};
  margin-left: ${props => props.ml || 'default'};
  margin-top: ${props => props.mt || 'default'};
  margin-bottom: ${props => props.mb || 'default'};
`

const padding = css`
  padding: ${props => props.padding || 'default'};
  padding-right: ${props => props.pr || 'default'};
  padding-left: ${props => props.pl || 'default'};
  padding-top: ${props => props.pt || 'default'};
  padding-bottom: ${props => props.pb || 'default'};
`

const shape = css`
  width: ${props => props.width || 'default'};
  height: ${props => props.height || 'default'};
  min-width: ${props => props.minWidth || 'default'};
  min-height: ${props => props.minHeight || 'default'};
  max-width: ${props => props.maxWidth || 'default'};
  max-height: ${props => props.maxHeight || 'default'};
  border-radius: ${props => props.br || 'default'};
`

const flex = css`
  display: flex;
  flex-direction: ${props => props.direction};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'default'};
  flex-grow: ${props => props.grow || 'default'};
  flex-shrink: ${props => props.shrink || 'default'};
  flex: ${props => props.flex || 'default'};
`

const color = css`
  background: ${props => props.bg ? 
    Object.keys(theme).includes(props.bg) ? theme[props.bg] : props.bg
  : 'transparent'};
  color: ${props => props.color ? 
    Object.keys(theme).includes(props.color) ? theme[props.color] : props.color
  : 'default'};
  box-shadow: ${props => props.shadow || 'default'};
  filter: ${props => props.filter || 'default'};
`

const text = css`
  font-family: 'Rubik', sans-serif;
  font-size: ${props => props.fs || 'default'};
  font-weight: ${props => props.fw || 'default'};
  text-align: ${props => props.textAlign || 'default'};
  line-height: ${props => props.lh || 'default'};
  text-decoration: ${props => props.td || 'default'};
`

const position = css`
  position: ${props => props.position || 'auto'};
  top: ${props => props.top || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  left: ${props => props.left || 'auto'};
  z-index: ${props => props.z || 'auto'};
`

const control = css`
  cursor: ${props => props.cursor || 'auto'};
  &:hover {
    ${props => props.hover || ''}
  }
`

export const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 100px 20px 20px 20px;
  ${padding}
  ${margin}
  ${color}
  ${shape}
`

export const Nav = styled.nav`
  overflow: ${props => props.overflow || 'default'};
  ${color}
  ${flex}
  ${shape}
  ${margin}
  ${padding}
  ${position}
  ${control}
`

export const Flex = styled.div`
  overflow: ${props => props.overflow || 'default'};
  ${color}
  ${flex}
  ${shape}
  ${margin}
  ${padding}
  ${position}
  ${control}
`

export const Input = styled.input`
  font-family: 'Rubik', sans-serif;
  padding-left: 16px !important;
  font-size: 18px;
  border: ${props => props.danger ? `2px solid ${theme.danger}` : '1px solid hsl(0,0%,80%)'};
  border-radius: 8px;
  height: 48px;
  width: 100%;
  padding-left: 10px;
  padding-right: 5px;
  margin-right: 5px;
  outline: none;
  ${shape}
  ${margin}
`

export const Heading = styled.h1`
  font-size: ${props => props.fs || '30px'};
  font-weight: ${props => props.fw || 700};
  color: ${props => props.color || 'white'};
  ${margin}
  ${text}
  ${color}
  ${position}
  ${shape}
`

export const SubHeading = styled.h2`
  font-size: ${props => props.fs || '24px'};
  font-weight: ${props => props.fw || 500};
  color: ${props => props.color || theme.dark};
  ${margin}
  ${text}
  ${color}
  ${position}
`

export const Text = styled.p`
  font-family: 'Rubik', sans-serif;
  color: ${props => props.color || 'white'};
  ${margin}
  ${text}
  ${shape}
  ${position}
  ${color}
  ${control}

  ${props => props.danger && css`
    color: ${theme.primary};
  `}

  ${props => props.small && css`
    font-size: 12px;
  `}
`

export const Span = styled.span`
  ${color}
  ${text}
`

export const Button = styled.button`
  height: 48px;
  width: 150px;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  outline: none !important;
  ${shape}
  ${margin}
  ${text}

  ${props => props.primary ? css`
    background: ${props => props.color || theme.primary};
    color: white;
  `: css`
    background: white;
    color: ${props => props.color || theme.primary};
  `}
  ${props => props.disabled ? css`
    cursor: default;
    opacity: 0.8;
  `: css`
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 1;
    }
  `}
`

export const Image = styled.img`
  opacity: ${props => props.opacity || '1'};
  filter: ${props => props.filter || 'default'};
  ${shape}
  ${position}
  ${control}
  ${margin}
`

export function Background({ children }) {
  return (
    <Flex 
      position="fixed" 
      top="0" 
      left="0"
      width="100vw" 
      height="100vh" 
      bg="rgba(0, 0, 0, 0.3)" 
      align="center" 
      justify="center"
      z="100"
    >
      {children}
    </Flex>
  )
}

const ExitButton = styled(Span)`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`

export function Exit({ closeModal }) {
  return (
    <ExitButton onClick={closeModal} dark>&#10005;</ExitButton>
  )
}