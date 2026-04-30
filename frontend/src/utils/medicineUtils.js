/**
 * Dynamic Medicine Utility
 * Implements consistent randomized pools for Syrups and Tablets to ensure visual variety.
 */

const SYRUP_POOL = [
  'https://www.cofsils.com/uploadfile/product/dry_cough.jpg',
  'https://cdn.netmeds.tech/v2/plain-cake-860195/netmed/wrkr/products/assets/item/free/resize-w:400/ed77pumZeV-cofsils_naturals_cough_syrup_100_ml_779427_0_1.jpg',
  'https://m.media-amazon.com/images/I/61DYD3i7WrL._AC_UF1000,1000_QL80_.jpg',
  'https://www.planethealth.in/image/cache/catalog/41804-500x500.jpg',
  'https://tiimg.tistatic.com/fp/1/007/523/benadryl-cough-formula-syrup-150-ml-316.jpg',
  'https://images.apollo247.in/pub/media/catalog/product/A/L/ALK0009_1_1.jpg?tr=q-80'
];

const TABLET_POOL = [
  'https://m.media-amazon.com/images/I/81fNxALC01L._AC_UF1000,1000_QL80_.jpg', // Orange Tablets
  'https://cdn.netmeds.tech/v2/plain-cake-860195/netmed/wrkr/products/pictures/item/free/resize-w:400/8PwFcxMoPc-ourdaily_vitamin_e_softgel_capsules_10s_0_0.jpg', // Vitamin E Softgels
  'https://www.centrumshop.in/dw/image/v2/BKRM_PRD/on/demandware.static/-/Sites-haleon-master-catalog/default/dwe4bdbbfb/images/large/omega-3-fish-oil-1.jpg?sw=690&sh=707&sm=fit&q=100', // Fish Oil
  'https://assets.truemeds.in/Images/ProductImage/TM-TACR1-038394/taxim-of-tablet-10_taxim-of-tablet-10--TM-TACR1-038394_1.png', // Standard Strip
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400' // Blister fallback
];

export const DOSAGE_IMAGES = {
  PEDIATRIC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm_NSxHdv5q_0VWEvCiSu5XnEcPnHYY0S4CQ&s',
  SUSPENSION: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPQ3_ojPdU134hcXhQYfr9oSBOdFS-HFeDw&s',
  INJECTION: 'https://www.embs.org/pulse/wp-content/uploads/sites/13/2023/06/2-An-Injection-of-Innovation-How-Drug-Delivery-Systems-are-Changing.jpg',
  INHALER: 'https://5.imimg.com/data5/SELLER/Default/2021/3/IF/EV/MC/61446284/cipla-asthma-inhaler-500x500.jpg',
  CREAM: 'https://assets.truemeds.in/Images/ProductImage/TM-GEEL1-000306/CREMAGEL-2--GEL-30-GM_1.webp',
  DEFAULT_TABLET: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400'
};

const getPoolImage = (name, pool) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
};

export const getProfessionalMedicineImage = (item) => {
  if (!item) return DOSAGE_IMAGES.DEFAULT_TABLET;

  const name = (item.name || '').toLowerCase();
  const form = (item.dosage_form || item.dosageForm || '').toLowerCase();
  const generic = (item.generic_name || item.genericName || '').toLowerCase();
  const fullContext = `${name} ${form} ${generic}`;

  // 1. Liquids - SYRUP POOL
  if (fullContext.includes('syrup') || fullContext.includes('liquid') || fullContext.includes('solution')) {
    if (fullContext.includes('pediatric') || fullContext.includes('drops')) return DOSAGE_IMAGES.PEDIATRIC;
    if (fullContext.includes('suspension')) return DOSAGE_IMAGES.SUSPENSION;
    return getPoolImage(item.name || 'syrup', SYRUP_POOL);
  }

  // 2. Others
  if (fullContext.includes('injection') || fullContext.includes('vial')) return DOSAGE_IMAGES.INJECTION;
  if (fullContext.includes('inhaler')) return DOSAGE_IMAGES.INHALER;
  if (fullContext.includes('cream') || fullContext.includes('ointment') || fullContext.includes('gel')) return DOSAGE_IMAGES.CREAM;

  // 3. Solids - TABLET POOL (Force pool if DB image is missing)
  const dbImage = item.image_url || item.imageUrl;
  if (!dbImage || dbImage.includes('unsplash.com')) {
    return getPoolImage(item.name || 'tablet', TABLET_POOL);
  }

  return dbImage;
};
