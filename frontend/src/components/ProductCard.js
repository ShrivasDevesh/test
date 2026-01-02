import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  const image = product.image?.src || product.images?.[0]?.src || '/placeholder.jpg';
  const price = product.price || product.variants?.[0]?.price || 'N/A';
  const description = product.body_html
    ? stripHtml(product.body_html).substring(0, 100) + '...'
    : product.description?.substring(0, 100) + '...' || 'No description';

  function stripHtml(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={product.title} onError={(e) => {e.target.src = '/placeholder.jpg'}} />
        <span className={`badge badge-${product.source}`}>{product.source}</span>
        {product.status && <span className={`status status-${product.status}`}>{product.status}</span>}
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>

        <p className="product-description">{description}</p>

        <div className="product-meta">
          {product.vendor && (
            <span className="meta-item">
              <strong>Vendor:</strong> {product.vendor}
            </span>
          )}
          {product.product_type && (
            <span className="meta-item">
              <strong>Type:</strong> {product.product_type}
            </span>
          )}
        </div>

        <div className="product-footer">
          <div className="price">₹{price}</div>
          <div className="actions">
            <button className="btn-icon" title="View details">
              <ExternalLink size={18} />
            </button>
            <button
              className="btn-icon btn-danger"
              title="Delete"
              onClick={() => onDelete(product._id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
