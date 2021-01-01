import { useState } from 'react'

import { 
  Nav, Navlink, Brand, HeroSection, AboutSection, ItemSection, Container, 
  Column, Header, HeaderLine, Name, Text, FlexRow, Filter, ItemTitle, 
  ItemDate, ItemDescription, ItemLabel, Link, LinkButton, ItemContainer, 
  ItemColumn, Interest, Footer, FooterText, FadeInSection
} from '../styles/Landing'
import Image from 'next/image'

export default function Home() {
  const [filter, setFilter] = useState('Projects');
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
      let response = await fetch('https://adammaj.herokuapp.com/api/item-list/')
      let data = await response.json()
      setProjects(data)
  }

  useEffect(() => {
      fetchProjects()
  }, [])

  return(
      <>
      <link rel="icon" src="./favicon.ico" />
      {window.innerWidth > 480 ?
          <Nav id="navbar" className="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
              <Brand class="navbar-brand" href="#">Adam.</Brand>
              <div class="collapse navbar-collapse">
                  <Scrollspy items={ ['home', 'about', 'portfolio'] } className="navbar-nav ml-auto" currentClassName="is-current">
                      <li style={{display: 'flex', alignItems: 'center'}} className="nav-item">
                          <Navlink className="nav-link" href="#home">Home</Navlink>
                      </li>
                      <li style={{display: 'flex', alignItems: 'center'}} className="nav-item">
                          <Navlink className="nav-link" href="#about">About</Navlink>
                      </li>
                      <li style={{display: 'flex', alignItems: 'center'}} className="nav-item">
                          <Navlink style={{marginRight: 0}} className="nav-link" href="#portfolio">Portfolio</Navlink>
                      </li>
                  </Scrollspy>
              </div>
          </Nav>
      :
          null
      }
      <HeroSection id="home">
          <FadeInSection>
              <Header id="home">Hi, I'm <Name>Adam Majmudar</Name>, Neuroscience Enthusiast, Machine Learning Engineer, & Full Stack Developer.</Header>
          </FadeInSection>
          <FadeInSection>
              <FlexRow>
                  <li style={{display: 'flex', alignItems: 'center'}}>
                      <a href="https://twitter.com/MajmudarAdam" target="_blank">
                          <i style={{color: 'white', marginRight: 40}} class="fab fa-twitter fa-2x"></i>
                      </a>
                  </li>
                  <li style={{display: 'flex', alignItems: 'center'}}>
                      <a href="https://github.com/adam-maj" target="_blank">
                          <i style={{color: 'white', marginRight: 40}} class="fab fa-github fa-2x"></i>
                      </a>
                  </li>
                  <li style={{display: 'flex', alignItems: 'center'}}>
                      <a href="https://www.linkedin.com/in/adam-majmudar-24b596194/" target="_blank">
                          <i style={{color: 'white', marginRight: 40}} class="fab fa-linkedin fa-2x"></i>
                      </a>
                  </li>
                  <li style={{display: 'flex', alignItems: 'center'}}>
                      <a href="mailto: adam.majmudar@gmail.com" target="_blank">
                          <i style={{color: 'white', marginRight: 0}} class="fas fa-envelope-square fa-2x"></i>
                      </a>
                  </li>
              </FlexRow>
          </FadeInSection>
      </HeroSection>
      <AboutSection id="about">
          <Container>
              <Column>
                  <FadeInSection>
                      <HeaderLine/>
                      <Header>A B O U T</Header>
                  </FadeInSection>
                  <FadeInSection>
                      <Text>
                          I’m a 17-year-old focused on building products that solve problems and developing new skills (currently learning about SEO, sales, and marketing).
                          <br/><br/>
                          In the past, I’ve worked on machine learning solutions at <a style={{color: 'white', fontWeight: 700}} href="https://dovetale.com/" target="_blank">Dovetale</a>
                          &nbsp;and I'm an alumni of <a style={{color: 'white', fontWeight: 700}} href="https://tks.world/" target="_blank">The Knowledge Society.</a>
                          &nbsp;Currently, I’m an engineering student at the University of Pennsylvania.
                          <br/><br/>
                          <Text style={{fontWeight: 700}}>I'm most interested in:</Text>
                          <ul>
                              <Interest>Neuroscience, BCIs, & Neuralink</Interest>
                              <Interest>Philosophy & Psychology (Existentialism, Stoicism, Vedanta, etc.)</Interest>
                              <Interest>Artificial Intelligence (Especially in relation to neuroscience/BCIs or AGI - which I’m skeptical of)</Interest>
                              <Interest>Quantum Computing (I think the theory is interesting regardless of how practical the field will become)</Interest>
                          </ul>
                      </Text>
                  </FadeInSection>
              </Column>
              <FadeInSection>
                  <Image src="/SeniorPhoto.jpg"/>
              </FadeInSection>
          </Container>
      </AboutSection>
      <ItemSection id="portfolio">
          <Container>
              <ItemColumn>
                  <FadeInSection>
                      <HeaderLine/>
                      <Header>P O R T F O L I O</Header>
                  </FadeInSection>
                  <FadeInSection>
                      <FlexRow style={{flexWrap: 'nowrap'}}>
                          <Filter active={filter === 'Projects'} onClick={() => setFilter('Projects')}>Projects</Filter>
                          <Filter active={filter === 'Articles'} onClick={() => setFilter('Articles')}>Articles</Filter>
                          <Filter active={filter === 'Newsletters'} onClick={() => setFilter('Newsletters')}>Newsletters</Filter>
                      </FlexRow>
                  </FadeInSection>
                  <FadeInSection>
                      <FlexRow>
                          {projects.filter(project => project.content_type === filter).map((project, index) =>
                              <ItemContainer marginTop={'60px'} marginRight={(window.innerWidth >= 1200) ? ((index + 1) % 3 === 0 ? '0px': '50px') : (window.innerWidth >= 480) ? ((index + 1) % 2 === 0 ? '0px': '50px') : '0px'}>
                                  <ItemColumn>
                                      <div style={{width: '100%', maxHeight: 250, overflow: 'hidden', marginBottom: 20}}>
                                          <img style={{width: '100%'}} src={project.image}></img>
                                      </div>
                                      <FlexRow>
                                          {project.labels.map((label) =>
                                              <ItemLabel color={label.color}>{label.name}</ItemLabel>
                                          )}
                                      </FlexRow>
                                      {filter !== 'Newsletters' ?
                                          <>
                                          <ItemTitle>{project.title}</ItemTitle>
                                          <ItemDate>{project.date}</ItemDate>
                                          <ItemDescription>{project.description}</ItemDescription>
                                          </>
                                      :
                                          <ItemTitle style={{marginBottom: 25}}>{project.title}</ItemTitle>
                                      }
                                      <FlexRow>
                                          {project.links.split('   ').map((link) => 
                                              <Link href={link.split('  ')[1]} target="_blank"><LinkButton className="btn">{link.split('  ')[0]}</LinkButton></Link>
                                          )}
                                      </FlexRow>
                                  </ItemColumn>
                              </ItemContainer>
                          )}
                      </FlexRow>
                  </FadeInSection>
              </ItemColumn>
          </Container>
      </ItemSection>
      <Footer>
          <HeaderLine style={{marginLeft: 'auto', height: 5, marginBottom: 0}}/>
          <Brand class="navbar-brand" href="#">Adam.</Brand>
          <FlexRow>
                  <li style={{display: 'flex', alignItems: 'center'}}>
                      <a href="https://twitter.com/MajmudarAdam" target="_blank">
                          <i style={{color: 'white', marginRight: 40}} class="fab fa-twitter fa-2x"></i>
                      </a>
                  </li>
                  <li style={{display: 'flex', alignItems: 'center'}}>
                      <a href="https://github.com/adam-maj" target="_blank">
                          <i style={{color: 'white', marginRight: 40}} class="fab fa-github fa-2x"></i>
                      </a>
                  </li>
                  <li style={{display: 'flex', alignItems: 'center'}}>
                      <a href="https://www.linkedin.com/in/adam-majmudar-24b596194/" target="_blank">
                          <i style={{color: 'white', marginRight: 40}} class="fab fa-linkedin fa-2x"></i>
                      </a>
                  </li>
                  <li style={{display: 'flex', alignItems: 'center'}}>
                      <a href="mailto: adam.majmudar@gmail.com" target="_blank">
                          <i style={{color: 'white', marginRight: 0}} class="fas fa-envelope-square fa-2x"></i>
                      </a>
                  </li>
              </FlexRow>
              <FooterText><small>&copy; Copyright 2020, Adam Majmudar. All rights reserved.</small></FooterText>
      </Footer>
      </>
  );
}
