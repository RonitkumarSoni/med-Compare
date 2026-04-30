import supabase from '../../config/supabaseClient.js';

class LocalCatalogProvider {
  async search(query, filters = {}) {
    let supabaseQuery = supabase
      .from('medicines')
      .select('*, pharmacies(*)');

    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,brandName.ilike.%${query}%,genericName.ilike.%${query}%`);
    }

    if (filters.priceMin) supabaseQuery = supabaseQuery.gte('sellingPrice', filters.priceMin);
    if (filters.priceMax) supabaseQuery = supabaseQuery.lte('sellingPrice', filters.priceMax);
    if (filters.inStock) supabaseQuery = supabaseQuery.eq('inStock', true);

    const { data, error } = await supabaseQuery;
    
    if (error) throw error;

    // Normalize output
    return data.map(item => ({
      id: item.id,
      name: item.name,
      brand: item.brandName,
      genericName: item.genericName,
      price: item.sellingPrice,
      mrp: item.price,
      discount: item.discountPercentage,
      pharmacy: item.pharmacies,
      source: 'local'
    }));
  }
}

export default new LocalCatalogProvider();
