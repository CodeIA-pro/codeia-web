import { Typography } from "@mui/material";

const TypographyFlow: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <Typography style={{fontSize: '0.7em', 
        maxWidth: '250px', // Ajusta según tus necesidades
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}>{children}</Typography>
    );
}

export default TypographyFlow;