import { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { GenericFrame } from '../../common/Frame/GenericFrame';
import Progress from '../../common/Progress/Progress';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import NotFound from '../../common/Not_found/NotFound';
import GuideNavbar from '../../components/GuideInfo/GuideNavbar';
import { useGuideVersionProject } from '../../queries/useGuide';
import Markdown from '../../common/Markdown/Markdown';
import { Welcome } from '../../utils/welcome.util';

import { useWindowSize } from '../../hooks/useWindowSize';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const ReferenceGuideInfoView: React.FC = () => {
    const params = useParams();
    const [searchTerm, setSearchTerm] = useState(Welcome);
    const { isLoading, data} =useGuideVersionProject(params.owner as string, params.project as string, params.version as string);
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
             (<GenericFrame>
                <Progress/> 
            </GenericFrame>)
            : (data && data?.subsection.length > 0) ? (
            <GenericFrame isCentered={false} style={{ display: 'flex', flexDirection: 'row', overflowY:'visible', paddingBottom:'0' }}>
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
                <BasicFrame className='markdown-container pl-16 pr-16 md:pl-16 py-16' style={{ boxSizing: "border-box", margin:0, overflowY:'auto', width: '100%'}}>
                    <Markdown markdownText={searchTerm}/>
                </BasicFrame>
            </GenericFrame>
            ):(<NotFound root={''} />)}
        </Fragment>
    );
}
export default ReferenceGuideInfoView;