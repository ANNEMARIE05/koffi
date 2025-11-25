import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa'
import { getProducts, deleteProduct } from '../utils/dataManager'
import DashboardLayout from '../components/DashboardLayout'
import Pagination from '../components/Pagination'

const ListeProduits = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = () => {
    const allProducts = getProducts()
    setProducts(allProducts)
  }

  const loadCategories = () => {
    const allProducts = getProducts()
    const uniqueCategories = [...new Set(allProducts.map(p => p.categorie).filter(Boolean))]
    setCategories(uniqueCategories)
  }

  const handleDelete = (id, titre) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le produit "${titre}" ?`)) {
      deleteProduct(id)
      loadProducts()
    }
  }

  const handleView = (id) => {
    navigate(`/dashboard/produits/${id}`)
  }

  const handleEdit = (id) => {
    navigate(`/dashboard/produits/edit/${id}`)
  }

  const handleAdd = () => {
    navigate('/dashboard/produits/nouveau')
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !filterCategory || product.categorie === filterCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, filterCategory])

  // Réinitialiser à la page 1 quand les filtres changent
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterCategory])

  // Calculer les produits paginés
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-marron-800">Gestion des Produits</h1>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-marron-600 hover:bg-marron-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            <FaPlus />
            <span>Ajouter un produit</span>
          </button>
        </div>
      </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Liste des produits */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg">Aucun produit trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-marron-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Image</th>
                    <th className="px-6 py-4 text-left">Titre</th>
                    <th className="px-6 py-4 text-left">Catégorie</th>
                    <th className="px-6 py-4 text-left">Prix</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={product.image || 'https://via.placeholder.com/80'}
                          alt={product.titre}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{product.titre}</div>
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-md">
                          {product.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-marron-100 text-marron-800 px-3 py-1 rounded-full text-sm">
                          {product.categorie || 'Non catégorisé'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-semibold">
                        {product.prix || 'Non spécifié'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleView(product.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir les détails"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.titre)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filteredProducts.length}
        />
      )}

      {/* Statistiques */}
      <div className="mt-4 text-sm text-gray-600">
        Total: {filteredProducts.length} produit(s)
      </div>
    </DashboardLayout>
  )
}

export default ListeProduits

