
import { useState } from "react";
import GenericPaper from "../common/Container/GenericPaper";
import { GenericFrame } from "../common/Frame/GenericFrame";
import Search from "../common/Search/Search";
import { BasicFrame } from "../common/Frame/BasicFrame";
import Progress from "../common/Progress/Progress";
import { Box, IconButton, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useProjects } from "../queries/useProject";
import ProjectList from "../components/Project/ProjectList";
import { Project } from "../interfaces/project/projects.interface";
import DialogProject from "../components/Project/ProjectDialog";

const ProjectView: React.FC = () => {
    const {isLoading, data = {} as Project} = useProjects(); 
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const handleSearch = (term: string) => {
        const searchTerm = term.trim().toLowerCase();
        setSearchTerm(searchTerm);
    };

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
                            <Box className="flex items-center">
                                <Typography variant="caption" className="text-xl mr-1">Add a workspace</Typography>
                                <IconButton onClick={handleOpen} size="small" className="p-1">
                                    <AddCircleIcon style={{height:'0.78em', width:'0.7em', color: '#1e2f50'}}/>
                                </IconButton>
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