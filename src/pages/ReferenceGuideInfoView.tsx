import { Fragment, useState } from 'react';
import { useParams } from "react-router-dom";
import { GenericFrame } from '../common/Frame/GenericFrame';
import Progress from '../common/Progress/Progress';
import { BasicFrame } from '../common/Frame/BasicFrame';
import NotFound from './NotFound';
import GuideNavbar from '../components/GuideInfo/GuideNavbar';
import { useGuideVersionProject } from '../queries/useGuide';
import Markdown from '../common/Markdown/Markdown';
import { Welcome } from '../utils/welcome.util';

const ReferenceGuideInfoView: React.FC = () => {
    const params = useParams();
    const [searchTerm, setSearchTerm] = useState(Welcome);
    const { isLoading, data} =useGuideVersionProject(params.owner as string, params.project as string, params.version as string);
    
    return (
        <Fragment>
            { isLoading ?
             (<GenericFrame>
                <Progress/> 
            </GenericFrame>)
            : (data && data?.subsection.length > 0) ? (
            <GenericFrame isCentered={false} style={{ display: 'flex', flexDirection: 'row', overflowY:'visible', paddingBottom:'0' }}>
                <GuideNavbar guideText={setSearchTerm} data={data}/>
                <BasicFrame className='markdown-container' style={{ boxSizing: "border-box", margin:0, overflowY:'auto', width: '100%' , padding:'3em 6em'}}>
                    <Markdown markdownText={searchTerm}/>
                </BasicFrame>
            </GenericFrame>
            ):(<NotFound root={''} />)}
        </Fragment>
    );
}
export default ReferenceGuideInfoView;