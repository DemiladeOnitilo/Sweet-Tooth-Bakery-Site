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
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSpinner,
} from "react-icons/fa";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [saving, setSaving] = useState(false);

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

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await axios.put(
        `${API_URL}/auth/profile`,
        { name, phone, address },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000, 
        },
      );
      dispatch(fetchUserProfile());
      setEditing(false);
      toast.success("Profile updated");
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

  const formatCurrency = (amount) => {
    return `\u20A6${Number(amount).toLocaleString()}`;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-white mt-34 pb-20">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user?.name}
                </h1>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={editing ? handleSaveProfile : () => setEditing(true)}
              disabled={saving}
              className="flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-semibold cursor-pointer disabled:opacity-50"
            >
              {editing ? (
                saving ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Save"
                )
              ) : (
                <>
                  <FaEdit /> Edit
                </>
              )}
            </button>
          </div>

          {editing ? (
            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                />
              </div>
              <button
                onClick={() => setEditing(false)}
                className="text-sm text-red-500 hover:text-red-600 cursor-pointer font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              {user?.phone && (
                <span className="flex items-center gap-1.5">
                  <FaPhone className="text-pink-400" /> {user.phone}
                </span>
              )}
              {user?.address && (
                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-pink-400" /> {user.address}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Discounts */}
          <div className="lg:col-span-5 space-y-6">
            {discounts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaTag className="text-pink-500" /> Your Discount Codes
                </h2>
                <div className="space-y-3">
                  {discounts.map((d) => (
                    <div
                      key={d.id}
                      className="bg-gradient-to-r from-yellow-50 to-pink-50 border border-yellow-200 rounded-xl p-4"
                    >
                      <p className="text-lg font-bold tracking-wider text-gray-800">
                        {d.code}
                      </p>
                      <p className="text-sm text-gray-600">
                        {d.value}% off your next order
                      </p>
                      {d.min_spend > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          Min. spend: {formatCurrency(d.min_spend)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Orders */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBox className="text-pink-500" /> Order History
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <FaBox className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No orders yet</p>
                  <Link
                    to="/services"
                    className="text-pink-600 font-semibold text-sm hover:text-pink-700 mt-2 inline-block"
                  >
                    Start shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide pr-1">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-gray-400">
                            #{order.order_reference}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.created_at).toLocaleDateString(
                              "en-NG",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            order.payment_status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.payment_status === "paid" ? "Paid" : "Unpaid"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {JSON.parse(order.items)
                          .slice(0, 3)
                          .map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2 py-1"
                            >
                              <img
                                src={item.img}
                                alt=""
                                className="w-6 h-6 rounded object-cover"
                              />
                              <span className="text-xs text-gray-600">
                                {item.name} x{item.quantity}
                              </span>
                            </div>
                          ))}
                        {JSON.parse(order.items).length > 3 && (
                          <span className="text-xs text-gray-400 self-center">
                            +{JSON.parse(order.items).length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                          {formatCurrency(order.total)}
                        </p>
                        <FaChevronRight className="text-xs text-gray-300" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
         <ToastContainer />
    </div>
  );
};

export default Profile;
