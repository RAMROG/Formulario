import logo from './logo.svg';
import './App.css';
import Formulario from './component/Formulario';
import Login from './component/login';
import Principal from './component/Principal'
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Route exact path='/' component={Formulario}></Route>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/principal' component={Principal}></Route>
    </Router>
  );
}

export default App;
