import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import FloatingButtons from './components/FloatingButtons'
import Accueil from './pages/Accueil'
import Creations from './pages/Creations'
import Details from './pages/Details'
import Devis from './pages/Devis'
import APropos from './pages/APropos'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ListeProduits from './pages/ListeProduits'
import FormulaireProduit from './pages/FormulaireProduit'
import DetailsProduit from './pages/DetailsProduit'
import ListeCategories from './pages/ListeCategories'
import FormulaireCategorie from './pages/FormulaireCategorie'
import DetailsCategorie from './pages/DetailsCategorie'

function AppContent() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      {!isLogin && !isDashboard && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/creations" element={<Creations />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/produits" element={<ListeProduits />} />
          <Route path="/dashboard/produits/nouveau" element={<FormulaireProduit />} />
          <Route path="/dashboard/produits/edit/:id" element={<FormulaireProduit />} />
          <Route path="/dashboard/produits/:id" element={<DetailsProduit />} />
          <Route path="/dashboard/categories" element={<ListeCategories />} />
          <Route path="/dashboard/categories/nouvelle" element={<FormulaireCategorie />} />
          <Route path="/dashboard/categories/edit/:id" element={<FormulaireCategorie />} />
          <Route path="/dashboard/categories/:id" element={<DetailsCategorie />} />
        </Routes>
      </main>
      {!isLogin && !isDashboard && <Footer />}
      {!isLogin && !isDashboard && <FloatingButtons />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

