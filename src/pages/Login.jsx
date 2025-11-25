import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPhone, FaLock, FaSignInAlt, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'
import { MdCarpenter } from 'react-icons/md'

const Login = () => {
  const [formData, setFormData] = useState({
    numero: '',
    password: '',
  })
  const [erreur, setErreur] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setErreur('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')
    setIsLoading(true)

    // Validation basique
    if (!formData.numero || !formData.password) {
      setErreur('Veuillez remplir tous les champs')
      setIsLoading(false)
      return
    }

    // Simuler un délai de connexion (pour voir le loader)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Ici, vous pouvez ajouter une vérification avec une API
    // Pour l'instant, on simule une connexion réussie
    // Vous pouvez changer ces identifiants par défaut
    const numeroValide = '0707857252'
    const passwordValide = 'admin123'

    if (formData.numero === numeroValide && formData.password === passwordValide) {
      // Stocker l'état de connexion
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userNumero', formData.numero)
      
      // Rediriger vers le dashboard
      navigate('/dashboard')
    } else {
      setErreur('Numéro de téléphone ou mot de passe incorrect')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marron-50 to-marron-100">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Bouton retour */}
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center space-x-2 text-marron-700 hover:text-marron-800 transition-colors duration-300"
          >
            <FaArrowLeft />
            <span>Retour à l'accueil</span>
          </button>

          {/* Carte de connexion */}
          <div className="bg-white rounded-lg shadow-2xl p-8">
            {/* Logo et titre */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <MdCarpenter className="text-5xl text-marron-600" />
              </div>
              <h1 className="text-3xl font-bold text-marron-800 mb-2">Menuiserie Koffi</h1>
              <p className="text-gray-600">Connexion à votre espace</p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Message d'erreur */}
              {erreur && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {erreur}
                </div>
              )}

              {/* Champ Numéro */}
              <div>
                <label htmlFor="numero" className="block text-gray-700 font-semibold mb-2">
                  <FaPhone className="inline mr-2 text-marron-600" />
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-600 focus:border-transparent transition-all duration-300"
                  placeholder="0707857252"
                />
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  <FaLock className="inline mr-2 text-marron-600" />
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-600 focus:border-transparent transition-all duration-300"
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-marron-600 transition-colors duration-300"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-marron-600 hover:bg-marron-700 disabled:bg-marron-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-scale flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Connexion...</span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    <span>Se connecter</span>
                  </>
                )}
              </button>
            </form>

            {/* Note d'information */}
            <div className="mt-6 p-4 bg-marron-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Identifiants par défaut: <br />
                Numéro: 0707857252 <br />
                Mot de passe: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

