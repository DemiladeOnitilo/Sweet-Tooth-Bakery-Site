import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchUserProfile } from "../store/authSlice";
import axios from "axios";
import {
  FaUser,
  FaBox,
  FaSignOutAlt,
  FaTag,
  FaChevronRight,
  FaCog,
  FaHistory,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaSpinner,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Dashboard Navigation State
  const [activeTab, setActiveTab] = useState("overview");

  // Editable Profile State
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [ordersRes, discountsRes] = await Promise.all([
          axios.get(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/orders/discounts`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setOrders(ordersRes.data.orders);
        setDiscounts(discountsRes.data.discounts);
      } catch {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    dispatch(fetchUserProfile());
  }, [token, navigate, dispatch]);

  // Update local state if Redux user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(
        `${API_URL}/auth/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        },
      );
      dispatch(fetchUserProfile());
      toast.success("Profile successfully updated", {
        className: "body-text text-sm font-bold uppercase tracking-wider",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.info("You've been logged out");
  };

  const formatCurrency = (amount) => `\u20A6${Number(amount).toLocaleString()}`;

  // Helper to calculate mock loyalty points based on order history
  const loyaltyPoints = orders.length * 150;
  const loyaltyTier = loyaltyPoints > 1000 ? "Gold" : loyaltyPoints > 500 ? "Silver" : "Member";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFBF9]">
        <FaSpinner className="animate-spin text-4xl text-[#BE185D]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF9] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* ================= SIDEBAR NAVIGATION ================= */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* User ID Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-[#BE185D]/5 border-b border-gray-50"></div>
            
            <div className="relative w-24 h-24 mx-auto rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#BE185D] text-3xl font-bold mb-4 mt-4">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            
            <h1 className="heading-text text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="body-text text-sm text-gray-500 mt-1">{user?.email}</p>

            <div className="mt-6 inline-flex items-center gap-2 bg-[#BE185D]/5 border border-[#BE185D]/20 px-4 py-1.5 rounded-full">
              <FaStar className="text-[#BE185D] text-xs" />
              <span className="body-text text-[10px] font-bold uppercase tracking-widest text-[#BE185D]">
                {loyaltyTier} Tier
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-sm p-4">
            {[
              { id: "overview", label: "Dashboard", icon: <FaUser /> },
              { id: "orders", label: "Order History", icon: <FaHistory /> },
              { id: "rewards", label: "Sweet Rewards", icon: <FaTag /> },
              { id: "settings", label: "Account Settings", icon: <FaCog /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl body-text text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#BE185D] text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <div className="h-px bg-gray-100 my-2 mx-4" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl body-text text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>

          {/* Mobile Horizontal Navigation */}
          <div className="lg:hidden flex overflow-x-auto hide-scrollbar gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
            {["overview", "orders", "rewards", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl body-text text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-[#BE185D] text-white"
                    : "bg-gray-50 text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="lg:col-span-8">
          
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-8">
              <h2 className="heading-text text-3xl font-bold text-gray-900">
                Welcome <span className="text-[#BE185D] italic">Back</span>
              </h2>

              {/* Loyalty Card Visual */}
              <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-lg border border-gray-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#BE185D] blur-[80px] opacity-30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <p className="body-text text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Sweet Rewards</p>
                    <h3 className="heading-text text-4xl md:text-5xl font-bold">
                      {loyaltyPoints} <span className="text-xl text-gray-400 font-normal">Pts</span>
                    </h3>
                  </div>
                  <Link
                    to="/services"
                    className="bg-white text-gray-900 px-6 py-3 rounded-full body-text text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                  >
                    Earn More
                  </Link>
                </div>
              </div>

              {/* Recent Order Snapshot */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="heading-text text-xl font-bold text-gray-900">Recent Order</h3>
                  <button onClick={() => setActiveTab("orders")} className="body-text text-[10px] font-bold uppercase tracking-widest text-[#BE185D] hover:text-[#9D174D] flex items-center gap-1">
                    View All <FaChevronRight className="text-[8px]" />
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="body-text text-sm text-gray-500 mb-4">No recent orders found.</p>
                    <Link to="/services" className="bg-[#BE185D] text-white px-6 py-3 rounded-full body-text text-xs font-bold uppercase tracking-widest">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-gray-100 rounded-2xl p-5 bg-gray-50/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                        <FaBox className="text-gray-400" />
                      </div>
                      <div>
                        <p className="body-text text-xs font-bold uppercase tracking-wider text-gray-900">Order #{orders[0].order_reference}</p>
                        <p className="body-text text-xs text-gray-500 mt-1">{new Date(orders[0].created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col md:items-end gap-2 w-full md:w-auto">
                      <p className="heading-text text-lg font-bold text-[#BE185D]">{formatCurrency(orders[0].total)}</p>
                      <button className="w-full md:w-auto text-center border border-gray-200 bg-white px-4 py-2 rounded-full body-text text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-gray-900 transition-colors">
                        Track Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: ORDERS */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
              <h2 className="heading-text text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <FaHistory className="text-3xl text-gray-300" />
                  </div>
                  <p className="body-text text-gray-500 mb-6">You haven't placed any orders yet.</p>
                  <Link to="/services" className="bg-[#BE185D] text-white px-8 py-3.5 rounded-full body-text text-xs font-bold uppercase tracking-widest hover:bg-[#9D174D] shadow-sm transition-all">
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-100 rounded-3xl p-6 hover:shadow-md transition-shadow duration-300">
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-50 pb-4 mb-4 gap-4">
                        <div>
                          <p className="body-text text-xs font-bold uppercase tracking-widest text-gray-900">
                            Order #{order.order_reference}
                          </p>
                          <p className="body-text text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
                            {new Date(order.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                        </div>
                        <span className={`body-text text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${
                            order.payment_status === "paid" ? "bg-green-50 text-green-600 border border-green-100" : "bg-yellow-50 text-yellow-600 border border-yellow-100"
                        }`}>
                          {order.payment_status === "paid" ? "Confirmed" : "Pending"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-6">
                        {order.items.slice(0, 4).map((item, i) => (
                          <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-2xl pr-4 border border-gray-100">
                            <img src={item.img} alt={item.name} className="w-12 h-12 rounded-l-2xl object-cover" />
                            <div>
                              <p className="heading-text text-sm font-bold text-gray-900">{item.name}</p>
                              <p className="body-text text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                        <p className="heading-text text-xl font-bold text-[#BE185D]">{formatCurrency(order.total)}</p>
                        <button className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-600 bg-white border border-gray-200 px-5 py-2.5 rounded-full hover:border-gray-900 transition-all shadow-sm">
                          Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: REWARDS & DISCOUNTS */}
          {activeTab === "rewards" && (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
              <h2 className="heading-text text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                Available Vouchers
              </h2>

              {discounts.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <FaTag className="text-3xl text-gray-300" />
                  </div>
                  <p className="body-text text-gray-500">No active discounts available right now.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {discounts.map((d) => (
                    <div key={d.id} className="relative bg-[#FCFBF9] border border-[#BE185D]/20 rounded-2xl p-6 overflow-hidden group hover:border-[#BE185D]/50 transition-colors">
                      {/* Ticket cutout effect */}
                      <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full transform -translate-y-1/2 border-r border-[#BE185D]/20"></div>
                      <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full transform -translate-y-1/2 border-l border-[#BE185D]/20"></div>
                      
                      <div className="flex justify-between items-start ml-2 mr-2">
                        <div>
                          <p className="body-text text-[10px] font-bold uppercase tracking-widest text-[#BE185D] mb-1">Promo Code</p>
                          <p className="heading-text text-2xl font-bold text-gray-900 mb-2">{d.code}</p>
                          <p className="body-text text-sm text-gray-600">{d.value}% off your next purchase</p>
                        </div>
                      </div>
                      
                      {d.min_spend > 0 && (
                        <div className="mt-6 pt-4 border-t border-dashed border-gray-200 ml-2 mr-2">
                          <p className="body-text text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                            Minimum Spend: {formatCurrency(d.min_spend)}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
              <h2 className="heading-text text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                Account Settings
              </h2>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-6 max-w-xl">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white resize-none"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-50">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[#BE185D] text-white px-8 py-3.5 rounded-full body-text text-xs font-bold uppercase tracking-widest hover:bg-[#9D174D] shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {saving ? <FaSpinner className="animate-spin" /> : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;