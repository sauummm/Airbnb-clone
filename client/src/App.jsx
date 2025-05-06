import { Route, Routes } from 'react-router-dom'
import IndexPage from './Pages/IndexPage.jsx'
import './App.css'
import LoginPage from './Pages/LoginPage.jsx';
import Layout from './Layout.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';
import AccountPage from './Pages/AccountPage.jsx';
import {Link,Navigate} from 'react-router-dom'; 

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element= {<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/account/:subpage?' element= {<AccountPage />} />

      
      </Route>
      
    </Routes>
    </UserContextProvider> 
  );
}

export default App;