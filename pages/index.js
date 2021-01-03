import { useState } from 'react';
import Socials from '../components/Socials'
import Navbar from '../components/Navbar'
import FadeInSection from '../components/FadeInSection'
import { PROJECTS } from '../components/Projects'
import { Brand } from '../styles/Navbar'
import {
	HeroSection,
	AboutSection,
	ItemSection,
	Container,
	Column,
	Header,
	HeaderLine,
	Name,
	Text,
	Image,
	FlexRow,
	Filter,
	ItemTitle,
	ItemDate,
	ItemDescription,
	ItemLabel,
	Link,
	LinkButton,
	ItemContainer,
	ItemColumn,
	Interest,
	Footer,
	FooterText
} from '../styles/Landing'

export default function Home() {
	const [filter, setFilter] = useState('Projects');
	const [projects, setProjects] = useState(PROJECTS);

	return(
		<>
			<link rel="icon" src="./favicon.ico" />
			<Navbar />
			<HeroSection id="home">
				<FadeInSection>
					<Header id="home">Hi, I'm <Name>Adam Majmudar</Name>, Neuroscience Enthusiast, Machine Learning Engineer, & Full Stack Developer.</Header>
				</FadeInSection>
				<FadeInSection>
					<Socials />
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
									<ItemContainer index={index} marginTop="60px" >
										<ItemColumn>
											<div style={{ 
												width: '100%', 
												maxHeight: 250, 
												overflow: 'hidden', 
												marginBottom: 20 
											}}>
												<img style={{ width: '100%' }} src={project.image} />
											</div>
											<FlexRow>
												{project.labels.map((label) =>
													<ItemLabel color="black">{label}</ItemLabel>
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
				<Brand>Adam.</Brand>
					<FlexRow>
						<Socials />
					</FlexRow>
					<FooterText><small>&copy; Copyright 2020, Adam Majmudar. All rights reserved.</small></FooterText>
			</Footer>
		</>
	)
}