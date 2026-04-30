import supabase from '../config/supabaseClient.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get user dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // 1. Total Savings (Mocked or calculated from past orders/searches)
  // For now, let's return a static-looking dynamic value
  const totalSavings = 12482.00; 

  // 2. Recent Search
  const { data: recentSearch } = await supabase
    .from('saved_searches')
    .select('query, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // 3. Watchlist Count
  const { count: watchlistCount } = await supabase
    .from('saved_searches') // Assuming saved searches act as watchlist for now
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  // 4. Monthly Trend Data (Mock for chart)
  const trendData = [40, 60, 55, 85, 95, 20];

  // 5. Live Comparisons (Recent popular or user-specific)
  const { data: liveComparisons } = await supabase
    .from('medicines')
    .select('*, pharmacies(*)')
    .limit(3);

  res.status(200).json({
    success: true,
    data: {
      welcomeMessage: `Welcome back, ${req.user.name.split(' ')[0]}`,
      stats: {
        totalSavings: {
          value: totalSavings,
          change: '+14.2% from last month'
        },
        recentSearch: {
          name: recentSearch?.query || 'No recent searches',
          time: recentSearch ? 'Last checked recently' : 'Start searching now'
        },
        watchlistCount: {
          value: watchlistCount || 0,
          alerts: 3 // Mock alert count
        }
      },
      trendData,
      liveComparisons: liveComparisons?.map(m => ({
        id: m.id,
        name: m.name,
        dosageForm: m.dosage_form,
        pharmaciesCount: 4, // Mock count
        price: m.selling_price,
        status: 'Stable', // Mock status
        img: m.image_url
      })) || []
    }
  });
});

// @desc    Get user watchlist
// @route   GET /api/dashboard/watchlist
// @access  Private
export const getWatchlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Mocked data matching UI
  const mockWatchlist = [
    {
      id: '1',
      name: 'Lipitor 20mg',
      description: 'Atorvastatin Calcium • 30 Tablets • Generic Equivalent Available',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvPYSIPKuqROD0_qPzJuG9JAPtdWKp5iCHBZZzcS8YLAf62hCOaIIcqNUQV1pvnLeLKdM5ls4_akmUIvapx1KSjE3raQ1FdiHWAU-dl60aSKZ8Qb4b_ZhVjmyh20k7lI3bZ320q6srymx4RkLtzwHb-lPKSVldF4s35t-Y0HkqbM8A_Pb1tndlKdxajP0Rb-x-kx3g7RGZ97VPpToPK0bjvSL01h6y5dYqAxMmterjnELxKrQTWlZWFBoX2HyrAOrDwNTeie3P8Uoi',
      tags: ['Prescription Required', '12% Price Drop'],
      lowestPrice: 142.50,
      targetPrice: 144.99,
      targetPharmacy: 'Apollo Pharmacy'
    },
    {
      id: '2',
      name: 'Ventolin HFA',
      description: 'Albuterol Sulfate • 90mcg Inhaler',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPlOhMsZDhG4XfjCr01i5-gwXND0DODmWMPUFVDRtskX_VGY9FLepkA5aYeTfttIjkTBH9jEhScA0SoYrhKN3zQYmwelp21oo-_wzL3znWe4nmaVhzFW8cf1Escy-18lOU3tI63c-jZhOejL2cYEwHFMKrJ26TEdQgJYiUSk73Y10KGas0maFcZMQgoZ_4QAGqj-EVdcZKZx9n6aHaQUAUFAMoRwvpIE0g9nINtEEj0KgSq4DEjzYDOFlRqRGyEGKkrxhAaEWSwz5S',
      tags: ['Back in Stock'],
      alert: 'Alert triggered 4h ago',
      delivery: 'Free Next-Day',
      deliverySource: 'Via Apollo 24/7',
      copay: 150.00,
      insurance: 'With Star Health Insurance'
    }
  ];

  res.status(200).json({
    success: true,
    count: mockWatchlist.length,
    data: mockWatchlist
  });
});
