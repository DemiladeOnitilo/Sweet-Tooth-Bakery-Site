export const productnotification = [
  {
    id: "notif-001",
    type: "new_arrival",
    title: "Freshly Baked",
    message: "Our Signature Red Velvet Brownies are back — limited batch available!",
    productId: "brownies-RedVelvetBrownies", 
    expiresAt: "2026-12-01", 
    createdAt: "2026-01-01",
  },
  {
    id: "notif-002",
    type: "new_arrival",
    title: "New to the Menu",
    message: "Fully customizable artisanal cakes are now available for order.",
    productId: "custom-RegularCake", 
    expiresAt: "2026-12-20",
    createdAt: "2026-01-01",
  },
  {
    id: "notif-003",
    type: "promo",
    title: "Complimentary Delivery",
    message: "Order any 3 signature pastries and enjoy complimentary delivery this week.",
    productId: null, 
    expiresAt: "2026-12-10",
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
};