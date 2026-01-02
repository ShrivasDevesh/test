import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import Toast from './Toast';
import { productAPI, exportAPI } from '../services/api';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [syncLoading, setSyncLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const LIMIT = 20;

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, [currentPage, search, source, status]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await productAPI.getAllProducts(currentPage, LIMIT, search);
      setProducts(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      setError('Failed to fetch products');
      showToast('Failed to fetch products', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncLoading(true);
      showToast('Syncing products from sources...', 'loading');

      await Promise.all([
        productAPI.syncShopify().catch(() => null),
        productAPI.syncAmazon().catch(() => null),
      ]);

      showToast('Products synced successfully!', 'success');
      setTimeout(() => fetchProducts(), 500);
    } catch (err) {
      showToast('Error syncing products', 'error');
      console.error(err);
    } finally {
      setSyncLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExportLoading(true);
      showToast('Generating Excel file...', 'loading');

      let response;
      if (search || status) {
        response = await exportAPI.exportFiltered({ search, source, status });
      } else if (source) {
        response = await exportAPI.exportBySource(source);
      } else {
        response = await exportAPI.exportAllProducts();
      }

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `products_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentChild.removeChild(link);
      window.URL.revokeObjectURL(url);

      showToast('Excel file downloaded!', 'success');
    } catch (err) {
      showToast('Error exporting products', 'error');
      console.error(err);
    } finally {
      setExportLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productAPI.deleteProduct(id);
      showToast('Product deleted successfully', 'success');
      setCurrentPage(1);
      fetchProducts();
    } catch (err) {
      showToast('Error deleting product', 'error');
      console.error(err);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h1>Product Manager</h1>
        <p>Manage products from Shopify and Amazon</p>
      </div>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        source={source}
        onSourceChange={setSource}
        status={status}
        onStatusChange={setStatus}
        onSync={handleSync}
        onExport={handleExport}
        syncLoading={syncLoading}
        exportLoading={exportLoading}
      />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your search filters or sync products from your sources</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default ProductList;
