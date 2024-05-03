
import { useState } from "react";
import GenericPaper from "../../../common/Container/GenericPaper";
import { GenericFrame } from "../../../common/Frame/GenericFrame";
import Search from "../../../common/Search/Search";
import RepoList from "../../../components/Github/RepoList";
import { useGithubProjects, useGithubUser } from "../../../queries/useGithub";
import { UserGithub } from "../../../interfaces/github/user-github.interface";
import { ProjectGithub } from "../../../interfaces/github/projects-github.interface";
import { BasicFrame } from "../../../common/Frame/BasicFrame";
import Progress from "../../../common/Progress/Progress";
import { Box, Button, Typography } from "@mui/material";

import TuneIcon from '@mui/icons-material/Tune';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { updatePermission, userProfileUrl } from "../../../utils/github";
import { convertTimestampToDate } from "../../../utils/filtered";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNotification } from "../../../hooks/useNotification";
import { useQueryClient } from "@tanstack/react-query";

const GithubView: React.FC = () => {
    const queryClient = useQueryClient();
    const {isLoading: isLoadUser, data: user = {} as UserGithub } = useGithubUser();
    const {isLoading: isLoadProjects, dataUpdatedAt , data:projects = {} as ProjectGithub} = useGithubProjects();
    const {getSuccess} = useNotification();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
        const searchTerm = term.trim().toLowerCase();
        setSearchTerm(searchTerm);
    };

    const handleRefresh = () => {
        queryClient.resetQueries(['github-projects']);
        getSuccess('Github repositories refreshed');
    }
    
    return (
        <GenericFrame isCentered={false} className="items-start justify-center">
            <BasicFrame isCentered={false} className="mt-10" style={{flexDirection:'column'}}>

                <BasicFrame isCentered={false} className="flex-col" style={{width: '90vw', maxWidth: '860px'}}>
                    <Typography style={{ fontSize: '1.3em'}}>Create a new <span style={{fontWeight: 'bold'}}>Reference Guide</span></Typography>
                    <Typography style={{ fontSize: '0.8em', paddingTop:'0.5em', paddingBottom:'1.5em'}}>Connect your Git repository or use an existing public repository URL.</Typography>
                </BasicFrame>

                <BasicFrame isCentered={false} className="card-container items-start justify-between">
                    <GenericPaper style={{height: '530px', width: '90vw', maxWidth: '860px'}}>
                        <Box className="mb-4 flex items-start place-content-between">
                            <Typography variant="body1" className="text-base font-normal">Connect a GitHub repository</Typography>
                            <Button onClick={() => handleRefresh()} className="flex items-center" style={{backgroundColor:'#fff', textTransform: 'none', padding:'0'}}>
                                    <Typography variant="caption" className="text-xl mr-1">Refresh</Typography>
                                    <RefreshIcon style={{height:'0.78em', width:'0.7em', color: '#1e2f50', marginLeft:'5px'}}/>
                            </Button>
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

                        <a href={`${userProfileUrl(user)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#6c93f1' , marginTop:'0.3em'}}>
                            <Typography style={{ display:'flex', alignItems:'center', cursor: 'pointer',}}>
                                <PersonOutlineIcon style={{fontSize: '1.2em'}}/> @{user.login} <OpenInNewIcon style={{fontSize: '0.9em'}}/>
                            </Typography>
                        </a>
                        <span style={{color: '#111623', fontSize: '0.9em'}}>{projects.length} Repos</span>
                        <Typography style={{fontSize: '1em', fontWeight: '400', display:'flex', alignItems:'center', marginTop:'0.3em'}}>
                            Updated at: {convertTimestampToDate(dataUpdatedAt)}
                        </Typography>
                        <Button onClick={updatePermission} className="flex items-center" style={{padding:'0', backgroundColor:'#fff', textTransform: 'none', marginBottom:'1em', marginTop:'0.5em'}}>
                            <TuneIcon style={{height:'0.9em', width:'0.7em', marginRight:'0.3em'}}/>
                            <Typography variant="caption" style={{fontSize: '1em'}}>Update Permissions</Typography>
                        </Button>
                    </BasicFrame>
                </BasicFrame>

            </BasicFrame>
        </GenericFrame>
    );
}
export default GithubView;