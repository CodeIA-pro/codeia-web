import { Fragment, useState } from 'react';
import { useParams } from "react-router-dom";
import { GenericFrame } from '../../common/Frame/GenericFrame';
import Progress from '../../common/Progress/Progress';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import NotFound from '../../common/Not_found/NotFound';
import GuideNavbar from '../../components/GuideInfo/GuideNavbar';
import { useGuideVersionURL } from '../../queries/useGuide';
import Markdown from '../../common/Markdown/Markdown';
import { Welcome } from '../../utils/welcome.util';

const ReferenceGuideInfoSharedView: React.FC = () => {
    const params = useParams();
    const [searchTerm, setSearchTerm] = useState(Welcome);
    const { isLoading, data} = useGuideVersionURL(params.url as string);
    
    return (
        <Fragment>
            { isLoading ?
             (<GenericFrame className='pt-0'>
                <Progress/> 
            </GenericFrame>)
            : (data && data?.subsection.length > 0) ? (
            <BasicFrame isCentered={false} className='min-h-screen w-full' style={{ overflowY:'visible', paddingBottom:'0'}}>
                <GuideNavbar guideText={setSearchTerm} data={data}/>
                <BasicFrame className='markdown-container' style={{ boxSizing: "border-box", margin:0, overflowY:'auto', width: '100%' , padding:'3em 6em'}}>
                    <Markdown markdownText={searchTerm}/>
                </BasicFrame>
            </BasicFrame>
            ):(<NotFound root={'Guide does not exist or does not have sufficient permissions'} />)}
        </Fragment>
    );
}
export default ReferenceGuideInfoSharedView;