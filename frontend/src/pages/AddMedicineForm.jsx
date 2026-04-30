import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import useAsync from '../hooks/useAsync';
import SEO from '../components/SEO';

const AddMedicineForm = () => {
  const navigate = useNavigate();
  const { execute: submitMedicine, loading } = useAsync((data) => API.post('/medicines', data));
  const [previewImage, setPreviewImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      type: 'Prescription Drug',
      manufacturer: '',
      price: '',
      sellingPrice: '',
      availableQuantity: '',
      expiryDate: '',
      image_url: '',
      dosage_form: 'Tablet',
      latitude: '',
      longitude: '',
      address: '',
      dealerName: '',
      dealerNumber: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Medicine name is required'),
      manufacturer: Yup.string().required('Manufacturer is required'),
      price: Yup.number().positive().required('MRP is required'),
      sellingPrice: Yup.number().positive().required('Selling price is required'),
      availableQuantity: Yup.number().min(0).required('Stock quantity is required'),
      expiryDate: Yup.date().required('Expiry date is required'),
      dosage_form: Yup.string().required('Dosage form is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Map frontend fields to database fields if necessary
        const payload = {
          name: values.name,
          brand_name: values.manufacturer,
          available_quantity: parseInt(values.availableQuantity),
          price: parseFloat(values.price),
          selling_price: parseFloat(values.sellingPrice),
          expiry_date: values.expiryDate,
          image_url: values.image_url,
          dosage_form: values.dosage_form,
          latitude: parseFloat(values.latitude) || null,
          longitude: parseFloat(values.longitude) || null,
          shop_address: values.address,
          dealer_name: values.dealerName,
          dealer_number: values.dealerNumber
        };
        await submitMedicine(payload);
        toast.success('Medicine added successfully!');
        navigate('/inventory');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to add medicine');
      }
    },
  });

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    toast.info('Detecting your location...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        formik.setFieldValue('latitude', position.coords.latitude);
        formik.setFieldValue('longitude', position.coords.longitude);
        toast.success('Location detected successfully!');
      },
      (error) => {
        toast.error('Could not detect location. Please enter manually.');
      }
    );
  };

  return (
    <div className="flex-1 min-h-screen bg-background p-1">
      <SEO title="Add Medicine" description="Catalog new inventory for your pharmacy." />
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="material-symbols-outlined text-primary hover:bg-blue-50 p-2 rounded-full transition-colors"
          >
            arrow_back
          </button>
          <h2 className="font-headline font-bold text-lg tracking-tight text-on-surface">
            Inventory <span className="mx-2 text-outline-variant opacity-40">/</span> Add Medicine
          </h2>
        </div>
        <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-4 leading-tight">Catalog New Inventory</h1>
        <p className="text-on-surface-variant font-body text-lg max-w-2xl leading-relaxed">
          Ensure accurate data entry for optimal price comparison and compliance.
        </p>
      </header>

      <form onSubmit={formik.handleSubmit} className="space-y-12 pb-24 max-w-5xl">
        {/* Section 1: Basic Info */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-12px_rgba(0,85,201,0.2)] border border-outline-variant/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">info</span>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold">Basic Information</h3>
              <p className="text-sm text-on-surface-variant font-body">Core product details and identification</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Medicine Name</label>
              <input 
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`w-full bg-[#e0e7ff] border-2 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-slate-300'} focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface outline-none transition-all`} 
                placeholder="e.g. Atorvastatin Calcium" 
                type="text"
              />
              {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs px-2">{formik.errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Product Type</label>
              <select 
                name="type"
                onChange={formik.handleChange}
                value={formik.values.type}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface appearance-none transition-all outline-none"
              >
                <option>Prescription Drug</option>
                <option>Over-the-Counter (OTC)</option>
                <option>Supplement</option>
                <option>Medical Device</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Dosage Form</label>
              <select 
                name="dosage_form"
                onChange={formik.handleChange}
                value={formik.values.dosage_form}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface appearance-none transition-all outline-none"
              >
                <option>Tablet</option>
                <option>Syrup</option>
                <option>Injection</option>
                <option>Capsule</option>
                <option>Cream/Ointment</option>
                <option>Inhaler</option>
                <option>Drops</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-1">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Manufacturer</label>
              <input 
                name="manufacturer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.manufacturer}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface placeholder:text-on-surface-variant/70 transition-all outline-none" 
                placeholder="Pharmaceutical company name" 
                type="text"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Image URL (Optional)</label>
              <input 
                name="image_url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image_url}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface placeholder:text-on-surface-variant/70 transition-all outline-none" 
                placeholder="https://images.unsplash.com/..." 
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Logistics */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-12px_rgba(0,85,201,0.2)] border border-outline-variant/30 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold">Pricing & Logistics</h3>
              <p className="text-sm text-on-surface-variant font-body">Manage costs and expiration tracking</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">MRP (₹)</label>
              <input 
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface outline-none" 
                placeholder="0.00" 
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Selling Price (₹)</label>
              <input 
                name="sellingPrice"
                onChange={formik.handleChange}
                value={formik.values.sellingPrice}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface outline-none" 
                placeholder="0.00" 
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Stock Quantity</label>
              <input 
                name="availableQuantity"
                onChange={formik.handleChange}
                value={formik.values.availableQuantity}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface outline-none" 
                placeholder="0" 
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Expiry Date</label>
              <input 
                name="expiryDate"
                onChange={formik.handleChange}
                value={formik.values.expiryDate}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface outline-none" 
                type="date"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Dealer Information */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-12px_rgba(0,85,201,0.2)] border border-outline-variant/30 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">contact_phone</span>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold">Dealer Information</h3>
              <p className="text-sm text-on-surface-variant font-body">Details of your medicine supplier</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Dealer Name</label>
              <input 
                name="dealerName"
                onChange={formik.handleChange}
                value={formik.values.dealerName}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface outline-none" 
                placeholder="Enter distributor name" 
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Dealer Contact Number</label>
              <input 
                name="dealerNumber"
                onChange={formik.handleChange}
                value={formik.values.dealerNumber}
                className="w-full bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface outline-none" 
                placeholder="+91 XXXXX XXXXX" 
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Location Settings */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-12px_rgba(0,85,201,0.2)] border border-outline-variant/30 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold">Shop Location</h3>
              <p className="text-sm text-on-surface-variant font-body">Coordinates for distance calculation</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 relative z-10">
            <div className="space-y-2">
              <label className="block font-headline text-sm font-semibold text-on-surface-variant px-1">Shop Address / Area</label>
              <div className="flex gap-4">
                <input 
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="flex-1 bg-[#e0e7ff] border-2 border-slate-300 focus:ring-4 focus:ring-primary/20 focus:bg-white focus:border-primary/40 rounded-2xl px-6 py-4 text-on-surface outline-none" 
                  placeholder="e.g. Bandra West, Mumbai" 
                  type="text"
                />
                <button 
                  type="button"
                  onClick={handleDetectLocation}
                  className="px-6 bg-primary/10 text-primary rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/20 transition-all"
                >
                  <span className="material-symbols-outlined">my_location</span>
                  Detect
                </button>
              </div>
              {(formik.values.latitude && formik.values.longitude) && (
                <p className="text-[10px] text-emerald-600 font-bold px-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  Coordinates captured: {formik.values.latitude.toFixed(4)}, {formik.values.longitude.toFixed(4)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-6 pt-8">
          <button 
            type="button"
            onClick={() => navigate('/inventory')}
            className="px-8 py-4 font-headline font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Discard Draft
          </button>
          <button 
            disabled={loading}
            className="px-12 py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-headline font-bold text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all disabled:opacity-50" 
            type="submit"
          >
            {loading ? 'Publishing...' : 'Publish to Catalog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineForm;
