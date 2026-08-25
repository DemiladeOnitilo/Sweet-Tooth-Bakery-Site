import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaShoppingCart,
  FaCheckCircle,
  FaTag,
  FaStar,
} from "react-icons/fa";
import { markAllRead, markOneRead } from "../store/notificationSlice";
import { getActiveProductNotifications } from "./notification";

// Swapped generic colors for a cohesive, premium palette
const typeIcon = {
  new_arrival: <FaStar className="text-[#BE185D]" />,
  promo: <FaTag className="text-[#BE185D]" />,
  cart_add: <FaShoppingCart className="text-gray-800" />,
  checkout: <FaCheckCircle className="text-gray-800" />,
};

const timeAgo = (isoString) => {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const NotificationBell = ({ scrolled = false, isOpen: isNavOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartNotifications, readIds } = useSelector(
    (state) => state.notifications,
  );

  const productNotifs = getActiveProductNotifications();
  const allNotifications = [...productNotifs, ...cartNotifications];
  const unreadCount = allNotifications.filter(
    (n) => !readIds.includes(n.id),
  ).length;

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMarkAllRead = () => {
    dispatch(markAllRead(allNotifications.map((n) => n.id)));
  };

  const handleNotifClick = (notif) => {
    dispatch(markOneRead(notif.id));
    setIsOpen(false);
    if (notif.productId) {
      navigate(`/products/${notif.productId}`);
    } else {
      navigate("/services");
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative p-2 rounded-full transition-all duration-300 group cursor-pointer ${
          scrolled || isNavOpen ? "hover:bg-[#BE185D]/10" : "hover:bg-white/20"
        }`}
        aria-label="Notifications"
      >
        <FaBell
          className={`text-xl transition-colors duration-300 ${
            scrolled || isNavOpen
              ? "text-gray-900 group-hover:text-[#BE185D]"
              : "text-white group-hover:text-pink-100"
          }`}
        />
        {unreadCount > 0 && (
          <span className="body-text absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#BE185D] text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm animate-pulse px-1">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel (Desktop & Mobile Unified classes where possible) */}
      {isOpen && (
        <div className="absolute right-0 md:right-0 left-4 md:left-auto top-16 md:top-full mt-3 w-auto md:w-80 bg-white border border-gray-100 rounded-3xl shadow-xl z-50 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
            <h3 className="heading-text font-bold text-gray-900 text-sm tracking-widest uppercase">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="body-text text-[10px] text-[#BE185D] hover:text-[#9D174D] font-bold uppercase tracking-widest transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>
          
          {/* Notifications List */}
          <div className="max-h-[60vh] md:max-h-80 overflow-y-auto">
            {allNotifications.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <FaBell className="text-xl text-gray-300" />
                </div>
                <p className="body-text text-sm text-gray-400">No new notifications</p>
              </div>
            ) : (
              allNotifications.map((notif) => {
                const isRead = readIds.includes(notif.id);
                return (
                  <button
                    key={notif.id}
                    onClick={() => handleNotifClick(notif)}
                    className={`w-full text-left flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-50 last:border-0 ${
                      !isRead ? "bg-[#BE185D]/5" : "bg-white"
                    }`}
                  >
                    <div className="mt-1 text-base flex-shrink-0">
                      {typeIcon[notif.type] || <FaBell className="text-gray-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`heading-text text-sm font-bold ${!isRead ? "text-gray-900" : "text-gray-600"}`}>
                        {notif.title}
                      </p>
                      <p className="body-text text-xs text-gray-500 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <p className="body-text text-[10px] text-gray-400 mt-2 uppercase tracking-wider font-medium">
                        {timeAgo(notif.createdAt)}
                      </p>
                    </div>
                    {!isRead && (
                      <div className="w-2 h-2 bg-[#BE185D] rounded-full mt-1.5 flex-shrink-0 shadow-sm" />
                    )}
                  </button>
                );
              })
            )}
          </div>
          
          {/* Footer */}
          {allNotifications.length > 0 && (
            <div className="px-5 py-3 bg-[#FCFBF9] border-t border-gray-100">
              <p className="body-text text-[10px] text-gray-400 text-center uppercase tracking-wider">
                Product alerts expire automatically
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;