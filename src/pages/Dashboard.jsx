import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaBox, FaTags } from 'react-icons/fa'
import { getProducts, getCategories } from '../utils/dataManager'
import DashboardLayout from '../components/DashboardLayout'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ products: 0, categories: 0 })

  useEffect(() => {
    // Charger les statistiques
    const products = getProducts()
    const categories = getCategories()
    setStats({
      products: products.length,
      categories: categories.length
    })
  }, [])

  return (
    <DashboardLayout>
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Nombre de produits</p>
                <p className="text-3xl font-bold text-marron-800 mt-2">{stats.products}</p>
              </div>
              <div className="bg-marron-100 p-4 rounded-full">
                <FaBox className="text-2xl text-marron-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Nombre de catégories</p>
                <p className="text-3xl font-bold text-marron-800 mt-2">{stats.categories}</p>
              </div>
              <div className="bg-marron-100 p-4 rounded-full">
                <FaTags className="text-2xl text-marron-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-marron-800 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/dashboard/produits/nouveau')}
              className="flex items-center space-x-3 px-6 py-4 bg-marron-100 hover:bg-marron-200 rounded-lg transition-all duration-300 text-left"
            >
              <div className="bg-marron-600 p-3 rounded-full">
                <FaPlus className="text-white text-lg" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Ajouter un produit</p>
                <p className="text-sm text-gray-600">Créer un nouveau produit</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/dashboard/categories/nouvelle')}
              className="flex items-center space-x-3 px-6 py-4 bg-marron-100 hover:bg-marron-200 rounded-lg transition-all duration-300 text-left"
            >
              <div className="bg-marron-600 p-3 rounded-full">
                <FaTags className="text-white text-lg" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Ajouter une catégorie</p>
                <p className="text-sm text-gray-600">Créer une nouvelle catégorie</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/dashboard/produits')}
              className="flex items-center space-x-3 px-6 py-4 bg-marron-100 hover:bg-marron-200 rounded-lg transition-all duration-300 text-left"
            >
              <div className="bg-marron-600 p-3 rounded-full">
                <FaEdit className="text-white text-lg" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Gérer les produits</p>
                <p className="text-sm text-gray-600">Modifier ou supprimer</p>
              </div>
            </button>
          </div>
        </div>

        {/* Section activités récentes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-marron-800 mb-4">Activités récentes</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <FaBox className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Produit ajouté: Armoire sur mesure</p>
                <p className="text-sm text-gray-600">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaTags className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Catégorie ajoutée: Mobilier de cuisine</p>
                <p className="text-sm text-gray-600">Il y a 5 heures</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <FaBox className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Produit ajouté: Porte d'entrée</p>
                <p className="text-sm text-gray-600">Il y a 1 jour</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaTags className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Catégorie ajoutée: Portes et fenêtres</p>
                <p className="text-sm text-gray-600">Il y a 2 jours</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <FaBox className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Produit ajouté: Table basse</p>
                <p className="text-sm text-gray-600">Il y a 3 jours</p>
              </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  )
}

export default Dashboard

