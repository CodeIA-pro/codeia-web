import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Fragment } from 'react';
import { BasicFrame } from '../../common/Frame/BasicFrame';

interface GuideThemeProps {
    value: string;
    changeTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GuideTheme: React.FC<GuideThemeProps> = ({value, changeTheme}) => {
   return (
         <Fragment>
              <BasicFrame isCentered={false} className="w-full p-1 flex-col mt-5">
              <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={value}
                        onChange={changeTheme}
                    >
                        <FormControlLabel value="Classic" control={<Radio size='small'/>} label={
                            <BasicFrame>
                                <Typography style={{paddingRight: '1em', fontSize:'0.7em'}}>Classic</Typography>
                                <BasicFrame isCentered={false} style={{ border: '1px solid rgba(27, 36, 45, 0.3)', borderRadius: '0.5em', height:'80px', width:'100px'}}>
                                    <div style={{width:'50%', height:'100%', backgroundColor:'#517DAF',borderRadius: '0.5em 0 0 0.5em'}}/>
                                    <div style={{width:'50%', height:'100%', backgroundColor:'#F8F8F2',borderRadius: '0 0.5em 0.5em 0'}}/>
                                </BasicFrame>
                            </BasicFrame>
                        } />
                        <FormControlLabel value="Dark" control={<Radio size='small'/>} className='mt-3' label={
                            <BasicFrame>
                                <Typography style={{paddingRight: '1.9em', fontSize:'0.7em'}}>Dark</Typography>
                                <BasicFrame isCentered={false} style={{ border: '1px solid rgba(27, 36, 45, 0.3)', borderRadius: '0.5em', height:'80px', width:'100px'}}>
                                    <div style={{width:'50%', height:'100%', backgroundColor:'#517DAF',borderRadius: '0.5em 0 0 0.5em'}}/>
                                    <div style={{width:'50%', height:'100%', backgroundColor:'#262626',borderRadius: '0 0.5em 0.5em 0'}}/>
                                </BasicFrame>
                            </BasicFrame>
                        } />
                    </RadioGroup>
                </FormControl>
            </BasicFrame>
        </Fragment>
    );
};

export default GuideTheme;

/* 
                        <FormControlLabel value="Classic" control={<Radio size='small'/>} label={
                            <BasicFrame>
                                <Typography style={{paddingRight: '1em', fontSize:'0.7em'}}>Classic</Typography>
                                <BasicFrame isCentered={false} style={{ border: '1px solid rgba(27, 36, 45, 0.3)', borderRadius: '0.5em', height:'80px', width:'100px'}}>
                                    <div style={{width:'50%', height:'100%',}} className='flex flex-col'>
                                        <div style={{width:'100%', height:'50%', backgroundColor:'#517DAF',borderRadius: '0.5em 0 0 0'}}/>
                                        <div style={{width:'100%', height:'50%', backgroundColor:'#333131',borderRadius: '0 0 0 0.5em'}}/>
                                    </div>
                                    <div style={{width:'50%', height:'100%', backgroundColor:'#F8F8F2',borderRadius: '0 0.5em 0.5em 0'}}/>
                                </BasicFrame>
                            </BasicFrame>
                        } />
                        <FormControlLabel value="Dark" control={<Radio size='small'/>} className='mt-3' label={
                            <BasicFrame>
                                <Typography style={{paddingRight: '1.9em', fontSize:'0.7em'}}>Dark</Typography>
                                <BasicFrame isCentered={false} style={{ border: '1px solid rgba(27, 36, 45, 0.3)', borderRadius: '0.5em', height:'80px', width:'100px'}}>
                                <div style={{width:'50%', height:'100%',}} className='flex flex-col'>
                                        <div style={{width:'100%', height:'50%', backgroundColor:'#517DAF',borderRadius: '0.5em 0 0 0'}}/>
                                        <div style={{width:'100%', height:'50%', backgroundColor:'#333131',borderRadius: '0 0 0 0.5em'}}/>
                                    </div>
                                    <div style={{width:'50%', height:'100%', backgroundColor:'#262626',borderRadius: '0 0.5em 0.5em 0'}}/>
                                </BasicFrame>
                            </BasicFrame>
                        } />
*/