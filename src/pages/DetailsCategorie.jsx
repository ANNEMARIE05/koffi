import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaBox, FaArrowLeft, FaChevronRight, FaHome } from 'react-icons/fa'
import { getCategoryById, getProducts } from '../utils/dataManager'
import DashboardLayout from '../components/DashboardLayout'
import Pagination from '../components/Pagination'

const DetailsCategorie = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // 3 colonnes x 3 lignes

  useEffect(() => {
    const categoryData = getCategoryById(id)
    if (categoryData) {
      setCategory(categoryData)
      // Charger les produits de cette catégorie
      const allProducts = getProducts()
      const categoryProducts = allProducts.filter(p => p.categorie === categoryData.nom)
      setProducts(categoryProducts)
      setCurrentPage(1) // Réinitialiser la page quand la catégorie change
    } else {
      alert('Catégorie non trouvée')
      navigate('/dashboard/categories')
    }
  }, [id, navigate])
  
  // Calculer les produits paginés
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = products.slice(startIndex, endIndex)
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }


  if (!category) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
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
              {category.nom}
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
          <h1 className="text-3xl font-bold text-marron-800">Détails de la catégorie</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-marron-800 mb-4">{category.nom}</h2>
          <p className="text-gray-700 mb-4">
            {category.description || 'Aucune description disponible'}
          </p>
        </div>

        {/* Produits de cette catégorie */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-marron-800 flex items-center space-x-2">
              <FaBox />
              <span>Produits dans cette catégorie ({products.length})</span>
            </h3>
          </div>
          
          {products.length === 0 ? (
            <p className="text-gray-600">Aucun produit dans cette catégorie</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/dashboard/produits/${product.id}`)}
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.titre}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  <h4 className="font-semibold text-gray-800">{product.titre}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </div>
              ))}
              </div>
              
              {/* Pagination */}
              {products.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={products.length}
                />
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DetailsCategorie

