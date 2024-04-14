import { Card } from "@mui/material";

interface HomeSectionCardProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}
  
  export const HomeSectionCard: React.FC<HomeSectionCardProps> = ({ className, style, children }) => {
    return (
            <Card className={`${className ? className || '' : ''}`}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            sx={{ 
                backgroundColor: '#111623', 
                padding: '0.5rem', 
                borderRadius: '16px',
                ...(style || {}),
            }}>
                {children}
            </Card>
    );
  };