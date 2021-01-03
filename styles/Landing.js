import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'

export const Section = styled.section`
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
export const HeroSection = styled(Section)`
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
export const AboutSection = styled(Section)`
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
export const ItemSection = styled(Section)`
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
export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media (min-width: 1000px) {
    margin-right: 80px;   
  }
`
export const Header = styled.h1`
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
export const HeaderLine = styled.hr`
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
export const Name = styled.span`
  color: #33CCFE
`
export const Text = styled.p`
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
export const Image = styled.img`
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
export const FlexRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`
export const Filter = styled.button`
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
export const ItemTitle = styled.h2`
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
export const ItemDate = styled.h3`
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
export const ItemDescription = styled.p`
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

export const ItemLabel = styled(ItemDescription)`
  background: ${({ color }) => color};
  border-radius: 10px;
  font-size: 16px;
  padding: 2px 5px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`

export const Link = styled.a`
  margin-right: 10px;
`

export const LinkButton = styled.button`
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

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: ${({ marginRight }) => marginRight};
  margin-top: ${({ marginTop }) => marginTop };

  @media (min-width: 480px) {
    min-width: 250px;
    width: calc((100vw - 350px)/2);
  }

  @media (min-width: 1200px) {
    min-width: 250px;
    width: calc((100vw - 400px)/3);
}
`
export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
export const Interest = styled.li`
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
export const Footer = styled.footer`
  height: 250px;
  background: #222222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

export const FooterText = styled.p`
  font-family: 'Raleway';
  font-weight: 300;
  font-size: 16px;
  color: white;
`

export const FadeInSection = (props) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
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