import { GenericFrame } from "../../common/Frame/GenericFrame"
import { Button } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { HomeSectionTitle } from "../../components/Home/HomeSectionTitle";
import { HomeSectionText } from "../../components/Home/HomeSectionText";
import { HomeSectionContent } from "../../components/Home/HomeSectionContent";
import { HomeSectionCard } from "../../components/Home/HomeSectionCard";
import { HomeSectionItem } from "../../components/Home/HomeSectionItem";
import { useLocation } from "react-router-dom";
import { Redirection } from "../../helpers/home.helpers";
import Features from "../../utils/home.utils";

/* Images */
import backgroundImage from "../../../assets/home.png";

const HomeView: React.FC= () => {
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
                  <h2 style={{ color: '#74767a', textAlign: 'center', fontSize: '1.1em', marginTop: 0 }}>Your ultimate guide to accelerating documentation creation</h2>
                  <Button className={clicked ? 'buttonClicked' : ''} onClick={handleClick} sx={{ fontSize: '1em',fontWeight: 300, pr:'5em', pl:'5em', mt:'0.4em' }} variant="text"><span style={{zIndex:3}}>Begin your adventure</span></Button>
                  {clicked && <Redirection />}
              </BasicFrame>
      </GenericFrame>
              
        {/* Features */} 
        {Features.map((feature) => (
        <GenericFrame key={feature.id} id={feature.id} className='flex-col' style={{ backgroundColor: '#080a0f', }}>
          <BasicFrame className="px-8">
            <HomeSectionTitle className="cardWithAnimatedSeccion" srcImage={feature.image} altTitle={feature.title}>
              <HomeSectionText 
                title={feature.sectionTitle}
                description={feature.sectionDescription} />
            </HomeSectionTitle>
          </BasicFrame>
          
          <HomeSectionContent className="home-card">
            {feature.cards.map((card, index) => (
              <HomeSectionCard key={index} style={{ maxWidth: '450px', maxHeight: '450px' }} className={`mt-5 cardWithAnimatedBorder${index === 0 ? '' : 'Two'} ${(index) % 2 == 0 ? 'mr-5' : '' } home-card-item`}>
                <HomeSectionItem srcImage={card.image} 
                  leftTitle={card.leftTitle}
                  mainTitle={card.mainTitle}
                  rightTitle={card.rightTitle} 
                  description={card.description}/>
              </HomeSectionCard>
            ))}
          </HomeSectionContent>
        </GenericFrame>
      ))}
    </Fragment>
  )
}

export default HomeView;