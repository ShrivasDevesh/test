import React from 'react';
import { Search, Download, RefreshCw, Filter } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({
  search,
  onSearchChange,
  onSourceChange,
  source,
  onStatusChange,
  status,
  onSync,
  onExport,
  syncLoading,
  exportLoading,
}) => {
  return (
    <div className="search-bar">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search products by title, vendor, or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Source:</label>
          <select value={source} onChange={(e) => onSourceChange(e.target.value)}>
            <option value="">All Sources</option>
            <option value="shopify">Shopify</option>
            <option value="amazon">Amazon</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <button
          className="btn btn-secondary"
          onClick={onSync}
          disabled={syncLoading}
          title="Sync products from sources"
        >
          <RefreshCw size={18} className={syncLoading ? 'spinning' : ''} />
          Sync
        </button>

        <button
          className="btn btn-primary"
          onClick={onExport}
          disabled={exportLoading}
          title="Export to Excel"
        >
          <Download size={18} />
          Export
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
