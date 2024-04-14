interface HomeSectionContentProps {
    className?: string;
    children: React.ReactNode;
}
  
  export const HomeSectionContent: React.FC<HomeSectionContentProps> = ({ className, children }) => {
    return (
            <div className={`${className ? className || '' : ''}`}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {children}
            </div>
    );
  };