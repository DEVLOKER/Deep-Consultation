import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from 'pages/Home'
import { AdminConsultations } from 'pages/AdminConsultations'
import { AdminAccounts } from 'pages/AdminAccounts'
import { ClientConsultations } from 'pages/ClientConsultations'

const App = ()=> {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/admin/consultations" element={<AdminConsultations />}/>
          <Route exact path="/admin/comptes" element={<AdminAccounts />}/>
          <Route exact path="/client/consultations" element={<ClientConsultations />}/>
        </Routes>
      </Router>
    </>
    
  );
}

export default App