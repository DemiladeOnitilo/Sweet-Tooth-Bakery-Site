import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    cartNotifications: [], // runtime events
    readIds: JSON.parse(localStorage.getItem("st_read_notif_ids") || "[]"),
  },
  reducers: {
    pushCartNotification: (state, action) => {
      // action.payload: { id, type, title, message, productId? }
      const notif = {
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.cartNotifications.unshift(notif);
      // keep last 10 cart notifications only
      state.cartNotifications = state.cartNotifications.slice(0, 10);
    },

    markAllRead: (state, action) => {
      // action.payload: array of all current notification ids
      state.readIds = [...new Set([...state.readIds, ...action.payload])];
      localStorage.setItem(
        "st_read_notif_ids",
        JSON.stringify(state.readIds)
      );
    },

    markOneRead: (state, action) => {
      if (!state.readIds.includes(action.payload)) {
        state.readIds.push(action.payload);
        localStorage.setItem(
          "st_read_notif_ids",
          JSON.stringify(state.readIds)
        );
      }
    },

    clearCartNotifications: (state) => {
      state.cartNotifications = [];
    },
  },
});

export const {
  pushCartNotification,
  markAllRead,
  markOneRead,
  clearCartNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;