
import { useState } from "react";
import GenericPaper from "../common/Container/GenericPaper";
import { GenericFrame } from "../common/Frame/GenericFrame";
import Search from "../common/Search/Search";
import RepoList from "../components/Github/RepoList";
import { useGithubProjects, useGithubUser } from "../queries/useGithub";
import { UserGithub } from "../interfaces/github/user-github.interface";
import { ProjectGithub } from "../interfaces/github/projects-github.interface";
import { BasicFrame } from "../common/Frame/BasicFrame";
import Progress from "../common/Progress/Progress";
import { Box, IconButton, Typography } from "@mui/material";

import TuneIcon from '@mui/icons-material/Tune';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { updatePermission, userProfileUrl } from "../utils/github";

const ProjectView: React.FC = () => {
    const {isLoading: isLoadUser, data: user = {} as UserGithub } = useGithubUser();
    const {isLoading: isLoadProjects, data:projects = {} as ProjectGithub} = useGithubProjects();
    const [searchTerm, setSearchTerm] = useState('');

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
                            <Typography variant="body1" className="text-base font-normal">Connect a GitHub repository</Typography>
                            <Box className="flex items-center">
                                <Typography variant="caption" className="text-xl mr-1">Update Permissions</Typography>
                                <IconButton onClick={updatePermission} size="small" className="p-1">
                                    <TuneIcon style={{height:'0.7em', width:'0.7em'}}/>
                                </IconButton>
                            </Box>
                        </Box>
                        <Search searchTerm={searchTerm} onSearch={handleSearch}/>
                        <GenericPaper className="mt-4" style={{padding:'0.5em', height: '75%'}}>
                            {(isLoadUser || isLoadProjects) ? (
                                <Progress />
                            ):( 
                                <RepoList github={user} projects={projects} name={searchTerm}/>
                            )}
                        </GenericPaper>
                    </GenericPaper>

                    <BasicFrame isCentered={false} className="card-item items-start justify-center flex-col pl-6 ">
                        <Typography style={{fontSize: '1em', fontWeight: '400', display:'flex', alignItems:'center'}}>
                            <GitHubIcon style={{fontSize: '1.5em'}}/> &nbsp; GitHub
                        </Typography>

                        <a href={`${userProfileUrl(user)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#6c93f1' }}>
                            <Typography style={{ display:'flex', alignItems:'center', cursor: 'pointer',}}>
                                <PersonOutlineIcon style={{fontSize: '1.2em'}}/> @{user.login} <OpenInNewIcon style={{fontSize: '0.9em'}}/>
                            </Typography>
                        </a>
                        <span style={{color: '#111623', fontSize: '0.9em'}}>{projects.length} Repos</span>
                    </BasicFrame>
                </BasicFrame>

            </BasicFrame>
        </GenericFrame>
    );
}
export default ProjectView;