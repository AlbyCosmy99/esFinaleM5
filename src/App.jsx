import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './components/MyNav/MyNav';
import MyFooter from './components/MyFooter/MyFooter';
import Welcome from './components/Welcome/Welcome';
import AllTheBooks from './components/AllTheBooks/AllTheBooks';
import { useState } from 'react';
import AppContext from './Contexts/AppContext.jsx'
import { Button } from 'react-bootstrap';

function App() {

  const [filter, setFilter] = useState(null)
  const themes = ['light','dark']
  const [theme,setTheme] = useState(themes[0])

  return (
    <AppContext.Provider value={{filter,setFilter,theme}}>
      <div className="app-container">
        <MyNav/>
        <Welcome/>
        <Button style={{margin: '1rem', marginTop: '0.2rem'}} onClick={() => setTheme(theme === themes[0] ? themes[1] : themes[0])}>Change navBar theme</Button>

        <AllTheBooks filter={filter}/>

        <div className="footer-container">
          <MyFooter name="Albu Cosmin Andrei" />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
