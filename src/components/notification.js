export const productnotification = [
  {
    id: "notif-001",
    type: "new_arrival",
    title: "New Arrival 🎉",
    message: "Red Velvet Brownies are here — limited batch!",
    productId: "brownies-RedVelvetBrownies", 
    expiresAt: "2026-08-01", 
    createdAt: "2026-01-01",
  },
  {
    id: "notif-002",
    type: "new_arrival",
    title: "Just Dropped 🍰",
    message: "Customizable Cakes!",
    productId: "custom-RegularCake", 
    expiresAt: "2026-07-20",
    createdAt: "2026-01-01",
  },
  {
    id: "notif-003",
    type: "promo",
    title: "Limited Offer 🔥",
    message: "Order any 3 pastries and get free delivery this week.",
    productId: null, 
    expiresAt: "2026-07-10",
    createdAt: "2026-01-01",
  },
];

export const getActiveProductNotifications = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    return productnotification.filter((notif) => {
        if (!notif.expiresAt) return true;
        const expiry = new Date(notif.expiresAt);
        return expiry >= today;
    });
}
