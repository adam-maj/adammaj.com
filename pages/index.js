import { useState } from 'react';
import Socials from '../components/Socials'
import Navbar from '../components/Navbar'
import FadeInSection from '../components/FadeInSection'
import { PROJECTS } from '../components/Projects'
import { Brand } from '../styles/Navbar'
import Subscribe from '../components/Subscribe'
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
import styled from 'styled-components'

const AboutLink = styled.a`
	color: white !important;
	font-weight: 700;
`

export default function Home() {
	return(
		<>
			<link rel="icon" src="./favicon.ico" />
			<Navbar />
			<HeroSection id="home">
				<FadeInSection>
					<Header id="home">
						Hi, I'm <Name>Adam Majmudar</Name>. Curious Learner, Problem Solver, Blockchain & ML Engineer, and Full Stack Developer.
					</Header>
				</FadeInSection>
				<FadeInSection>
					<Socials id={0}/>
					<Subscribe 
						width="min(600px, 70vw)" 
						color="white" 
						mt="80px"
					>
						Want to stay up to date with what I'm working on? Drop your email below!
					</Subscribe>
				</FadeInSection>
			</HeroSection>

			<About />
			<Portfolio />
			<PageFooter />
		</>
	)
}

function About() {
	return (
		<AboutSection id="about">
			<Container>
				<Column>
					<FadeInSection>
						<HeaderLine/>
						<Header>A B O U T</Header>
					</FadeInSection>
					<FadeInSection>
						<Text>
							I'm a learner and builder at heart with a wide variety of interests. I'm a constant truth-seeker 
							and love exploring and learning about philosophy. I also like to take time to prioritize diving deep 
							into my specific interests.
							<br/><br/>
							Currently, I'm working on building an ML platform for a Canadian company doing cutting edge research on 
							anxiety and sleep disorders, I'm designing and building an NFT marketplace for creators in <AboutLink href="https://f.inc">Founders Inc.</AboutLink>, and 
							I'm the product manager at <AboutLink href="https://ascendbuild.co">Ascend</AboutLink>. 
							I'm also a freshman studying CS and Cognitive Science at the University of Pennsylvania.
							<br/><br/>
							<Text style={{fontWeight: 700}}>
								I'm most interested in:
							</Text>
							<ul>
								<Interest>
									Philosophy & Psychology (Existentialism, Vedanta, etc.)
								</Interest>
								<Interest>
									Neuroscience, Consciousness, Meditation, & Psychedelics
								</Interest>
								<Interest>
									Artificial Intelligence, Quantum Computing, and Blockchain (and their potential future implications)
								</Interest>
							</ul>
						</Text>
					</FadeInSection>
				</Column>
				<FadeInSection>
					<Image 
						src="/senior-photo.jpg" 
						width="100%" 
						height="100%"
					/>
				</FadeInSection>
			</Container>
		</AboutSection>
	)
}

function Portfolio() {
	const [filter, setFilter] = useState('Projects');
	const [projects, setProjects] = useState(PROJECTS);

	return (
		<ItemSection id="portfolio">
			<Container>
				<ItemColumn>
					<FadeInSection>
						<HeaderLine/>
						<Header>P O R T F O L I O</Header>
					</FadeInSection>
					<FadeInSection>
						<FlexRow style={{flexWrap: 'nowrap'}}>
							<Filter 
								active={filter === 'Projects'} 
								onClick={() => setFilter('Projects')}
							>
								Projects
							</Filter>
							<Filter 
								active={filter === 'Articles'} 
								onClick={() => setFilter('Articles')}
							>
								Articles
							</Filter>
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
											marginBottom: 20,
											borderRadius: '16px'
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
												<Link 
													href={link.split('  ')[1]} 
													target="_blank"
												>
													<LinkButton className="btn">
														{link.split('  ')[0]}
													</LinkButton>
												</Link>
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
	)
}

function PageFooter() {
	return (
		<Footer>
			<HeaderLine style={{marginLeft: 'auto', height: 5, marginBottom: 0}}/>
			<Brand>Adam.</Brand>
				<FlexRow>
					<Socials id={6}/>
				</FlexRow>
				<FooterText><small>&copy; Copyright 2020, Adam Majmudar. All rights reserved.</small></FooterText>
		</Footer>
	)
}