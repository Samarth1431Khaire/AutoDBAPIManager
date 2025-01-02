import './App.css';
import Login from './components/Login/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import UTable from './components/Dashboard/Create/Table/UTable';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/table'>
            <UTable />
          </Route>
        </Switch>
      </div>
    </Router>    
  );
}

export default App;
