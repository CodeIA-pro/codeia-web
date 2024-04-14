import { useState } from "react";
import { BasicFrame } from "../common/Frame/BasicFrame";
import { GenericFrame } from "../common/Frame/GenericFrame";
import { Box, Button, CircularProgress, Container, FormControlLabel, Paper, Radio } from "@mui/material";
import { loginWithGithub } from "../utils/github";

const ConnectionView: React.FC = () => {
    const [selected, setSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    
    const handleChange = (event: any) => {
        setSelected((prevSelected) =>
            event.target.value === prevSelected ? '' : event.target.value
          );
      };

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }
      
  return (
    <GenericFrame className="flex-col">
        <BasicFrame className="flex-col" style={{width: '90vw', maxWidth: '850px'}}>
            <span className="text-center text-2xl">
                Create a new <span className="font-bold text-2xl">Reference Guide</span>
            </span>
            <span className="text-center text-sm pt-1">Connect a Git repository</span>
            <Container className="flex flex-col items-start pt-4">
            <span className="text-left text-lg pt-1 pb-3">
                How would you like to implement your documentation?
            </span>
            <Paper className="border border-black w-full p-6 mt-3" style={{borderRadius:'0.5em'}}>
                <FormControlLabel
                control={
                    <Radio
                    checked={selected}
                    onChange={handleChange}
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                    sx={{
                        '& .MuiSvgIcon-root': {
                        fontSize: '1.2em',
                        },
                    }}
                    />
                }
                label="Creating Documentation from a Git Repository"
                />
                <p className="text-left text-sm pl-9">Connect a GitHub repository.</p>
            </Paper>
            </Container>
            <BasicFrame isCentered={false} className="items-end justify-end pt-3 w-full px-6">
            <Button
                disabled={!selected}
                variant="contained"
                onClick={()=> {loginWithGithub(); handleClick();}}
            >
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isLoading && (
                        <CircularProgress 
                            size={24} 
                            sx={{ color: 'white', position: 'absolute' }}
                        />
                    )}
                    <span style={{ visibility: isLoading ? 'hidden' : 'visible' }}>Connect</span>
                </Box>
            </Button>
            </BasicFrame>
        </BasicFrame>
    </GenericFrame>
  );
};

export default ConnectionView;