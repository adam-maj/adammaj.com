// import { useState, useEffect } from 'react'
// import Scrollspy from 'react-scrollspy'
// import { 
//   Nav, Navlink, Brand, HeroSection, AboutSection, ItemSection, Container, 
//   Column, Header, HeaderLine, Name, Text, FlexRow, Filter, ItemTitle, 
//   ItemDate, ItemDescription, ItemLabel, Link, LinkButton, ItemContainer, 
//   ItemColumn, Interest, Footer, FooterText, FadeInSection
// } from '../styles/Landing'
// import Image from 'next/image'

// export default function Home() {
//   const [filter, setFilter] = useState('Projects');
//   const [projects, setProjects] = useState([]);

//   return(
//       <>
//       <link rel="icon" src="./favicon.ico" />
//       {process.browser && window.innerWidth > 480 ?
//           <Nav id="navbar" className="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
//               <Brand class="navbar-brand" href="#">Adam.</Brand>
//               <div class="collapse navbar-collapse">
//                   <Scrollspy items={ ['home', 'about', 'portfolio'] } className="navbar-nav ml-auto" currentClassName="is-current">
//                       <li style={{display: 'flex', alignItems: 'center'}} className="nav-item">
//                           <Navlink className="nav-link" href="#home">Home</Navlink>
//                       </li>
//                       <li style={{display: 'flex', alignItems: 'center'}} className="nav-item">
//                           <Navlink className="nav-link" href="#about">About</Navlink>
//                       </li>
//                       <li style={{display: 'flex', alignItems: 'center'}} className="nav-item">
//                           <Navlink style={{marginRight: 0}} className="nav-link" href="#portfolio">Portfolio</Navlink>
//                       </li>
//                   </Scrollspy>
//               </div>
//           </Nav>
//       :
//           null
//       }
//       <HeroSection id="home">
//           <FadeInSection>
//               <Header id="home">Hi, I'm <Name>Adam Majmudar</Name>, Neuroscience Enthusiast, Machine Learning Engineer, & Full Stack Developer.</Header>
//           </FadeInSection>
//           <FadeInSection>
//               <FlexRow>
//                   <li style={{display: 'flex', alignItems: 'center'}}>
//                       <a href="https://twitter.com/MajmudarAdam" target="_blank">
//                           <i style={{color: 'white', marginRight: 40}} class="fab fa-twitter fa-2x"></i>
//                       </a>
//                   </li>
//                   <li style={{display: 'flex', alignItems: 'center'}}>
//                       <a href="https://github.com/adam-maj" target="_blank">
//                           <i style={{color: 'white', marginRight: 40}} class="fab fa-github fa-2x"></i>
//                       </a>
//                   </li>
//                   <li style={{display: 'flex', alignItems: 'center'}}>
//                       <a href="https://www.linkedin.com/in/adam-majmudar-24b596194/" target="_blank">
//                           <i style={{color: 'white', marginRight: 40}} class="fab fa-linkedin fa-2x"></i>
//                       </a>
//                   </li>
//                   <li style={{display: 'flex', alignItems: 'center'}}>
//                       <a href="mailto: adam.majmudar@gmail.com" target="_blank">
//                           <i style={{color: 'white', marginRight: 0}} class="fas fa-envelope-square fa-2x"></i>
//                       </a>
//                   </li>
//               </FlexRow>
//           </FadeInSection>
//       </HeroSection>
//       <AboutSection id="about">
//           <Container>
//               <Column>
//                   <FadeInSection>
//                       <HeaderLine/>
//                       <Header>A B O U T</Header>
//                   </FadeInSection>
//                   <FadeInSection>
//                       <Text>
//                           I’m a 17-year-old focused on building products that solve problems and developing new skills (currently learning about SEO, sales, and marketing).
//                           <br/><br/>
//                           In the past, I’ve worked on machine learning solutions at <a style={{color: 'white', fontWeight: 700}} href="https://dovetale.com/" target="_blank">Dovetale</a>
//                           &nbsp;and I'm an alumni of <a style={{color: 'white', fontWeight: 700}} href="https://tks.world/" target="_blank">The Knowledge Society.</a>
//                           &nbsp;Currently, I’m an engineering student at the University of Pennsylvania.
//                           <br/><br/>
//                           <Text style={{fontWeight: 700}}>I'm most interested in:</Text>
//                           <ul>
//                               <Interest>Neuroscience, BCIs, & Neuralink</Interest>
//                               <Interest>Philosophy & Psychology (Existentialism, Stoicism, Vedanta, etc.)</Interest>
//                               <Interest>Artificial Intelligence (Especially in relation to neuroscience/BCIs or AGI - which I’m skeptical of)</Interest>
//                               <Interest>Quantum Computing (I think the theory is interesting regardless of how practical the field will become)</Interest>
//                           </ul>
//                       </Text>
//                   </FadeInSection>
//               </Column>
//               <FadeInSection>
//                   <Image 
//                     src="/SeniorPhoto.jpg"
//                     width="100%"
//                     height="100%"
//                     />
//               </FadeInSection>
//           </Container>
//       </AboutSection>
//       <ItemSection id="portfolio">
//           <Container>
//               <ItemColumn>
//                   <FadeInSection>
//                       <HeaderLine/>
//                       <Header>P O R T F O L I O</Header>
//                   </FadeInSection>
//                   <FadeInSection>
//                       <FlexRow style={{flexWrap: 'nowrap'}}>
//                           <Filter active={filter === 'Projects'} onClick={() => setFilter('Projects')}>Projects</Filter>
//                           <Filter active={filter === 'Articles'} onClick={() => setFilter('Articles')}>Articles</Filter>
//                           <Filter active={filter === 'Newsletters'} onClick={() => setFilter('Newsletters')}>Newsletters</Filter>
//                       </FlexRow>
//                   </FadeInSection>
//                   <FadeInSection>
//                       <FlexRow>
//                           {projects.filter(project => project.content_type === filter).map((project, index) =>
//                               <ItemContainer marginTop={'60px'} marginRight={(window.innerWidth >= 1200) ? ((index + 1) % 3 === 0 ? '0px': '50px') : (window.innerWidth >= 480) ? ((index + 1) % 2 === 0 ? '0px': '50px') : '0px'}>
//                                   <ItemColumn>
//                                       <div style={{width: '100%', maxHeight: 250, overflow: 'hidden', marginBottom: 20}}>
//                                           <img style={{width: '100%'}} src={project.image}></img>
//                                       </div>
//                                       <FlexRow>
//                                           {project.labels.map((label) =>
//                                               <ItemLabel color={label.color}>{label.name}</ItemLabel>
//                                           )}
//                                       </FlexRow>
//                                       {filter !== 'Newsletters' ?
//                                           <>
//                                           <ItemTitle>{project.title}</ItemTitle>
//                                           <ItemDate>{project.date}</ItemDate>
//                                           <ItemDescription>{project.description}</ItemDescription>
//                                           </>
//                                       :
//                                           <ItemTitle style={{marginBottom: 25}}>{project.title}</ItemTitle>
//                                       }
//                                       <FlexRow>
//                                           {project.links.split('   ').map((link) => 
//                                               <Link href={link.split('  ')[1]} target="_blank"><LinkButton className="btn">{link.split('  ')[0]}</LinkButton></Link>
//                                           )}
//                                       </FlexRow>
//                                   </ItemColumn>
//                               </ItemContainer>
//                           )}
//                       </FlexRow>
//                   </FadeInSection>
//               </ItemColumn>
//           </Container>
//       </ItemSection>
//       <Footer>
//           <HeaderLine style={{marginLeft: 'auto', height: 5, marginBottom: 0}}/>
//           <Brand class="navbar-brand" href="#">Adam.</Brand>
//           <FlexRow>
//                   <li style={{display: 'flex', alignItems: 'center'}}>
//                       <a href="https://twitter.com/MajmudarAdam" target="_blank">
//                           <i style={{color: 'white', marginRight: 40}} class="fab fa-twitter fa-2x"></i>
//                       </a>
//                   </li>
//                   <li style={{display: 'flex', alignItems: 'center'}}>
//                       <a href="https://github.com/adam-maj" target="_blank">
//                           <i style={{color: 'white', marginRight: 40}} class="fab fa-github fa-2x"></i>
//                       </a>
//                   </li>
//                   <li style={{display: 'flex', alignItems: 'center'}}>
//                       <a href="https://www.linkedin.com/in/adam-majmudar-24b596194/" target="_blank">
//                           <i style={{color: 'white', marginRight: 40}} class="fab fa-linkedin fa-2x"></i>
//                       </a>
//                   </li>
//                   <li style={{display: 'flex', alignItems: 'center'}}>
//                       <a href="mailto: adam.majmudar@gmail.com" target="_blank">
//                           <i style={{color: 'white', marginRight: 0}} class="fas fa-envelope-square fa-2x"></i>
//                       </a>
//                   </li>
//               </FlexRow>
//               <FooterText><small>&copy; Copyright 2020, Adam Majmudar. All rights reserved.</small></FooterText>
//       </Footer>
//       </>
//   );
// }

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Scrollspy from 'react-scrollspy';
import Img from 'next/image'

const Nav = styled.nav`
    background: #222222 !important;
    padding-left: 30px;
    padding-right: 30px;
    @media (min-width: 480px) {
        padding-left: 150px;
        padding-right: 150px;
    }
`
const Navlink = styled.a`
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 20px !important;
    margin-right: 30px;
`
const Brand = styled.a`
    font-family: 'Raleway';
    font-weight: 800;
    font-size: 35px;
    color: white !important;
    text-decoration: none !important;
    margin-bottom: 0px;
`
const Section = styled.section`
    background: #222222;
    display: flex;
    flex-direction: column;
    padding-left: 35px;
    padding-right: 35px;
    @media (min-width: 480px) {
        flex-direction: row;
        padding-left: 150px;
        padding-right: 150px;
    }
`
const HeroSection = styled(Section)`
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    @media (min-width: 480px) {
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
    }
`
const AboutSection = styled(Section)`
    padding-top: 60px;
    padding-bottom: 30px;
    @media (min-width: 1000px) {
        padding-top: 80px;
        padding-bottom: 50px;
    }
    @media (min-width: 1100px) {
        padding-top: 90px;
        padding-bottom: 75px;
    }
    @media (min-width: 1200px) {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    @media (min-width: 1300px) {
        padding-top: 110px;
        padding-bottom: 110px;
    }
    @media (min-width: 1400px) {
        padding-top: 125px;
        padding-bottom: 125px;
    }
    @media (min-width: 1500px) {
        padding-top: 150px;
        padding-bottom: 150px;
    }
`
const ItemSection = styled(Section)`
    padding-top: 80px;
    padding-bottom: 100px;
    @media (min-width: 1000px) {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    @media (min-width: 1100px) {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    @media (min-width: 1200px) {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    @media (min-width: 1300px) {
        padding-top: 110px;
        padding-bottom: 110px;
    }
    @media (min-width: 1400px) {
        padding-top: 125px;
        padding-bottom: 125px;
    }
    @media (min-width: 1500px) {
        padding-top: 150px;
        padding-bottom: 150px;
    }
`
const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    @media (min-width: 1000px) {
        flex-direction: row;
    }
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    @media (min-width: 1000px) {
        margin-right: 80px;   
    }
`
const Header = styled.h1`
    font-family: 'Raleway', sans-serif;
    font-weight: 800;
    font-size: 24px;
    color: white;
    margin-bottom: 15px;
    @media (min-width: 480px) {
        font-size: 60px;
        line-height: 70px;
        max-width: 1400px;
        margin-bottom: 25px;
    }
`
const HeaderLine = styled.hr`
    background: white;
    margin-left: 0px;
    height: 5px;
    width: 50px;
    margin-bottom: 15px;
    @media (min-width: 480px) {
        height: 10px;
        width: 100px;
        margin-bottom: 25px;
    }
`
const Name = styled.span`
    color: #33CCFE
`
const Text = styled.p`
    font-family: 'Raleway';
    font-weight: 300;
    font-size: 16px;
    color: white;
    width: 100%;
    @media (min-width: 768px) {
        font-size: 22px;
    }
    @media (min-width: 1000px) {
        font-size: 12px;
    }
    @media (min-width: 1200px) {
        font-size: 14px;
    }
    @media (min-width: 1300px) {
        font-size: 16px;
    }
    @media (min-width: 1400px) {
        font-size: 18px;
    }
    @media (min-width: 1500px) {
        font-size: 20px;
    }
    @media (min-width: 1600px) {
        font-size: 22px;
    }
    @media (min-width: 1740px) {
        font-size: 24px;
    }
`
const Image = styled(Img)`
    width: 100%;
    margin-top: 30px;

    @media (min-width: 1000px) {
        width: 350px;
    }
    @media (min-width: 1100px) {
        width: 375px;
    }
    @media (min-width: 1200px) {
        width: 400px;
    }
    @media (min-width: 1300px) {
        width: 450px;
    }
    @media (min-width: 1400px) {
        width: 500px;
    }
    @media (min-width: 1500px) {
        width: 525px;
    }
    @media (min-width: 1600px) {
        width: 550px;
    }
`
const FlexRow = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
`
const Filter = styled.button`
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 300;
    margin-right: 10px;
    border: none !important;
    outline: none !important;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    background: ${props => props.active ? 'black' : 'none'};
    color: white;
    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }
    @media (min-width: 480px) {
        font-size: 24px;
        margin-right: 40px;
    }
`
const ItemTitle = styled.h2`
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    color: white;
    font-size: 24px;
    margin-top: 20px;
    @media (min-width: 1000px) {
        font-size: 28px;
    }
    @media (min-width: 1200px) {
        font-size: 22px;
    }
    @media (min-width: 1300px) {
        font-size: 24px;
    }
    @media (min-width: 1400px) {
        font-size: 26px;
    }
    @media (min-width: 1500px) {
        font-size: 28px;
    }
    @media (min-width: 1600px) {
        font-size: 30px;
    }
`
const ItemDate = styled.h3`
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    color: white;
    font-size: 18px;
    @media (min-width: 1000px) {
        font-size: 20px;
    }
    @media (min-width: 1000px) {
        font-size: 24px;
    }
    @media (min-width: 1200px) {
        font-size: 20px;
    }
    @media (min-width: 1300px) {
        font-size: 21px;
    }
    @media (min-width: 1400px) {
        font-size: 22px;
    }
    @media (min-width: 1500px) {
        font-size: 23px;
    }
    @media (min-width: 1600px) {
        font-size: 24px;
    }
`
const ItemDescription = styled.p`
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
    color: white;
    margin-bottom: 25px;
    font-size: 16px;
    @media (min-width: 1000px) {
        font-size: 18px;
    }
    @media (min-width: 1200px) {
        font-size: 14px;
    }
    @media (min-width: 1300px) {
        font-size: 16px;
    }
    @media (min-width: 1400px) {
        font-size: 18px;
    }
    @media (min-width: 1500px) {
        font-size: 20px;
    }
`
const ItemLabel = styled(ItemDescription)`
    background: ${({ color }) => color};
    border-radius: 10px;
    font-size: 16px;
    padding: 2px 5px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
`
const Link = styled.a`
    margin-right: 10px;
`
const LinkButton = styled.button`
    border: none !important;
    outline: none !important;
    background: white !important;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    font-family: 'Raleway', sans-serif;
    &:hover {
        opacity: 0.75 !important;
    }
    @media (min-width: 480px) {
        font-size: 18px;
    }
`
const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-right: ${({ marginRight }) => marginRight};
    margin-top: ${({ marginTop }) => marginTop };
    @media (min-width: 480px) {
        min-width: 250px;
        width: calc((100vw - 350px)/2)
    }
    @media (min-width: 1200px) {
        min-width: 250px;
        width: calc((100vw - 400px)/3);
    }
`
const ItemColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`
const Interest = styled.li`
    color: white;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 300;
    @media (min-width: 768px) {
        font-size: 22px;
    }
    @media (min-width: 1000px) {
        font-size: 12px;
    }
    @media (min-width: 1200px) {
        font-size: 14px;
    }
    @media (min-width: 1300px) {
        font-size: 16px;
    }
    @media (min-width: 1400px) {
        font-size: 18px;
    }
    @media (min-width: 1500px) {
        font-size: 20px;
    }
    @media (min-width: 1600px) {
        font-size: 22px;
    }
    @media (min-width: 1740px) {
        font-size: 24px;
    }
`
const Footer = styled.footer`
    height: 250px;
    background: #222222;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`

const FooterText = styled.p`
    font-family: 'Raleway';
    font-weight: 300;
    font-size: 16px;
    color: white;
`

const FadeInSection = (props) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();
    React.useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
      });
      observer.observe(domRef.current);
      return () => observer.unobserve(domRef.current);
    }, []);

    return (
      <div
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef}
      >
        {props.children}
      </div>
    );
  }

const Home = () => {
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
        {process.browser && window.innerWidth > 480 ?
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
                    <Image src={'/SeniorPhoto.jpg'} width="100%" height="100%"></Image>
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
                                <ItemContainer marginTop={'60px'} marginRight={(process.browser && window.innerWidth >= 1200) ? ((index + 1) % 3 === 0 ? '0px': '50px') : (process.browser && window.innerWidth >= 480) ? ((index + 1) % 2 === 0 ? '0px': '50px') : '0px'}>
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
    )
}

export default Home;