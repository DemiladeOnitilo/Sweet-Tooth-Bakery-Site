import React, { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaChevronRight,
  FaExclamationCircle,
  FaWhatsapp,
  FaPencilAlt,
  FaCheck,
} from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { products } from "../components/products";
import CakeCard from "../components/CakeCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Carousel from "../components/Carousel";
import { toast, ToastContainer } from "react-toastify";

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currency, cartItems } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);
  const [selectedSizeObj, setSelectedSizeObj] = useState(null);

  // Customization states — only active for isCustomizableRegular products
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedIcing, setSelectedIcing] = useState("");
  const [cakeColor, setCakeColor] = useState("White / Standard");
  const [inscription, setInscription] = useState("");

  const category = products.find((cat) =>
    cat.types.find((item) => item.id === id),
  );
  const product = category?.types?.find((item) => item.id === id);

  useEffect(() => {
    if (product) {
      // Set default size object — falls back to a zero-modifier standard for products without sizes
      if (product.size && product.size.length > 0) {
        setSelectedSizeObj(product.size[0]);
      } else {
        setSelectedSizeObj({ label: "Standard Size", modifier: 0 });
      }

      // Initialize customization defaults for customizable cakes only
      if (product.isCustomizableRegular) {
        setSelectedFlavor(product.flavors?.[0] || "Vanilla");
        setSelectedIcing(product.icings?.[0] || "Buttercream");
        setCakeColor("White / Standard");
        setInscription("");
      }
    }
  }, [product, id]);

  const relatedProducts =
    category?.types?.filter((item) => item.id !== id) || [];

  const recommendedItems = products
    .filter((cat) => cat.name !== category?.name)
    .flatMap((cat) => cat.types)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  // Safe price calculation — consultation products have no price field
  const activePrice =
    product && selectedSizeObj && !product.isConsultationOnly
      ? parseFloat(product.price) + selectedSizeObj.modifier
      : 0;

  // Compound label used as the cart row identifier
  const customRegularLabel = product?.isCustomizableRegular
    ? `${selectedSizeObj?.label} | ${selectedFlavor} | ${selectedIcing} | (${cakeColor})`
    : selectedSizeObj?.label || "Standard Size";

  const isInCart = cartItems?.some(
    (item) => item.id === id && item.selectedSize === customRegularLabel,
  );

  const handleConsultationRedirect = () => {
    const businessNumber = "2349044269908";
    const message = `Hello Sweet Tooth Bakery! I would love to schedule a consultation regarding a "${product.name}".`;
    window.open(
      `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleAddToCart = () => {
    if (!product || product.isConsultationOnly) return;

    dispatch(
      addToCart({
        product,
        selectedSize: customRegularLabel,
        price: activePrice,
        quantity,
        customNotes: inscription.trim()
          ? `Inscription: "${inscription.trim()}"`
          : null,
      }),
    );

    // Fixed: was interpolating product.size (array), now uses selectedSizeObj.label
    toast.success(
      `${quantity}x ${product.name} (${selectedSizeObj?.label}) added to cart!`,
      { position: "top-right", autoClose: 2000 },
    );

    setQuantity(1);
    setInscription("");
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  if (!product || !selectedSizeObj) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="rgb(236, 72, 153)"
          ariaLabel="Loading product"
        />
      </div>
    );
  }

  if (!category || !category.types) return null;

  return (
    <div className="flex flex-col lg:mt-40 mt-20">
      {/* ── Breadcrumb + Product Card ── */}
      <div className="flex flex-col gap-6 px-4 lg:px-16 max-w-7xl mx-auto w-full">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            to="/"
            className="hover:text-pink-600 transition-colors duration-300"
          >
            Home
          </Link>
          <FaChevronRight className="text-xs" />
          <Link
            to="/services"
            className="hover:text-pink-600 transition-colors duration-300"
          >
            Services
          </Link>
          {category?.name && (
            <>
              <FaChevronRight className="text-xs" />
              <Link
                to={`/services/category/${category.name}`}
                className="hover:text-pink-600 transition-colors duration-300"
              >
                {category.name}
              </Link>
            </>
          )}
          <FaChevronRight className="text-xs" />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-3xl shadow-xl p-8">
          {/* Left: Image */}
          <div className="flex items-center justify-center w-full lg:w-1/2 relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-xl w-full">
              <img
                src={product.img}
                alt={`${product.name}`}
                className="rounded-3xl h-[400px] lg:h-[550px] w-full items-center object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />

              {/* In Cart badge on image */}
              {isInCart && !product.isConsultationOnly && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-pink-600 rounded-full text-sm font-medium flex items-center gap-2 shadow-md">
                  <FaCheck size={12} />
                  In Cart
                </span>
              )}
            </div>
          </div>

          {/* Right: Configuration Panel */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Category label + Name */}
            <div>
              <span className="text-pink-600 text-sm font-semibold uppercase tracking-wide">
                {category.name}
              </span>
              <h1 className="text-4xl font-bold text-gray-800">
                {product.name}
              </h1>
            </div>

            {/* Price — consultation shows badge, regular shows gradient price */}
            {product.isConsultationOnly ? (
              <p className="text-2xl font-extrabold text-pink-600 bg-pink-50 w-fit px-4 py-2 border border-pink-100 rounded-2xl">
                By Consultation Only
              </p>
            ) : (
              <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {currency}
                {activePrice.toLocaleString()}
              </p>
            )}

            {/* Description — always shown */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* ─────────────────────────────────────────────
                BLOCK A: Consultation products only
                Shows WhatsApp booking. All other blocks below
                are hidden for consultation products.
            ───────────────────────────────────────────── */}
            {product.isConsultationOnly && (
              <div className="border-t border-gray-100 pt-6">
                <div className="bg-gradient-to-r from-pink-50/60 to-purple-50/60 border border-pink-100/60 rounded-2xl p-5 space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaExclamationCircle className="text-pink-500" />
                    Professional Consultation Booking
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To ensure structural accuracy and complete flavor profiling
                    for architectural pieces like{" "}
                    <strong>{product.name}</strong>, we handle orders via a
                    direct consultation. Connect with our decorators to build
                    your quote:
                  </p>
                  <button
                    onClick={handleConsultationRedirect}
                    className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-lg"
                  >
                    <FaWhatsapp size={24} />
                    Chat With Our Baker via WhatsApp
                  </button>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────
                BLOCK B: Size / Packaging selector
                Shown for any non-consultation product that
                has a size array (loaves, cupcakes, muffins,
                and customizable cakes).
            ───────────────────────────────────────────── */}
            {!product.isConsultationOnly &&
              product.size &&
              product.size.length > 0 && (
                <div className="border-t border-gray-100 pt-6 space-y-2">
                  <label className="text-sm font-semibold text-gray-800 block">
                    {product.isCustomizableRegular
                      ? "1. Select Cake Size:"
                      : "Select Packaging Option:"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.size.map((sizeObj, index) => {
                      const isSelected =
                        selectedSizeObj?.label === sizeObj.label;
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedSizeObj(sizeObj)}
                          className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 active:scale-95 cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-sm scale-105"
                              : "bg-white border-gray-200 text-gray-700 hover:border-pink-300"
                          }`}
                        >
                          {sizeObj.label} (+{currency}
                          {sizeObj.modifier.toLocaleString()})
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* ─────────────────────────────────────────────
                BLOCK C: Customization options
                Only shown for isCustomizableRegular products.
                Requires Block B to also render (size is step 1,
                these are steps 2–5).
            ───────────────────────────────────────────── */}
            {product.isCustomizableRegular && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700">
                      2. Cake Flavour Profile:
                    </label>
                    <select
                      value={selectedFlavor}
                      onChange={(e) => setSelectedFlavor(e.target.value)}
                      className="p-2.5 border border-gray-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-400 text-gray-700 font-medium"
                    >
                      {product.flavors?.map((flavor) => (
                        <option key={flavor} value={flavor}>
                          {flavor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-700">
                      3. Icing Coating Style:
                    </label>
                    <select
                      value={selectedIcing}
                      onChange={(e) => setSelectedIcing(e.target.value)}
                      className="p-2.5 border border-gray-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-400 text-gray-700 font-medium"
                    >
                      {product.icings?.map((icing) => (
                        <option key={icing} value={icing}>
                          {icing}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <FaPencilAlt size={11} className="text-pink-500" />
                    4. Cake Inscription Message (Optional):
                  </label>
                  <input
                    type="text"
                    value={inscription}
                    maxLength={50}
                    onChange={(e) => setInscription(e.target.value)}
                    placeholder="E.g., Happy 25th Birthday, Tunde! "
                    className="p-2.5 border border-gray-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
                  />
                  <span className="text-xs text-gray-400 text-right">
                    {inscription.length}/50
                  </span>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────
                BLOCK D: Ingredients
                Always shown for every product type.
            ───────────────────────────────────────────── */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="border-t border-gray-100 pt-6 space-y-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  Ingredients
                </h2>
                {product.ingredients && product.ingredients.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200/50 text-gray-700 text-sm rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    No ingredients listed.
                  </p>
                )}
              </div>
            )}

            {/* ─────────────────────────────────────────────
                BLOCK E: Quantity selector + Add to Cart
                Hidden for consultation-only products.
                Shown for all regular, sized, and customizable
                products.
            ───────────────────────────────────────────── */}
            {!product.isConsultationOnly && (
              <div className="flex gap-4 border-t border-gray-100 pt-6 mt-auto">
                <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full px-4 py-2 w-fit flex-shrink-0">
                  <button
                    onClick={decrementQuantity}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-pink-600 hover:text-pink-700 transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="text-xl font-bold text-gray-800 w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-pink-600 hover:text-pink-700 transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                    aria-label="Increase quantity"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="group/btn relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium text-lg flex-grow flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-102 cursor-pointer"
                  aria-label={`Add ${quantity} ${product.name} to cart`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaShoppingCart size={20} />
                    {isInCart ? "Add More to Cart" : "Add to Cart"}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-bleed carousel */}
      <Carousel />

      {/* Related Offers */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col items-center gap-10 w-full py-16 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30">
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium">
              🍰 More from {category.name}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Related Offers
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl w-full">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="h-full transform transition-all duration-300 hover:scale-105"
              >
                <CakeCard {...item} onPage={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* You Might Also Like — fixed: was isHome={true} which links to category URLs
          using individual product ids, producing broken /services/category/brownies-ChocolateBrownie
          routes. onPage={true} correctly links to /products/${id} */}
      {recommendedItems.length > 0 && (
        <div className="flex flex-col items-center gap-10 w-full pb-20 px-4 pt-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium">
              ✨ Discover More
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                You Might Also Like
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl w-full">
            {recommendedItems.map((item) => (
              <div
                key={item.id}
                className="h-full transform transition-all duration-300 hover:scale-105"
              >
                <CakeCard {...item} onPage={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Products;
