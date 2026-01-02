// Sample data for testing

const sampleProducts = [
  {
    title: 'Almond Cream Kota Doriya Printed Knot Work Unstitched Suit Set',
    body_html: '<h3>DESCRIPTION</h3><p>Step into the soft radiance of Namostri\'s Almond Cream Un stitched Suit Set—where airy kota doriya meets playful artistry.</p>',
    price: '2999.00',
    vendor: 'Namostri',
    product_type: 'Dress material',
    status: 'active',
    source: 'shopify',
    shopify_id: '8210932007082',
    handle: 'almond-cream-kota-doriya-printed-knot-work-unstitched-suit-set',
    image: {
      src: 'https://cdn.shopify.com/s/files/1/0650/9536/8874/files/8nrjPV7cIpsa0O0g7z46F-3If0e4vopGaYliorun85U.jpg',
      alt: 'Almond Cream Kota Doriya Printed Knot Work Unstitched Suit Set'
    },
    created_at: new Date('2025-08-08')
  },
  {
    title: 'Ethnic Wear Traditional Printed Cotton Kurta',
    body_html: '<h3>DESCRIPTION</h3><p>Beautiful traditional ethnic wear with intricate prints and comfortable cotton fabric.</p>',
    price: '1899.00',
    vendor: 'Ethnic Collections',
    product_type: 'Kurta',
    status: 'active',
    source: 'amazon',
    amazon_id: 'B0D1X2Y3Z4',
    asin: 'B0D1X2Y3Z4',
    rating: 4.5,
    reviews_count: 128,
    created_at: new Date('2025-09-01')
  },
  {
    title: 'Chanderi Cotton Unstitched Dress Material',
    body_html: '<h3>MATERIAL</h3><p>Pure chanderi cotton with natural dye. Perfect for festive wear.</p>',
    price: '1499.00',
    vendor: 'Traditional Textiles',
    product_type: 'Dress material',
    status: 'active',
    source: 'shopify',
    shopify_id: '8210932007083',
    handle: 'chanderi-cotton-unstitched-dress-material',
    created_at: new Date('2025-08-15')
  }
];

module.exports = { sampleProducts };
