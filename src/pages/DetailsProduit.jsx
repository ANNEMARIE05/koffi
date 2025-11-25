import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaChevronRight, FaHome } from 'react-icons/fa'
import { getProductById } from '../utils/dataManager'
import DashboardLayout from '../components/DashboardLayout'

const DetailsProduit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [imageSelectionnee, setImageSelectionnee] = useState(0)

  useEffect(() => {
    const productData = getProductById(id)
    if (productData) {
      setProduct(productData)
    } else {
      alert('Produit non trouvé')
      navigate('/dashboard/produits')
    }
  }, [id, navigate])


  if (!product) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </DashboardLayout>
    )
  }

  // Récupérer toutes les images
  const toutesLesImages = product.imagesDetail 
    ? [product.image, ...product.imagesDetail].filter(Boolean)
    : product.image 
    ? [product.image]
    : []
  
  const imageActuelle = toutesLesImages[imageSelectionnee] || toutesLesImages[0] || ''

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
                onClick={() => navigate('/dashboard/produits')}
                className="hover:text-marron-600 transition-colors"
              >
                Produits
              </button>
            </li>
            <li>
              <FaChevronRight className="text-gray-400" />
            </li>
            <li className="text-marron-800 font-semibold truncate max-w-xs">
              {product.titre}
            </li>
          </ol>
          <button
            onClick={() => navigate('/dashboard/produits')}
            className="flex items-center space-x-2 text-marron-600 hover:text-marron-700 transition-colors font-medium"
          >
            <FaArrowLeft />
            <span>Retour à la liste</span>
          </button>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-marron-800">Détails du produit</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              {imageActuelle && (
                <div className="rounded-lg overflow-hidden shadow-lg mb-4">
                  <img
                    src={imageActuelle}
                    alt={product.titre}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}
              
              {toutesLesImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {toutesLesImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setImageSelectionnee(index)}
                      className={`rounded-lg overflow-hidden shadow-md transition-all ${
                        imageSelectionnee === index
                          ? 'ring-4 ring-marron-600 scale-105'
                          : 'hover:scale-105 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.titre} - ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Détails */}
            <div>
              <div className="mb-4">
                <span className="bg-marron-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {product.categorie || 'Non catégorisé'}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-marron-800 mb-4">
                {product.titre}
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="bg-marron-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-marron-800 mb-2">Prix</h3>
                <p className="text-2xl font-bold text-marron-600">
                  {product.prix || 'Non spécifié'}
                </p>
              </div>
              
              {product.caracteristiques && product.caracteristiques.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-marron-800 mb-3">Caractéristiques</h3>
                  <ul className="space-y-2">
                    {product.caracteristiques.map((carac, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
                      >
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">{carac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DetailsProduit

