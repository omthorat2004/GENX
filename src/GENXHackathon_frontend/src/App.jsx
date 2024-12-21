// import { useState } from 'react';
// import { GENXHackathon_backend } from 'declarations/GENXHackathon_backend';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BillUploadForm from './pages/BillUploadForm';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import OwnerBill from './pages/OwnerBill';
import OwnerPending from './pages/OwnerPending';
import OwnerRegister from './pages/OwnerRegister';
import UserBills from './pages/UserBills';
import UserHome from './pages/UserHome';
import UserPending from './pages/UserPending';
import UserRegister from './pages/UserRegister';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/ownerRegister' element={<OwnerRegister/>}/>
        <Route path='/userRegister' element={<UserRegister/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user' element={<UserHome/>}/>
        <Route path='/user/my-bills' element={<UserBills/>}/>
        <Route path='/user/pending-bills' element={<UserPending/>}/>
        <Route path='/user/create' element={<BillUploadForm/>}/>
        <Route path='/owner' element={<OwnerBill/>}/>
        <Route path='/owner/pending-bills' element={<OwnerPending/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
