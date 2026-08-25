import React, { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaChevronRight,
  FaWhatsapp,
  FaCheck,
} from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { products } from "../components/products";
import CakeCard from "../components/CakeCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Carousel from "../components/Carousel";
import { toast, ToastContainer } from "react-toastify";
import Sliders from "../components/Sliders";

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currency, cartItems } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);
  const [selectedSizeObj, setSelectedSizeObj] = useState(null);

  // Customization states
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedIcing, setSelectedIcing] = useState("");
  const [cakeColor, setCakeColor] = useState("White / Standard");
  const [inscription, setInscription] = useState("");
  const [inscriptionStyle, setInscriptionStyle] = useState("Icing");

  const category = products.find((cat) =>
    cat.types.find((item) => item.id === id),
  );
  const product = category?.types?.find((item) => item.id === id);

  useEffect(() => {
    if (product) {
      if (product.size && product.size.length > 0) {
        setSelectedSizeObj(product.size[0]);
      } else {
        setSelectedSizeObj({ label: "Standard Size", modifier: 0 });
      }

      if (product.isCustomizableRegular) {
        setSelectedFlavor(product.flavors?.[0] || "Vanilla");
        setSelectedIcing(product.icings?.[0] || "Buttercream");
        setCakeColor("White / Standard");
        setInscription("");
        setInscriptionStyle("Icing");
      }
    }
  }, [product, id]);

  const relatedProducts =
    category?.types?.filter((item) => item.id !== id) || [];

  const recommendedItems = products
    .filter((cat) => cat.name !== category?.name)
    .flatMap((cat) => cat.types)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  const activePrice =
    product && selectedSizeObj && !product.isConsultationOnly
      ? parseFloat(product.price) + selectedSizeObj.modifier
      : 0;

  const customRegularLabel = product?.isCustomizableRegular
    ? `${selectedSizeObj?.label} | ${selectedFlavor} | ${selectedIcing} | (${cakeColor})`
    : selectedSizeObj?.label || "Standard Size";

  const isInCart = cartItems?.some(
    (item) => item.id === id && item.selectedSize === customRegularLabel,
  );

  const handleConsultationRedirect = () => {
    const businessNumber = "2348033226430";
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
          ? `Inscription: "${inscription.trim()}" | Style: ${inscriptionStyle}`
          : null,
      }),
    );

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
      <div className="flex justify-center items-center h-screen bg-[#FCFBF9]">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="#BE185D"
          ariaLabel="Loading product"
        />
      </div>
    );
  }

  if (!category || !category.types) return null;

  return (
    <div className="flex flex-col mt-24 lg:mt-32 pb-16">
      <div className="flex flex-col gap-6 p-6 lg:p-12 max-w-7xl mx-auto w-full bg-white rounded-2xl shadow-2xl">
        <nav className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-gray-400 body-text uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-[#BE185D] transition-colors">
            Home
          </Link>
          <FaChevronRight className="text-[8px]" />
          <Link
            to="/services"
            className="hover:text-[#BE185D] transition-colors"
          >
            Menu
          </Link>
          {category?.name && (
            <>
              <FaChevronRight className="text-[8px]" />
              <Link
                to={`/services/category/${category.name}`}
                className="hover:text-[#BE185D] transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <FaChevronRight className="text-[8px]" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative overflow-hidden rounded-3xl w-full aspect-[4/5] bg-gray-50 border border-gray-100">
              <img
                src={product.img}
                alt={`${product.name}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#BE185D]/0 group-hover:bg-[#BE185D]/10 transition-colors duration-500 pointer-events-none" />

              {isInCart && !product.isConsultationOnly && (
                <span className="absolute top-4 left-4 px-4 py-1.5 bg-white text-[#BE185D] body-text text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 shadow-sm rounded-full">
                  <FaCheck size={10} /> In Cart
                </span>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:py-4">
            <div className="flex flex-col gap-2">
              <span className="body-text text-[#BE185D] text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {category.name}
              </span>
              <h1 className="heading-text text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {product.isConsultationOnly ? (
                <div className="mt-2 inline-flex border border-gray-200 px-4 py-1.5 rounded-full text-sm body-text uppercase tracking-widest font-bold text-gray-600 bg-gray-50 w-fit">
                  Consultation Only
                </div>
              ) : (
                <p className="heading-text text-2xl md:text-3xl font-bold text-[#BE185D] mt-2">
                  {currency}
                  {activePrice.toLocaleString()}
                </p>
              )}
            </div>

            <p className="body-text text-base md:text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {product.isConsultationOnly && (
              <div className="border-t border-gray-100 pt-8 mt-2">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 space-y-5">
                  <h3 className="heading-text text-lg md:text-xl font-bold text-gray-900">
                    Bespoke Consultation
                  </h3>
                  <p className="body-text text-gray-600 text-sm leading-relaxed">
                    To ensure structural perfection and complete flavor
                    profiling for architectural pieces like{" "}
                    <strong>{product.name}</strong>, we handle orders via direct
                    consultation with our master decorators.
                  </p>
                  <button
                    onClick={handleConsultationRedirect}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white body-text font-bold uppercase tracking-widest px-6 py-4 rounded-full shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-xs"
                  >
                    <FaWhatsapp size={18} /> Chat via WhatsApp
                  </button>
                </div>
              </div>
            )}

            {!product.isConsultationOnly &&
              product.size &&
              product.size.length > 0 && (
                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <label className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {product.isCustomizableRegular
                      ? "1. Select Size"
                      : "Select Packaging"}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.size.map((sizeObj, index) => {
                      const isSelected =
                        selectedSizeObj?.label === sizeObj.label;
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedSizeObj(sizeObj)}
                          className={`px-5 py-2.5 body-text text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-[#BE185D] text-white border-[#BE185D] shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:border-gray-900"
                          }`}
                        >
                          {sizeObj.label}{" "}
                          {sizeObj.modifier > 0 &&
                            `(+${currency}${sizeObj.modifier.toLocaleString()})`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            {product.isCustomizableRegular && (
              <div className="space-y-5 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      2. Flavor Profile
                    </label>
                    <select
                      value={selectedFlavor}
                      onChange={(e) => setSelectedFlavor(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:bg-white text-gray-900"
                    >
                      {product.flavors?.map((flavor) => (
                        <option key={flavor} value={flavor}>
                          {flavor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      3. Icing Style
                    </label>
                    <select
                      value={selectedIcing}
                      onChange={(e) => setSelectedIcing(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:bg-white text-gray-900"
                    >
                      {product.icings?.map((icing) => (
                        <option key={icing} value={icing}>
                          {icing}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    4. Inscription Style (Optional)
                  </label>
                  <select
                    value={inscriptionStyle}
                    onChange={(e) => setInscriptionStyle(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:bg-white text-gray-900"
                  >
                    {product.inscriptionStyle?.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    5. Message (Optional)
                  </label>
                  <input
                    type="text"
                    value={inscription}
                    maxLength={50}
                    onChange={(e) => setInscription(e.target.value)}
                    placeholder="E.g., Happy 25th Birthday!"
                    className="w-full px-4 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:bg-white text-gray-900 placeholder-gray-400"
                  />
                  <span className="body-text text-[10px] text-gray-400 text-right uppercase tracking-wider font-bold">
                    {inscription.length}/50
                  </span>
                </div>
              </div>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="border-t border-gray-100 pt-6 space-y-3">
                <h3 className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Core Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 body-text text-[10px] uppercase tracking-wider font-bold rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!product.isConsultationOnly && (
              <div className="flex flex-col md:flex-row gap-4 border-t border-gray-100 pt-8 mt-auto">
                <div className="flex justify-center items-center gap-4 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-fit flex-shrink-0">
                  <button
                    onClick={decrementQuantity}
                    className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#BE185D] transition-colors cursor-pointer focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus size={10} />
                  </button>
                  <span className="heading-text text-lg font-bold text-gray-900 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#BE185D] transition-colors cursor-pointer focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center gap-3 bg-[#BE185D] text-white rounded-full px-8 py-4 body-text text-xs font-bold uppercase tracking-widest hover:bg-[#9D174D] shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  aria-label={`Add ${quantity} to cart`}
                >
                  <FaShoppingCart size={14} />
                  {isInCart ? "Add More" : "Add to Cart"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Carousel />

      {relatedProducts.length > 0 && (
        <div className="flex flex-col items-center gap-8 w-full py-16 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="body-text flex items-center gap-3 text-sm font-bold text-[#BE185D] tracking-widest uppercase">
              <span className="w-6 h-[1px] bg-[#BE185D]"></span>
              More from {category.name}
              <span className="w-6 h-[1px] bg-[#BE185D]"></span>
            </div>
            <h2 className="heading-text text-3xl md:text-4xl font-bold text-gray-900">
              Related <span className="text-[#BE185D] italic">Treats</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {relatedProducts.slice(0, 4).map((item) => (
              <CakeCard key={item.id} {...item} onPage={true} />
            ))}
          </div>
        </div>
      )}

      {recommendedItems.length > 0 && (
        <div className="flex flex-col items-center gap-8 w-full pb-20 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="body-text flex items-center gap-3 text-sm font-bold text-[#BE185D] tracking-widest uppercase">
              <span className="w-6 h-[1px] bg-[#BE185D]"></span>
              Discover More
              <span className="w-6 h-[1px] bg-[#BE185D]"></span>
            </div>
            <h2 className="heading-text text-3xl md:text-4xl font-bold text-gray-900">
              You Might Also <span className="text-[#BE185D] italic">Like</span>
            </h2>
          </div>
          <div className="w-full">
            <Sliders main={recommendedItems} onPage={true} autoPlay={true} />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Products;
