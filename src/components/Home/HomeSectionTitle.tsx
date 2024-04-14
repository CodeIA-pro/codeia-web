import { Fragment } from "react/jsx-runtime";

interface HomeSectionTitleProps {
    srcImage: string;
    altTitle: string;
    className?: string;
    children: React.ReactNode;
}
  
  export const HomeSectionTitle: React.FC<HomeSectionTitleProps> = ({ srcImage, altTitle, className, children }) => {
    return (
        <Fragment>
            <div className={`${className ? className || '' : ''}`}
                style={{ borderRadius:'50px', display: 'flex', justifyContent: 'center', padding: '0.3em', alignItems: 'center' }}>
                    <img src={srcImage} alt={altTitle} style={{ maxWidth: '60px', maxHeight: '60px', borderRadius:'50px', padding: '0.5em', border: '3px solid #274f84', backgroundColor: '#183053',}}/>
            </div>
            {children}
        </Fragment>
    );
  };