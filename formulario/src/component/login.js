import React,{useState} from 'react';
import {Grid, Paper,Typography, Avatar,FormControl,InputLabel,Input,FormHelperText, Button} from '@material-ui/core';
import { database, storage,auth } from '../firebaseconf';

const Login=()=>{
    const paperStyle={padding: '30px 20px',width:700,margin:"20px auto",height:700}
    const [email, setEmail] = useState('');
    const password="123456789";
    const [verifica,setVerifica]=useState()

    const Login = async (e) => {
        e.preventDefault();  
        if (email.trim() == "") {
            alert("No puede dejar campos vacios");
        }
        else{
        await auth.signInWithEmailAndPassword(email,password)
         .then(e=>{
           auth.onAuthStateChanged((user)=>{
              setVerifica (user.emailVerified);
              if(user.emailVerified){
                console.log("usuario verificado")
                window.location='/principal';
              }else{
                alert('su cuenta no esta verificada, revise su correo electronico')
              }
           })
        })
        .catch((error)=>{
          if(error=="Error: The password is invalid or the user does not have a password."){
            alert('Usuario y/o contraseña incorrectas, verifique su informacion')
          }else{
            if(error.message=="There is no user record corresponding to this identifier. The user may have been deleted."){
              alert("Este correo no tiene cuenta en nuestra plataforma")
            }else{if(error.message=="The email address is badly formatted."){
              alert("La informacion ingresada en el correo electronico es invalido")
            }else{
              if(error.message=="A network error (such as timeout, interrupted connection or unreachable host) has occurred."){
                alert("Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible)")
              }
            }}
            console.log(error)
          }
        })
    };
  }

   


    return(
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar></Avatar>
                    <h2>Login</h2>
                    <Typography variant='caption'>
                    </Typography>
                </Grid>
                <Grid align='center'>
                    <FormControl>
                        <InputLabel >correo</InputLabel>
                        <Input style={{width:'400px'}} type="email" onChange={e=>{setEmail(e.target.value)}}></Input>
                        <FormHelperText>correo electronico</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid align="center">
                    <br></br><br></br>
                    <Button variant='contained' color='primary' onClick={Login}> Iniciar Sesion</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login;