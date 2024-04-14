import { GenericFrame } from "../common/Frame/GenericFrame"
import { Button } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { BasicFrame } from "../common/Frame/BasicFrame";
import { HomeSectionTitle } from "../components/Home/HomeSectionTitle";
import { HomeSectionText } from "../components/Home/HomeSectionText";
import { HomeSectionContent } from "../components/Home/HomeSectionContent";
import { HomeSectionCard } from "../components/Home/HomeSectionCard";
import { HomeSectionItem } from "../components/Home/HomeSectionItem";
import { useLocation } from "react-router-dom";
import { Redirection } from "../helpers/home.helpers";

/* Images */
import backgroundImage from "../../assets/home.png";
import SectionCode from '../../assets/code-section.svg';
import IntelligentImage from '../../assets/intelligent.svg';
import CodeImage from '../../assets/code.svg';
import Customization from '../../assets/customization.svg';
import File from '../../assets/file.svg';
import Development from '../../assets/development.svg';
import Agile from '../../assets/agile.svg';
import Detection from '../../assets/detection.svg';
import Security from '../../assets/security.svg';
import Privacy from '../../assets/privacy.svg';

export const HomeView: React.FC= () => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();
  
  const handleClick = () => setClicked(true);

  useEffect(() => {
    const seccion = location.hash.replace('#', '');
    if (seccion) {
      const elemento = document.getElementById(seccion);
      if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);


  return (
    <Fragment>
      {/* Home */}
      <GenericFrame id='home' className='flex-col' style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
      }}>
              <BasicFrame className='flex-col'>
                  <h1 style={{ color: 'white', textAlign: 'center', fontSize: '3em', margin: 0 }}>AI-Powered <span style={{color: '#649878'}}>DRF</span> Documentation<br/> Generation</h1>
                  <h2 style={{ color: '#74767a', textAlign: 'center', fontSize: '0.9em', marginTop: 0 }}>Your ultimate guide to accelerating documentation creation</h2>
                  <Button className={clicked ? 'buttonClicked' : ''} onClick={handleClick} sx={{ fontSize: '1em',fontWeight: 300, pr:'5em', pl:'5em', mt:'0.4em' }} variant="text"><span style={{zIndex:3}}>Begin your adventure</span></Button>
                  {clicked && <Redirection />}
              </BasicFrame>
      </GenericFrame>
              
      {/* Features */} 
      <GenericFrame id='feature' className='flex-col' style={{ backgroundColor: '#080a0f', }}>
        <BasicFrame>
            <HomeSectionTitle className="cardWithAnimatedSeccion" srcImage={SectionCode} altTitle="Intelligent Automation">
              <HomeSectionText 
                title="Automation and Efficiency" 
                description="Automate Django reference guide creation to save time and enhance project efficiency." />
            </HomeSectionTitle>
        </BasicFrame>
        
        <HomeSectionContent className="mt-5">
          <HomeSectionCard style={{ maxWidth: '450px', maxHeight: '450px' }} className="cardWithAnimatedBorder mr-5">
            <HomeSectionItem srcImage={IntelligentImage} 
              leftTitle="Intelligent Automation for"
              mainTitle="DRF"
              rightTitle="Development" 
              description="Maximize efficiency in your backend projects with automatically generated, Django-specific reference guides."/>
          </HomeSectionCard>
          
          <HomeSectionCard style={{ maxWidth: '450px', maxHeight: '450px' }} className="cardWithAnimatedBorderTwo">
            <HomeSectionItem srcImage={CodeImage} 
              leftTitle="Know Your"
              mainTitle="Code"
              rightTitle="Base" 
              description="Access precise and up-to-date information about your Django code base, saving time on manual searching and analysis."/>
          </HomeSectionCard>
        </HomeSectionContent>
      </GenericFrame>

      <GenericFrame id='feature2' className='flex-col' style={{ backgroundColor: '#080a0f', }}>
        <BasicFrame>
            <HomeSectionTitle className="cardWithAnimatedSeccion" srcImage={Customization} altTitle="Intelligent Automation">
              <HomeSectionText 
                title="Customization and Relevance" 
                description="Get tailored, up-to-date Django documentation that meets specific project needs." />
            </HomeSectionTitle>
        </BasicFrame>
        
        <HomeSectionContent className="mt-5">
          <HomeSectionCard style={{ maxWidth: '450px', maxHeight: '450px' }} className="cardWithAnimatedBorder mr-5">
            <HomeSectionItem srcImage={File} 
              leftTitle="Customized and Current"
              mainTitle="Documentation"
              rightTitle="" 
              description="Obtain reference guides tailored to your specific needs, consistently updated with the latest Django practices and standards."/>
          </HomeSectionCard>
        </HomeSectionContent>
      </GenericFrame>

      <GenericFrame id='feature3' className='flex-col' style={{ backgroundColor: '#080a0f', }} >
        <BasicFrame>
            <HomeSectionTitle className="cardWithAnimatedSeccion" srcImage={Development} altTitle="Intelligent Automation">
              <HomeSectionText 
                title="Development and Productivity" 
                description="Focus on critical development aspects with automated logic writing and error resolution." />
            </HomeSectionTitle>
        </BasicFrame>
        
        <HomeSectionContent className="mt-5">
          <HomeSectionCard style={{ maxWidth: '450px', maxHeight: '450px' }} className="cardWithAnimatedBorder mr-5">
            <HomeSectionItem srcImage={Agile} 
              leftTitle="Agile and Effective"
              mainTitle="Development"
              rightTitle="" 
              description="Maintain focus on crucial aspects of development, with the system handling low-level logic writing."/>
          </HomeSectionCard>
          
          <HomeSectionCard style={{ maxWidth: '450px', maxHeight: '450px' }} className="cardWithAnimatedBorderTwo">
            <HomeSectionItem srcImage={Detection} 
              leftTitle="Error"
              mainTitle="Detection"
              rightTitle="and Correction" 
              description="The system analyzes your code for errors, assisting in quick identification and resolution of issues."/>
          </HomeSectionCard>
        </HomeSectionContent>
      </GenericFrame>

      <GenericFrame id='feature4' className='flex-col' style={{ backgroundColor: '#080a0f', }}>
        <BasicFrame>
            <HomeSectionTitle className="cardWithAnimatedSeccion" srcImage={Security} altTitle="Intelligent Automation">
              <HomeSectionText 
                title="Security and Privacy" 
                description="Ensure code privacy with no data storage on servers or logs in privacy mode." />
            </HomeSectionTitle>
        </BasicFrame>
        
        <HomeSectionContent className="mt-5">
          <HomeSectionCard style={{ maxWidth: '450px', maxHeight: '450px' }} className="cardWithAnimatedBorder mr-5">
            <HomeSectionItem srcImage={Privacy} 
              leftTitle="Guaranteed"
              mainTitle="Privacy"
              rightTitle="" 
              description="Ensures the privacy of your code; the privacy mode ensures no storage of code data on servers or logs."/>
          </HomeSectionCard>
        </HomeSectionContent>
      </GenericFrame>
    </Fragment>
  )
}