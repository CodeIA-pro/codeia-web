import { Guide } from "../../interfaces/guide/guide.interface";
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { convertTimestampToDate, timeSince } from "../../utils/filtered";
import { useGuideVersion } from "../../queries/useGuide";
import TypographyLongFlow from "../../common/Typography/TypographyLongFlow";

interface GuideInfoProps {
    projects: Guide;
    updatedAt: number;
}
  
const GuideInfo: React.FC<GuideInfoProps> = ({projects, updatedAt}) => {
    const {data, isLoading} = useGuideVersion(projects?.id);
    return (
        <BasicFrame isCentered={false} className="card-item items-start justify-center flex-col pl-6 ">
            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em'}}>Repository</Typography>
            <a href={`${projects?.url_repo}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#6c93f1' }}>
                <TypographyLongFlow style={{ alignItems:'center', cursor: 'pointer',}}>
                    {projects?.url_repo}
                </TypographyLongFlow>
            </a>
            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Updated at</Typography>
            <span style={{fontSize: '0.9em'}}>{convertTimestampToDate(updatedAt)}</span>

            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Status</Typography>
            <span style={{fontSize: '0.9em'}}>
                {projects?.is_Loading ? (
                    <BasicFrame isCentered={false} className="items-center flex-row">
                        Compiling  &nbsp; <LoopIcon style={{color:'#a5c96d', fontSize:'1.2em'}}/>
                    </BasicFrame>
                ) : (
                    <BasicFrame>
                        Ready to compile &nbsp; <CheckCircleIcon style={{color:'#a5c96d', fontSize:'1.2em'}}/>
                    </BasicFrame>
                )}
            </span>

            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Latest compilation</Typography>
            <span style={{fontSize: '0.9em'}}>
                {projects?.message_failed==='' ? (
                    <>
                        {timeSince(projects?.latest_build)}
                    </>
                ) : (
                    <>
                        {projects?.message_failed}&nbsp;<ErrorIcon style={{color:'#ff0000', fontSize:'1.2em'}}/>
                    </>
                )}
            </span>

            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Latest Repo Commit</Typography>
            <span style={{fontSize: '0.9em'}}>
                { isLoading ? (
                    <BasicFrame isCentered={false} className="items-center flex-row">
                        Checking &nbsp;<LoopIcon style={{color:'#a5c96d', fontSize:'1.2em'}}/>
                    </BasicFrame>
                ) : (
                    <>
                        { data?.status ?
                            <BasicFrame isCentered={false} className="items-center flex-row">
                                Updated &nbsp;<CheckCircleIcon style={{color:'#a5c96d', fontSize:'1.2em'}}/>
                            </BasicFrame>
                            :(projects?.last_version === '')?
                            <BasicFrame isCentered={false} className="items-center flex-row">
                                uncompiled 
                            </BasicFrame>
                            :
                            <BasicFrame isCentered={false} className="items-center flex-row">
                                New commit detected &nbsp;<ErrorIcon style={{color:'#fd7f14', fontSize:'1.2em'}}/>
                            </BasicFrame>
                        }
                    </>
                )}
            </span>

            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Last version</Typography>
            <span style={{fontSize: '0.9em'}}>{(projects?.last_version === '') ? 'uncompiled' : projects?.last_version}</span>

            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Branch</Typography>
            <span style={{fontSize: '0.9em'}}>{projects?.branch}</span>
        </BasicFrame>
    );
}
export default GuideInfo;