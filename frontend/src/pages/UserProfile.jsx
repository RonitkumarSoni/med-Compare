import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import API from '../api/api';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showToast, setShowToast] = useState(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const notify = (msg, type = 'success') => {
    setShowToast({ msg, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleUpdateProfile = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      notify('Profile successfully updated for the Indian region.');
    }, 1200);
  };

  const [passwords, setPasswords] = useState({ current: '', new: '' });

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const confirmPasswordChange = async () => {
    if (!passwords.current || !passwords.new) {
      notify('Both password fields are required.', 'warning');
      return;
    }
    if (passwords.new.length < 6) {
      notify('New password must be at least 6 characters.', 'warning');
      return;
    }

    setIsUpdating(true);
    try {
      await API.put('/auth/change-password', {
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      notify('Password updated successfully!', 'success');
      setIsChangingPassword(false);
      setPasswords({ current: '', new: '' });
    } catch (err) {
      notify(err.response?.data?.message || 'Current password is incorrect', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    notify(`Two-Factor Authentication ${!is2FAEnabled ? 'Enabled' : 'Disabled'}`, !is2FAEnabled ? 'success' : 'warning');
  };

  const handleSignOut = async () => {
    notify('Signing out of MedCompare...', 'info');
    setTimeout(async () => {
      await logout();
      navigate('/');
    }, 500);
  };
  return (
    <div className="flex-1 space-y-12 relative">
      {/* Premium Toast Notification */}
      {showToast && (
        <div className={`fixed top-24 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-in slide-in-from-right-full duration-500 ${
          showToast.type === 'success' ? 'bg-emerald-500/90 border-emerald-400 text-white' : 
          showToast.type === 'warning' ? 'bg-amber-500/90 border-amber-400 text-white' :
          'bg-blue-600/90 border-blue-500 text-white'
        }`}>
          <span className="material-symbols-outlined">
            {showToast.type === 'success' ? 'check_circle' : showToast.type === 'warning' ? 'warning' : 'info'}
          </span>
          <p className="font-headline font-bold text-sm tracking-tight">{showToast.msg}</p>
        </div>
      )}

      {/* Hero Section: Profile Intro */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-2">My Profile</h1>
          <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">Manage your medical data, pharmacy connections, and platform preferences from one central hub.</p>
        </div>
        <div className="flex gap-3">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-xs tracking-wider uppercase font-headline">Verified Member</span>
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-xs tracking-wider uppercase font-headline">Premium Plan</span>
        </div>
      </header>

      {/* Bento Grid Layout for Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Personal Details & Settings */}
        <div className="md:col-span-8 space-y-8">
          {/* Account Details Card */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/10">
            <h2 className="text-2xl font-bold font-headline mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">badge</span> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block font-headline text-sm font-semibold text-on-surface-variant">Full Name</label>
                <input 
                  className="w-full bg-surface-container-low border-0 rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body" 
                  type="text" 
                  defaultValue={user?.user_metadata?.full_name || user?.name || ""}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-headline text-sm font-semibold text-on-surface-variant">Email Address</label>
                <input 
                  className="w-full bg-surface-container-low border-0 rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body" 
                  type="email" 
                  defaultValue={user?.email || ""}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-headline text-sm font-semibold text-on-surface-variant">Phone Number</label>
                <input 
                  className="w-full bg-surface-container-low border-0 rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body" 
                  type="tel" 
                  defaultValue={user?.phone || user?.user_metadata?.phone || "Add phone number"}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-headline text-sm font-semibold text-on-surface-variant">Location</label>
                <input 
                  className="w-full bg-surface-container-low border-0 rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all font-body" 
                  type="text" 
                  defaultValue={(user?.city || user?.state) ? `${user?.city || ''}, ${user?.state || ''}` : "Set your location"}
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleUpdateProfile}
                disabled={isUpdating}
                className="px-8 py-3 bg-primary text-white font-headline font-bold rounded-lg hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/10">
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">notifications_active</span> Notification Preferences
            </h2>
            <div className="space-y-6 font-body">
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-headline font-bold text-on-surface">Price Drop Alerts</p>
                  <p className="text-sm text-on-surface-variant">Get notified when watched medicines decrease in price by 10% or more.</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-headline font-bold text-on-surface">Stock Availability</p>
                  <p className="text-sm text-on-surface-variant">Daily updates on inventory levels for your primary pharmacy links.</p>
                </div>
                <div className="w-12 h-6 bg-surface-container-high rounded-full relative flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-headline font-bold text-on-surface">Weekly Savings Report</p>
                  <p className="text-sm text-on-surface-variant">Summarized analytics of your healthcare expenditure and savings.</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Savings Summary & Links */}
        <div className="md:col-span-4 space-y-8">
          {/* Savings Summary Card */}
          <section className="bg-gradient-to-br from-blue-600 to-blue-400 p-8 rounded-2xl text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-headline uppercase tracking-widest opacity-80 mb-1">Total Lifetime Savings</h3>
              <div className="text-4xl font-extrabold font-headline mb-6">₹1,24,800.50</div>
              <div className="h-2 w-full bg-white/20 rounded-full mb-4">
                <div className="h-2 w-[75%] bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]"></div>
              </div>
              <p className="text-sm font-body opacity-90 leading-relaxed">You've saved 22% more this quarter compared to local pharmacy MSRPs.</p>
            </div>
            {/* Aesthetic Gradient Swirl */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </section>

          {/* Linked Pharmacy Accounts */}
          <section className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-headline">Linked Accounts</h2>
              <button className="material-symbols-outlined text-primary hover:bg-primary/10 rounded-full p-2 transition-colors">add_circle</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant/5">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant">local_pharmacy</span>
                </div>
                <div className="flex-1 font-body">
                  <p className="font-headline font-bold text-sm">Apollo Pharmacy</p>
                  <p className="text-xs text-on-surface-variant">Primary Provider</p>
                </div>
                <span className="material-symbols-outlined text-emerald-500" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant/5">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant">storefront</span>
                </div>
                <div className="flex-1 font-body">
                  <p className="font-headline font-bold text-sm">MedPlus Mumbai</p>
                  <p className="text-xs text-on-surface-variant">Secondary Link</p>
                </div>
                <span className="material-symbols-outlined text-emerald-500" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant/5 opacity-60">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant">clinical_notes</span>
                </div>
                <div className="flex-1 font-body">
                  <p className="font-headline font-bold text-sm">Local Independent</p>
                  <p className="text-xs text-on-surface-variant">Disconnected</p>
                </div>
                <button className="text-xs font-bold text-primary hover:underline font-headline">Re-link</button>
              </div>
            </div>
          </section>

          {/* Account Security Quick Actions */}
          <div className="bg-white p-8 rounded-xl border border-outline-variant/20 space-y-4 font-body">
            <h3 className="font-headline font-bold text-sm text-on-surface-variant uppercase tracking-widest">Security</h3>
            {isChangingPassword ? (
              <div className="space-y-4 p-5 bg-surface-container-low rounded-2xl border border-primary/20 animate-in fade-in zoom-in duration-300">
                <div className="space-y-3">
                  <div>
                    <label className="block font-headline text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1 ml-1">Current Password</label>
                    <input 
                      className="w-full bg-white border-2 border-primary/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/40 outline-none transition-all font-body" 
                      type="password" 
                      placeholder="Enter current password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block font-headline text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1 ml-1">New Password</label>
                    <input 
                      className="w-full bg-white border-2 border-primary/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/40 outline-none transition-all font-body" 
                      type="password" 
                      placeholder="Min 6 characters"
                      value={passwords.new}
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={confirmPasswordChange}
                    disabled={isUpdating}
                    className="flex-1 py-3 bg-primary text-white font-headline font-bold rounded-xl hover:opacity-90 active:scale-95 disabled:opacity-50 text-sm"
                  >
                    {isUpdating ? 'Updating...' : 'Update Password'}
                  </button>
                  <button 
                    onClick={() => setIsChangingPassword(false)}
                    className="px-4 py-3 bg-slate-200 text-slate-700 font-headline font-bold rounded-xl hover:bg-slate-300 active:scale-95 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleChangePassword}
                disabled={isUpdating}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors group disabled:opacity-50"
              >
                <span className="flex items-center gap-3 font-medium text-sm"><span className="material-symbols-outlined text-on-surface-variant">key</span> {isUpdating ? 'Updating...' : 'Change Password'}</span>
                <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
            )}
            <button 
              onClick={toggle2FA}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors group"
            >
              <span className="flex items-center gap-3 font-medium text-sm"><span className="material-symbols-outlined text-on-surface-variant">phonelink_lock</span> Two-Factor Auth</span>
              <div className={`flex items-center gap-2 px-2 py-1 rounded-full transition-colors ${is2FAEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                <span className={`text-[10px] font-bold uppercase font-headline`}>{is2FAEnabled ? 'Enabled' : 'Disabled'}</span>
                <div className={`w-2 h-2 rounded-full ${is2FAEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
              </div>
            </button>
            <div className="pt-4 border-t border-outline-variant/10">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 p-3 text-error font-bold text-sm rounded-lg hover:bg-red-50 transition-colors font-headline"
              >
                <span className="material-symbols-outlined">logout</span> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
