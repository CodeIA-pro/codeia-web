import { Fragment } from "react/jsx-runtime";

export const HomeContent: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <Fragment>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: '5%',
                paddingRight: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80%',
            }}>
                {children}
            </div>
        </Fragment>
    );
};