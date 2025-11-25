import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaChevronRight, FaHome } from 'react-icons/fa'
import { getCategoryById, addCategory, updateCategory } from '../utils/dataManager'
import DashboardLayout from '../components/DashboardLayout'

const FormulaireCategorie = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = id && id !== 'nouvelle'
  
  const [formData, setFormData] = useState({
    nom: '',
    description: ''
  })
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Si édition, charger la catégorie
    if (isEdit) {
      const category = getCategoryById(id)
      if (category) {
        setFormData({
          nom: category.nom || '',
          description: category.description || ''
        })
      } else {
        alert('Catégorie non trouvée')
        navigate('/dashboard/categories')
      }
    }
  }, [id, isEdit, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit) {
        updateCategory(id, formData)
        alert('Catégorie modifiée avec succès!')
      } else {
        addCategory(formData)
        alert('Catégorie ajoutée avec succès!')
      }
      navigate('/dashboard/categories')
    } catch (error) {
      alert('Une erreur est survenue')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb avec bouton retour */}
        <nav className="mb-6 flex items-center justify-between" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center hover:text-marron-600 transition-colors"
              >
                <FaHome className="mr-1" />
                Dashboard
              </button>
            </li>
            <li>
              <FaChevronRight className="text-gray-400" />
            </li>
            <li>
              <button
                onClick={() => navigate('/dashboard/categories')}
                className="hover:text-marron-600 transition-colors"
              >
                Catégories
              </button>
            </li>
            <li>
              <FaChevronRight className="text-gray-400" />
            </li>
            <li className="text-marron-800 font-semibold truncate max-w-xs">
              {isEdit ? (formData.nom || 'Modifier la catégorie') : 'Ajouter une catégorie'}
            </li>
          </ol>
          <button
            onClick={() => navigate('/dashboard/categories')}
            className="flex items-center space-x-2 text-marron-600 hover:text-marron-700 transition-colors font-medium"
          >
            <FaArrowLeft />
            <span>Retour à la liste</span>
          </button>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-marron-800">
            {isEdit ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie'}
          </h1>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Ex: Mobilier, Portes, Fenêtres..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Description de la catégorie..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
            />
          </div>

          {/* Boutons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-marron-600 hover:bg-marron-700 text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              <FaSave />
              <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/categories')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default FormulaireCategorie

