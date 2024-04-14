import { CardContent } from "@mui/material";

interface HomeSectionItemProps {
    srcImage: string;
    leftTitle: string;
    mainTitle: string;
    rightTitle: string;
    description: string;
    className?: string;
}
  
  export const HomeSectionItem: React.FC<HomeSectionItemProps> = ({ srcImage, leftTitle, mainTitle, rightTitle, description, className }) => {
    return (
        <CardContent className={`${className ? className || '' : ''} h-full`} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{ color: 'white', textAlign: 'center', fontSize: '1.3em', margin: 0 }}>{leftTitle} <span style={{color: '#6c93f1'}}>{mainTitle}</span> {rightTitle}</h1>
            <h2 style={{ color: '#74767a', textAlign: 'center', fontSize: '0.8em' }}>{description}</h2>
            <img src={srcImage} alt="Intelligent Automation" style={{ width: '100px', height: '50%', paddingTop:'1em' }} />
        </CardContent>
    );
  };