
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { useEffect, useState } from "react";
import { validateEmail } from "../../utils/filtered";
import { Comments } from "../../interfaces/comment/comment.interface";
import { useComments, useCreateCommets } from "../../queries/useComment";

  
const ContactUs: React.FC = () => {
    const {isLoading: loadComments, data: commets} = useComments();
    const {mutate, isLoading, reset, data} = useCreateCommets();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (data) {
            reset();
        }
    }, [data, isLoading, reset])

    const validate = name !== '' && email !== ''&& !validateEmail(email) && description !== '';

    const handleSave = () => {
        const type_id = commets?.filter((item: Comments) => item.description === 'Other')[0];
        const info = email +' / '+ name + ', ' + description;
        if (validate && type_id) mutate({type_id: type_id?.id, title:'Contact Us', description: info});
        setName('');
        setEmail('');
        setDescription('');
      };

      

    return (
        <BasicFrame className="min-h-screen w-full" id="contact-us">
            <BasicFrame className="flex-col contactUs" style={{padding:'2em 6.5em' ,width:'600px', minHeight:'450px', backgroundColor:'#111623', borderRadius:'.5rem'}}>
                <span style={{fontSize:'1.7em', fontWeight:'700'}} className="text-white">Contact Us</span>
                <BasicFrame className='mb-3 w-full mt-6'>
                        <TextField 
                            type="text" 
                            inputProps={{style: {fontSize: 16}}} // font size of input text
                            fullWidth
                            className='input'
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    '&.Mui-focused': { color: '#E0E3E7' },
                                    color: '#E0E3E7', // Cambiar el color del label
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde
                                        color: '#E0E3E7'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde al hacer hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde al enfocar
                                    },
                                    color: '#E0E3E7'
                                },
                              }}
                        />
                    </BasicFrame>

                    <BasicFrame className='mb-3 w-full'>
                        <TextField 
                            type="email" 
                            inputProps={{style: {fontSize: 16}}} // font size of input text
                            fullWidth
                            className='input'
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    '&.Mui-focused': { color: '#E0E3E7' },
                                    color: '#E0E3E7', // Cambiar el color del label
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde
                                        color: '#E0E3E7'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde al hacer hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde al enfocar
                                    },
                                    color: '#E0E3E7'
                                },
                              }}
                        />
                    </BasicFrame>

                    <BasicFrame className="mb-3 w-full">
                        <TextField 
                            type="text" 
                            inputProps={{style: {fontSize: 16, fontWeight:'500'}}} // font size of input text
                            fullWidth
                            className='input'
                            label="Description"
                            multiline
                            rows={4} 
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    '&.Mui-focused': { color: '#E0E3E7' },
                                    color: '#E0E3E7', // Cambiar el color del label
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde
                                        color: '#E0E3E7'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde al hacer hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#E0E3E7', // Cambiar el color del borde al enfocar
                                    },
                                    color: '#E0E3E7'
                                },
                              }}
                        />
                    </BasicFrame>
                    <BasicFrame isCentered={false} className="w-full justify-end items-center">

                        <Button
                            disabled={!validate}
                            variant="contained"
                            onClick={()=> {handleSave()}}

                            sx={{
                                opacity: !validate ? 0.5 : 1, // Reduce la opacidad cuando no está seleccionado
                                '&:disabled': {
                                backgroundColor: 'grey', // Cambia el color de fondo cuando está deshabilitado
                                },
                            }}
                            style={{backgroundColor:'#f4f4f4', fontWeight:'500', color:'#10171e', fontSize:'0.8em', padding:'0.4em 2em',}}>
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {(loadComments || isLoading) && (
                                        <CircularProgress 
                                            size={24} 
                                            sx={{ color: '#10171e', position: 'absolute' }}
                                        />
                                    )}
                                    <span style={{ visibility: (loadComments || isLoading) ? 'hidden' : 'visible' }}>Send</span>
                                </Box>
                        </Button>
                    </BasicFrame>
            </BasicFrame>
        </BasicFrame>
    );
};

export default ContactUs;

/* 
visibility: loading ? 'hidden' : 'visible'
*/