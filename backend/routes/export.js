const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

// Export all products to Excel
router.post('/excel', exportController.exportToExcel);

// Export filtered products to Excel
router.post('/excel/filtered', exportController.exportFilteredToExcel);

// Export products by source to Excel
router.post('/excel/:source', exportController.exportBySourceToExcel);

module.exports = router;
