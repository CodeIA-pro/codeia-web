import { Guide } from "../../interfaces/guide/guide.interface";
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { Button, Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { convertTimestampToDate, timeSince } from "../../utils/filtered";
import { useGuideVersion } from "../../queries/useGuide";
import UpdateIcon from '@mui/icons-material/Update';
import TypographyLongFlow from "../../common/Typography/TypographyLongFlow";
import CachedIcon from '@mui/icons-material/Cached';

interface GuideInfoProps {
    projects: Guide;
    updatedAt: number;
    loading: boolean;
    update?: () => void;
}
  
const GuideInfo: React.FC<GuideInfoProps> = ({projects, updatedAt, update}) => {
    const {data, isLoading, remove, refetch} = useGuideVersion(projects?.id);
    return (
        <BasicFrame isCentered={false} className="card-item items-start justify-center flex-col pl-6 ">
            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em'}}>Repository</Typography>
            <a href={`${projects?.url_repo}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#6c93f1' }}>
                <TypographyLongFlow style={{ alignItems:'center', cursor: 'pointer',}}>
                    {projects?.url_repo}
                </TypographyLongFlow>
            </a>
            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Updated at</Typography>
            <BasicFrame isCentered={false} className="flex items-center justify-center">
                <span style={{fontSize: '0.9em'}}>{convertTimestampToDate(updatedAt)}</span>
                <Button onClick={update} className="flex items-center ml-10" style={{backgroundColor:'#fff', textTransform: 'none', padding:'0', marginLeft:'10px'}}>
                    <Typography variant="caption" className="mr-1">Reload Guide</Typography>
                    <CachedIcon style={{height:'0.78em', width:'0.7em', color: '#1e2f50', marginLeft:'8px'}}/>
                </Button>
            </BasicFrame>
            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Status</Typography>
            <span style={{fontSize: '0.9em'}}>
                {projects?.is_Loading ? (
                    <BasicFrame isCentered={false} className="items-center flex-row">
                        Compiling  &nbsp; <LoopIcon style={{color:'#a5c96d', fontSize:'1.2em'}}/>  &nbsp; {projects?.status}
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
                        {<span className="text-wrap">{projects?.message_failed}&nbsp;<ErrorIcon style={{color:'#ff0000', fontSize:'1.2em'}}/></span>}
                    </>
                )}
            </span>

            <Typography style={{fontSize: '1em', fontWeight: 'bold', paddingBottom:'0.1em', paddingTop:'0.5em'}}>Latest Repo Commit</Typography>
            <span style={{fontSize: '0.9em'}}>
                { isLoading ? (
                    <BasicFrame isCentered={false} className="items-center flex-row">
                        <p>Checking &nbsp;<LoopIcon style={{color:'#a5c96d', fontSize:'1.2em'}}/></p>
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
                                <Button onClick={ () => {remove(); refetch();}} className="flex items-center ml-5" style={{backgroundColor:'#fff', textTransform: 'none', padding:'0', marginLeft:'10px'}}>
                                    <Typography variant="caption" className="mr-1">Update Guide</Typography>
                                    <UpdateIcon style={{height:'0.78em', width:'0.7em', color: '#1e2f50', marginLeft:'8px'}}/>
                                </Button>
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