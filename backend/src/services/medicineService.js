import localCatalogProvider from './providers/localCatalogProvider.js';
import publicDrugInfoProvider from './providers/publicDrugInfoProvider.js';

class MedicineService {
  async searchMedicines(query, filters) {
    // 1. Search in local DB (Primary)
    const localResults = await localCatalogProvider.search(query, filters);
    
    // 2. Enrich with public data if needed (optional)
    // We only enrich for specific details or if local results are few
    
    return localResults;
  }

  async getMedicineDetails(id, name) {
    // 1. Get from local DB
    // (Actual implementation would fetch by ID, but for now we enrich by name)
    const publicInfo = await publicDrugInfoProvider.getDrugInfo(name);
    
    return {
      publicInfo
    };
  }
}

export default new MedicineService();
