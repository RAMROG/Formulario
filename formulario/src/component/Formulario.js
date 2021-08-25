import React,{useState} from 'react';
import {Grid, Paper,Typography, Avatar,FormControl,InputLabel,Input,FormHelperText, Button} from '@material-ui/core';
import { database, storage,auth } from '../firebaseconf';

const Formulario=()=>{
    const paperStyle={padding: '30px 20px',width:700,margin:"20px auto",height:700}
    const padd={paddingLeft:'10px'}
    const [Imagen,setImagen]=useState('');
    const [ref, setRef] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [identidad, setIdentidad] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [email, setEmail] = useState('');
    const password="123456789";
    const [urlImagen,setUrlImagen]=useState('');

    const crearUsuario = async (e) => {
        e.preventDefault(); 
        if (email.trim() == "" || nombre.trim() == "" || apellido.trim() == ""  || nacimiento.trim()=='' || !Imagen || identidad.trim()=='') {
          alert("No puede dejar campos vacios");
         }else{
           if(nombre.length<=2 || apellido.length<=2 || !(identidad.length==13)){alert("el nombre y/o apellido deben tener una longitud minima de 3 caracteres y identidad debe tener 13 digitos")}else{
          await auth.createUserWithEmailAndPassword(email,password)
          .then(f=>{
            subirImagen();
          }  
          )
          .catch(e=>{
            if(e=="Error: The email address is already in use by another account."){
              alert("Usuario ya tiene una cuenta, registrada")
            }else{
              if(e=="Error: The email address is badly formatted."){
                alert("El email ingresado es incorrecto")
              }else{
                if(e=="Error: Password should be at least 6 characters"){
                  alert("Contraseña demasiado corta")
                }
              }
            }
          })
         }}
    };

    const subirImagen = async () => {
        try {

            const newRef = storage.ref('images').child(Imagen.name); // nombre del archivo
            setRef(newRef);
            await newRef.put(Imagen);
            let urlImagen = await newRef.getDownloadURL()
            setUrlImagen(urlImagen)
            console.log(urlImagen)
            const json_data = {
                nombre : nombre,
                apellido: apellido,
                identidad: identidad,
                nacimiento: nacimiento,
                urlImagen: urlImagen,
            };
            let use=auth.currentUser;

            await database.ref(`/${use.uid}/`).push(json_data)
            console.log(use.uid)
            
            use.sendEmailVerification()
            .then(f=>{
              alert("Revise su correo, se envio el enlace para que verifique");
              window.location='/login';
            })

        } catch (error) {
            console.log(error);
            alert(error);
        }
    };


    return(
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar></Avatar>
                    <h2>Formulario</h2>
                    <Typography variant='caption'>
                    </Typography>
                </Grid>
                <Grid align="center">
                    <FormControl>
                        <InputLabel>nombre</InputLabel>
                        <Input type="text" onChange={e=>{setNombre(e.target.value)}}></Input>
                        <FormHelperText>Primer nombre</FormHelperText>
                    </FormControl>
                    <FormControl style={padd}>
                        <InputLabel style={padd}> apellido</InputLabel>
                        <Input type="email" onChange={e=>{setApellido(e.target.value)}}></Input>
                        <FormHelperText>Primer Apellido</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid align="center">
                    <FormControl>
                        <InputLabel>identidad</InputLabel>
                        <Input type="number" onChange={e=>{setIdentidad(e.target.value)}}></Input>
                        <FormHelperText>formato(1318199700113)</FormHelperText>
                    </FormControl>
                    <FormControl style={padd}>
                        <InputLabel > </InputLabel>
                        <Input type="date" onChange={e=>{setNacimiento(e.target.value)}}></Input>
                        <FormHelperText>fecha de nacimiento</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid align="center">
                    <FormControl>
                        <InputLabel >correo</InputLabel>
                        <Input style={{width:'400px'}} type="email" onChange={e=>{setEmail(e.target.value)}}></Input>
                        <FormHelperText>correo electronico</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid align="center">
                <FormControl>
                        <InputLabel >imagen</InputLabel>
                        <Input style={{width:'400px'}} type="file" onChange={e=>{setImagen(e.target.files[0])}}></Input>
                        <FormHelperText>subir imagen</FormHelperText>
                    </FormControl> 
                </Grid>
                <Grid align="center">
                    <br></br><br></br>
                    <Button variant='contained' color='primary' onClick={crearUsuario}> Crear Cuenta</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Formulario;