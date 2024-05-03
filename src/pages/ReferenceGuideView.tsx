
import { Fragment, useEffect, useState } from "react";
import GenericPaper from "../common/Container/GenericPaper";
import { GenericFrame } from "../common/Frame/GenericFrame";
import Search from "../common/Search/Search";
import { BasicFrame } from "../common/Frame/BasicFrame";
import Progress from "../common/Progress/Progress";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGuideProject } from "../queries/useGuide";
import GuideList from "../components/Guide/GuideList";
import GuideInfo from "../components/Guide/GuideInfo";
import NotFound from "./NotFound";
import GuideDialog from "../components/Guide/GuideDialog";
import { useGenerateGuide } from "../queries/useProject";

const ReferenceGuideView: React.FC = () => {
    const params = useParams();
    const {isLoading: isLoadingGuide} = useGenerateGuide();
    const {isLoading, data, dataUpdatedAt} = useGuideProject(params.project as string, params.owner as string);
    const [searchTerm, setSearchTerm] = useState('');
    const [generation, setGeneration] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (!data?.is_Loading && !isLoadingGuide) {
            setGeneration(false);
        }
    }, [data?.is_Loading, isLoadingGuide]);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const handleSearch = (term: string) => {
        const searchTerm = term.trim().toLowerCase();
        setSearchTerm(searchTerm);
    };

    const handleSave = (data: string) => {
        console.log(data);
        setGeneration(true);
    };

    const is_valid_url = (params.project as string !== undefined && params.owner as string !== undefined);
    const root = params.project as string + '/' + params.name as string; 
    
    return (
        <Fragment>
            { isLoading ?
             (<GenericFrame>
                <Progress/> 
            </GenericFrame>)
            : data ? (
            <GenericFrame isCentered={false} className="items-start justify-center">
            <BasicFrame isCentered={false} className="mt-10" style={{flexDirection:'column'}}>
                <BasicFrame isCentered={false} className="items-center justify-between" style={{width: '100%', paddingBottom:'1.3em'}}>
                    <Typography style={{ fontSize: '1.3em'}}><span style={{fontWeight: 'bold'}}>{data.title}</span></Typography>
                    <Button disabled={data?.is_Loading || generation || isLoadingGuide} onClick={handleOpen} 
                        variant="contained" className="btn-generate" style={{backgroundColor: '#a5c96d', color: '#fff', padding:'0 1.5em', borderRadius: '0.3em', fontSize: '0.8em', width:'228px', height:'44px',}}>
                            {
                            (data?.is_Loading || generation || isLoadingGuide)?
                            (
                            <CircularProgress size={15} style={{color:'#fff'}}/>
                            ) 
                            : 'Create Reference Guide'}
                    </Button>
                </BasicFrame>
                <BasicFrame isCentered={false} className="card-container items-start justify-between">
                    <GenericPaper style={{height: '530px', width: '90vw', maxWidth: '860px'}}>
                        <Search searchTerm={searchTerm} onSearch={handleSearch}/>
                        <GenericPaper className="mt-4" style={{padding:'0.5em', height: '85%'}}>
                            <GuideList projects={data?.assets} name={searchTerm} guide={data}/>
                        </GenericPaper>
                    </GenericPaper>
                    <GuideInfo projects={data} updatedAt={dataUpdatedAt} loading={generation}/>
                </BasicFrame>
            </BasicFrame>
            </GenericFrame>
            ):(<NotFound root={is_valid_url ? root : ''} />)}
        <GuideDialog open={openDialog} onClose={handleClose} onSave={handleSave} initialData={data}/>
        </Fragment>
    );
}
export default ReferenceGuideView;