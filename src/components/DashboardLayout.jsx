import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaSignOutAlt, FaChartBar, FaBox, FaUser, FaBars, FaTimes, FaTags, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdCarpenter } from 'react-icons/md'

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Pour mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false) // Pour desktop (plié/déplié)

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userNumero')
    navigate('/login')
  }

  const handleProfil = () => {
    setDropdownOpen(false)
    // TODO: Naviguer vers la page profil
  }

  // Déterminer quelle page est active pour la sidebar
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixe et pleine hauteur */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'} bg-gradient-to-b from-marron-900 via-marron-800 to-marron-900 text-white transition-all duration-300 overflow-hidden fixed left-0 top-0 h-screen z-40`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center ${sidebarCollapsed ? 'md:justify-center' : 'space-x-3'}`}>
              <MdCarpenter className="text-3xl text-marron-300 flex-shrink-0" />
              <h2 className={`text-xl font-bold whitespace-nowrap ${sidebarCollapsed ? 'md:hidden' : ''}`}>Menuiserie Koffi</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:text-marron-200"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Bouton pour plier/déplier sur desktop */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex absolute top-4 -right-3 bg-marron-700 hover:bg-marron-600 text-white p-2 rounded-full z-50 shadow-lg transition-all duration-300"
          >
            {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
          
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => navigate('/dashboard')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'md:justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                isActive('/dashboard') && location.pathname === '/dashboard'
                  ? 'bg-marron-700 hover:bg-marron-600'
                  : 'hover:bg-marron-700'
              }`}
              title={sidebarCollapsed ? 'Dashboard' : ''}
            >
              <FaChartBar className="flex-shrink-0" />
              <span className={sidebarCollapsed ? 'md:hidden' : ''}>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/dashboard/produits')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'md:justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                isActive('/dashboard/produits')
                  ? 'bg-marron-700 hover:bg-marron-600'
                  : 'hover:bg-marron-700'
              }`}
              title={sidebarCollapsed ? 'Gestions produits' : ''}
            >
              <FaBox className="flex-shrink-0" />
              <span className={sidebarCollapsed ? 'md:hidden' : ''}>Gestions produits</span>
            </button>
            <button
              onClick={() => navigate('/dashboard/categories')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'md:justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                isActive('/dashboard/categories')
                  ? 'bg-marron-700 hover:bg-marron-600'
                  : 'hover:bg-marron-700'
              }`}
              title={sidebarCollapsed ? 'Catégorie' : ''}
            >
              <FaTags className="flex-shrink-0" />
              <span className={sidebarCollapsed ? 'md:hidden' : ''}>Catégorie</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        {/* Header du Dashboard - Fixe */}
        <header className={`bg-marron-800 text-white shadow-lg fixed top-0 z-30 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-0'} ${sidebarCollapsed ? 'md:left-20' : 'md:left-64'} right-0`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:text-marron-200 transition-colors md:hidden"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              
              <div className="flex-1"></div>
              
              {/* Dropdown utilisateur */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-marron-700 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <div className="bg-marron-600 p-2 rounded-full">
                    <FaUser className="text-lg" />
                  </div>
                  <span className="hidden md:block">Hello Koffi</span>
                </button>
                
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                      <button
                        onClick={handleProfil}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <FaUser />
                        <span>Profil</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <FaSignOutAlt />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="container mx-auto px-4 py-8 mt-16">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

