
import { useState } from "react";
import GenericPaper from "../../common/Container/GenericPaper";
import { GenericFrame } from "../../common/Frame/GenericFrame";
import Search from "../../common/Search/Search";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import Progress from "../../common/Progress/Progress";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useProjects } from "../../queries/useProject";
import ProjectList from "../../components/Project/ProjectList";
import { Project } from "../../interfaces/project/projects.interface";
import DialogProject from "../../components/Project/ProjectDialog";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNotification } from "../../hooks/useNotification";
import { useQueryClient } from "@tanstack/react-query";

const ProjectView: React.FC = () => {
    const queryClient = useQueryClient(); 
    const {isLoading, data = {} as Project} = useProjects(); 
    const [searchTerm, setSearchTerm] = useState('');
    const {getSuccess} = useNotification();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const handleSearch = (term: string) => {
        const searchTerm = term.trim().toLowerCase();
        setSearchTerm(searchTerm);
    };

    const handleRefresh = () => {
        queryClient.resetQueries(['projects-repo']);
        getSuccess('Projects refreshed');
    }

    return (
        <GenericFrame isCentered={false} className="items-start justify-center">
            <BasicFrame isCentered={false} className="mt-10" style={{flexDirection:'column'}}>

                <BasicFrame isCentered={false} className="flex-col" style={{width: '90vw', maxWidth: '860px'}}>
                    <Typography style={{ fontSize: '1.3em'}}>My <span style={{fontWeight: 'bold'}}>Workspaces</span></Typography>
                    <Typography style={{ fontSize: '0.8em', paddingTop:'0.5em', paddingBottom:'1.5em'}}>Explore your personal workspaces and collaborative projects in this section</Typography>
                </BasicFrame>

                <BasicFrame isCentered={false} className="card-container items-start justify-between">
                    <GenericPaper style={{height: '530px', width: '90vw', maxWidth: '860px'}}>
                        <Box className="mb-4 flex items-start place-content-between">
                            <Typography variant="body1" className="text-base font-normal">Workspaces created</Typography>
                            <Box  className="flex">
                                <Button onClick={() => handleRefresh()} className="flex items-center" style={{backgroundColor:'#fff', textTransform: 'none', padding:'0'}}>
                                    <Typography variant="caption" className="mr-1">Refresh</Typography>
                                    <RefreshIcon style={{height:'0.78em', width:'0.7em', color: '#1e2f50', marginLeft:'5px'}}/>
                                </Button>

                                <Button onClick={handleOpen} className="flex items-center ml-10" style={{backgroundColor:'#fff', textTransform: 'none', padding:'0', marginLeft:'10px'}}>
                                    <Typography variant="caption" className="mr-1">Add a workspace</Typography>
                                    <AddCircleIcon style={{height:'0.78em', width:'0.7em', color: '#1e2f50', marginLeft:'8px'}}/>
                                </Button>
                            </Box>
                        </Box>
                        <Search searchTerm={searchTerm} onSearch={handleSearch}/>
                        <GenericPaper className="mt-4" style={{padding:'0.5em', height: '75%'}}>
                            {(isLoading) ? (
                                <Progress />
                            ):( 
                                <ProjectList projects={data} name={searchTerm}/>
                            )}
                        </GenericPaper>
                    </GenericPaper>
                </BasicFrame>
            </BasicFrame>
            <DialogProject open={openDialog} onClose={handleClose} />
        </GenericFrame>
    );
}
export default ProjectView;