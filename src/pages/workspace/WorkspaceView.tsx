
import { Fragment, useState } from "react";
import { GenericFrame } from "../../common/Frame/GenericFrame";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { Typography } from "@mui/material";
import { useProjectItem, useProjectName } from "../../queries/useProject";
import { useParams } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GenericPaper from "../../common/Container/GenericPaper";
import Search from "../../common/Search/Search";
import Progress from "../../common/Progress/Progress";
import WorkSpaceList from "../../components/WorkSpace/WorkSpaceList";
import NotFound from "../../common/Not_found/NotFound";
import EditProjectDialog from "../../components/Project/EditProjectDialog";

const WorkSpaceView: React.FC = () => {
    const params = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const {data, isLoading} = useProjectItem(params?.name as string);
    const {data: project, isLoading: loadingProject} = useProjectName(params?.name as string);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);
    
    const handleSearch = (term: string) => {
        const searchTerm = term.trim().toLowerCase();
        setSearchTerm(searchTerm);
    };
    
    return (
        <Fragment>
        {isLoading || loadingProject ? 
            (<GenericFrame>
                <Progress/> 
            </GenericFrame>)
            : data && project && data?.length > 0 ? 
            (
                <GenericFrame isCentered={false} className="items-start justify-center">
                <BasicFrame isCentered={false} className="mt-10" style={{flexDirection:'column'}}>
                    <BasicFrame isCentered={false} className="flex-col" style={{width: '90vw', maxWidth: '860px'}}>
                        <Typography style={{ fontSize: '1.3em'}}><span style={{fontWeight: 'bold'}}>{project.title}</span>&nbsp; 
                        <BorderColorIcon style={{ width:'18px', cursor:'pointer'}} onClick={handleOpen}/>
                        </Typography>
                        <Typography style={{ fontSize: '0.8em', paddingTop:'0.5em', paddingBottom:'1.5em'}}>
                            {(project.description.trim() == '' ? 'No description' : project.description)}
                        </Typography>
                    </BasicFrame>
                    <BasicFrame isCentered={false} className="card-container items-start justify-between">
                        <GenericPaper style={{height: '530px', width: '90vw', maxWidth: '860px'}}>
                            <Search searchTerm={searchTerm} onSearch={handleSearch}/>
                            <GenericPaper className="mt-4" style={{padding:'0.5em', height: '85%'}}>
                                {(isLoading) ? (
                                    <Progress />
                                ):( 
                                    <WorkSpaceList projects={data} name={searchTerm} params={params?.name as string}/>
                                )}
                            </GenericPaper>
                        </GenericPaper>
                    </BasicFrame>
                </BasicFrame>
                <EditProjectDialog initialData={project} onClose={handleClose} open={openDialog}/>
            </GenericFrame>
            ) 
            :
            (<NotFound root={params.name ? params.name as string : ''} />)} 
    </Fragment>
    );
}
export default WorkSpaceView;