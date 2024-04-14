import { Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

interface HomeSectionTextProps {
    title: string;
    description: string;
    className?: string;
}
  
  export const HomeSectionText: React.FC<HomeSectionTextProps> = ({ title, description, className }) => {
    return (
        <Fragment>
            <div 
                className={`${className ? className || '' : ''}`}
                style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: '1em',
                paddingBottom: '0.3em',
                }}>

                <Typography sx={{fontSize: '1.5em', color: '#fff'}}>{title}</Typography>
                <Typography sx={{ color: '#74767a', fontSize: '1.1em'}}>{description}</Typography>
            </div>
        </Fragment>
    );
  };