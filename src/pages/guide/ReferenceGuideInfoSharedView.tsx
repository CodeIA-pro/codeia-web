import { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { GenericFrame } from '../../common/Frame/GenericFrame';
import Progress from '../../common/Progress/Progress';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import NotFound from '../../common/Not_found/NotFound';
import GuideNavbar from '../../components/GuideInfo/GuideNavbar';
import { useGuideVersionURL } from '../../queries/useGuide';
import Markdown from '../../common/Markdown/Markdown';
import { Welcome } from '../../utils/welcome.util';

import { useWindowSize } from '../../hooks/useWindowSize';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const ReferenceGuideInfoSharedView: React.FC = () => {
    const params = useParams();
    const [searchTerm, setSearchTerm] = useState(Welcome);
    const { isLoading, data} = useGuideVersionURL(params.url as string);
    const { width } = useWindowSize();
    
    const [burgerActive, setBurgerActive] = useState(false);

    const toggleBurger = () => {
        setBurgerActive(!burgerActive); 
    }

    useEffect(() => {
        if (width >= 768) {
          setBurgerActive(true);
        } else {
          setBurgerActive(false);
        }
    }, [width]);
    
    return (
        <Fragment>
            { isLoading ?
             (<GenericFrame className='pt-0'>
                <Progress/> 
            </GenericFrame>)
            : (data && data?.subsection.length > 0) ? (
            <BasicFrame isCentered={false} className='min-h-screen w-full' style={{ overflowY:'visible', paddingBottom:'0'}}>
                {
                    burgerActive 
                    ? 
                        <>
                            <div className='absolute left-4 top-20 h-12 w-12 flex rounded-3xl items-center justify-center'>
                                <KeyboardDoubleArrowLeftIcon onClick={toggleBurger} className='text-white left-2 top-22 h-8 w-8 z-10'/>
                            </div>
                            <GuideNavbar guideText={setSearchTerm} data={data}/>
                        </>
                    : 
                    <div className='absolute left-4 top-20 h-12 w-12 flex rounded-3xl items-center justify-center' style={{ backgroundColor:'#517daf'}}>
                        <KeyboardDoubleArrowRightIcon onClick={toggleBurger} className='relative text-white top-0 w-16'/>
                    </div>
                }
                <BasicFrame className='markdown-container pl-32 md:px-16 md:py-16' style={{ boxSizing: "border-box", margin:0, overflowY:'auto', width: '100%'}}>
                    <Markdown markdownText={searchTerm}/>
                </BasicFrame>
            </BasicFrame>
            ):(<NotFound root={'Guide does not exist or does not have sufficient permissions'} />)}
        </Fragment>
    );
}
export default ReferenceGuideInfoSharedView;