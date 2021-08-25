import React,{useState,useEffect} from 'react';
import {Grid, Paper,Typography, Avatar,FormControl,InputLabel,Input,FormHelperText, Button} from '@material-ui/core';
import { database, storage,auth } from '../firebaseconf';

const Principal=()=>{
    const paperStyle={padding: '30px 20px',width:700,margin:"20px auto",height:800}
    const padd={paddingLeft:'10px'}
    const [Imagen,setImagen]=useState();
    const [ref, setRef] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [identidad, setIdentidad] = useState(0);
    const [nacimiento, setNacimiento] = useState('');
    const [email, setEmail] = useState('');
    const password="123456789";
    const [urlImagen,setUrlImagen]=useState();

    const obtenerInformacion = async () => {
        await auth.onAuthStateChanged((z)=>{if(z){
            const data= async()=>{
                await database.ref(`/${z.uid}/`).on('value',(e)=>{
                setEmail(z.email)
                const todo=[];
                const todos=e.val();
                for(let id in  todos){
                    setNombre(todos[id].nombre)
                    setApellido(todos[id].apellido)
                    setIdentidad(todos[id].identidad)
                    setNacimiento(todos[id].nacimiento)
                    setUrlImagen(todos[id].urlImagen)
                    
                }
                console.log(z.uid)
            })}
            data();
        }else{
            alert("error")
        }})
            };


    const cerrarSesion = () => {
        try{
            auth.signOut().then(()=>{window.location='/';}).catch(e=>{console.log(e)})
            }catch(e){
            console.log(e)
            }
        };        

    

  
    useEffect(() => {
        obtenerInformacion();
    }, [])


    return(
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar></Avatar>
                    <h2>Informacion Proporcionada</h2>
                    <Typography variant='caption'>
                    </Typography>
                </Grid>
                <Grid align="center">
                    <FormControl>
                        <Input type="text" value={nombre} disabled></Input>
                        <FormHelperText>Primer nombre</FormHelperText>
                    </FormControl>
                    <FormControl style={padd}>
                        <Input type="text" value={apellido} disabled ></Input>
                        <FormHelperText>Primer Apellido</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid align="center">
                    <FormControl>
                         <InputLabel > </InputLabel>
                        <Input type="number" value={identidad} disabled></Input>
                        <FormHelperText>numero de Identidad</FormHelperText>
                    </FormControl>
                    <FormControl style={padd}>
                        <InputLabel > </InputLabel>
                        <Input type="date" value={nacimiento} disabled></Input>
                        <FormHelperText>fecha de nacimiento</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid align="center">
                    <FormControl>
                        <Input style={{width:'400px'}} type="email" value={email} disabled></Input>
                        <FormHelperText>correo electronico</FormHelperText>
                    </FormControl>
                </Grid>
                <br></br><br></br>
                <Grid align="center">
                    <h3>Imagen agregada</h3>
                   <img src={urlImagen} width="400" height="341"/>
                </Grid>
                <Grid align="center">
                    <br></br><br></br>
                    <Button variant='contained' color='primary' onClick={cerrarSesion}> salir</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Principal;