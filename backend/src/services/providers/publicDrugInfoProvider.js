import axios from 'axios';

class PublicDrugInfoProvider {
  constructor() {
    this.baseUrl = 'https://api.fda.gov/drug/label.json';
  }

  async getDrugInfo(name) {
    try {
      const response = await axios.get(`${this.baseUrl}?search=openfda.brand_name:"${name}"&limit=1`);
      const result = response.data.results[0];
      
      if (!result) return null;

      return {
        description: result.description?.[0],
        indications: result.indications_and_usage?.[0],
        warnings: result.warnings?.[0],
        composition: result.active_ingredient?.[0],
        manufacturer: result.openfda?.manufacturer_name?.[0],
        source: 'openFDA'
      };
    } catch (error) {
      console.warn('Public Drug Info Provider Error:', error.message);
      return null;
    }
  }
}

export default new PublicDrugInfoProvider();
