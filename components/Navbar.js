import { Nav, Navlink, Brand, ListItem } from '../styles/Navbar'
import Scrollspy from 'react-scrollspy'

export default function Navbar({ blog }) {
  if (blog) {
    return (
      <Nav id="navbar" className="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
        <Brand>Adam.</Brand>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav ml-auto">
            <ListItem className="nav-item">
              <Navlink className="nav-link" href="/">Home</Navlink>
            </ListItem>
            <ListItem className="nav-item">
              <Navlink className="nav-link" href="/#about">About</Navlink>
            </ListItem>
            <ListItem className="nav-item">
              <Navlink className="nav-link" href="/#portfolio">Portfolio</Navlink>
            </ListItem>
            <ListItem className="nav-item">
              <Navlink className="nav-link" href="/blog" white>Blog</Navlink>
            </ListItem>
          </div>
        </div>
      </Nav>
    )
  }

  return (
    <Nav id="navbar" className="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
      <Brand>Adam.</Brand>
      <div class="collapse navbar-collapse">
        <Scrollspy items={ ['home', 'about', 'portfolio'] } className="navbar-nav ml-auto" currentClassName="is-current">
          <ListItem className="nav-item">
            <Navlink className="nav-link" href="#home">Home</Navlink>
          </ListItem>
          <ListItem className="nav-item">
            <Navlink className="nav-link" href="#about">About</Navlink>
          </ListItem>
          <ListItem className="nav-item">
            <Navlink className="nav-link" href="#portfolio">Portfolio</Navlink>
          </ListItem>
          <ListItem className="nav-item">
            <Navlink className="nav-link" href="/blog">Blog</Navlink>
          </ListItem>
        </Scrollspy>
      </div>
    </Nav>
  )
}
