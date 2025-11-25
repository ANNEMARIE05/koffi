import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa'
import { getCategories, deleteCategory } from '../utils/dataManager'
import DashboardLayout from '../components/DashboardLayout'
import Pagination from '../components/Pagination'

const ListeCategories = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // 3 colonnes x 3 lignes

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    const allCategories = getCategories()
    setCategories(allCategories)
  }

  const handleDelete = (id, nom) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${nom}" ?`)) {
      deleteCategory(id)
      loadCategories()
    }
  }

  const handleView = (id) => {
    navigate(`/dashboard/categories/${id}`)
  }

  const handleEdit = (id) => {
    navigate(`/dashboard/categories/edit/${id}`)
  }

  const handleAdd = () => {
    navigate('/dashboard/categories/nouvelle')
  }

  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [categories, searchTerm])

  // Réinitialiser à la page 1 quand le filtre change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Calculer les catégories paginées
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-marron-800">Gestion des Catégories</h1>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-marron-600 hover:bg-marron-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            <FaPlus />
            <span>Ajouter une catégorie</span>
          </button>
        </div>
      </div>

        {/* Recherche */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Liste des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">Aucune catégorie trouvée</p>
            </div>
          ) : (
            paginatedCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-marron-800 mb-2">
                    {category.nom}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {category.description || 'Aucune description'}
                  </p>
                </div>
                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleView(category.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Voir les détails"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id, category.nom)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      {/* Pagination */}
      {filteredCategories.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filteredCategories.length}
        />
      )}

      {/* Statistiques */}
      <div className="mt-4 text-sm text-gray-600">
        Total: {filteredCategories.length} catégorie(s)
      </div>
    </DashboardLayout>
  )
}

export default ListeCategories

