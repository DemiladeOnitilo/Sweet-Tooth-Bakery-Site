import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBell, FaShoppingCart, FaCheckCircle, FaTag, FaStar } from "react-icons/fa";
import { markAllRead, markOneRead } from "../store/notificationSlice";
import { getActiveProductNotifications } from "./notification";

const typeIcon = {
  new_arrival: <FaStar className="text-pink-500" />,
  promo: <FaTag className="text-purple-500" />,
  cart_add: <FaShoppingCart className="text-blue-500" />,
  checkout: <FaCheckCircle className="text-green-500" />,
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

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartNotifications, readIds } = useSelector(
    (state) => state.notifications
  );

  const productNotifs = getActiveProductNotifications();

  // Merge: product notifications first, then cart events
  const allNotifications = [
    ...productNotifs,
    ...cartNotifications,
  ];

  const unreadCount = allNotifications.filter(
    (n) => !readIds.includes(n.id)
  ).length;

  // Close panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

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
      {/* Bell button */}
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-pink-50 transition-all duration-300 group cursor-pointer"
        aria-label="Notifications"
      >
        <FaBell className="text-xl text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow animate-pulse px-1">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-[-40px] md:right-0 top-12 md:top-full mt-3 w-90 lg:w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-pink-600 hover:text-pink-800 font-medium transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {allNotifications.length === 0 ? (
              <div className="py-10 text-center">
                <FaBell className="text-3xl text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No notifications yet</p>
              </div>
            ) : (
              allNotifications.map((notif) => {
                const isRead = readIds.includes(notif.id);
                return (
                  <button
                    key={notif.id}
                    onClick={() => handleNotifClick(notif)}
                    className={`w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-pink-50 transition-colors duration-200 cursor-pointer ${
                      !isRead ? "bg-pink-50/40" : ""
                    }`}
                  >
                    <div className="mt-0.5 text-base flex-shrink-0">
                      {typeIcon[notif.type] || <FaBell className="text-gray-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold text-gray-800 ${!isRead ? "text-pink-700" : ""}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {timeAgo(notif.createdAt)}
                      </p>
                    </div>
                    {!isRead && (
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-1.5 flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          {allNotifications.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 text-center">
                Product alerts expire automatically · Cart events reset each session
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;