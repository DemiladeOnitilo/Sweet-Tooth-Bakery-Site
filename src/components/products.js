//Brownies
import ChocolateBrownies from "../assets/Images/Sweet tooth pastries list/Brownies/Chocolate Brownies.webp"
import DoubleFudgeBrownies from "../assets/Images/Sweet tooth pastries list/Brownies/DoubleFudge brownies.jpg"
import LemonDrizzleBrownies from "../assets/Images/Sweet tooth pastries list/Brownies/Lemon Drizzle brownies.jpg"
import NuttyBrownies from "../assets/Images/Sweet tooth pastries list/Brownies/Nutty Brownies.jpg"
import RaisinBrownies from "../assets/Images/Sweet tooth pastries list/Brownies/Raisin Brownies.jpg"
import RedVelvetBrownies from "../assets/Images/Sweet tooth pastries list/Brownies/RedVelvet Brownies.jpg"
//Cake Slices
import VanillaCakeSlice from "../assets/Images/Sweet tooth pastries list/Cake Slices/Vanilla Cake slice.jpg"
import ChocolateCakeSlice from "../assets/Images/Sweet tooth pastries list/Cake Slices/Chocolate Cake Slice.jpg"
import RedVelvetCakeSlice from "../assets/Images/Sweet tooth pastries list/Cake Slices/Red Velvet Cake slices.jpg"
import MarbleCakeSlice from "../assets/Images/Sweet tooth pastries list/Cake Slices/Marble Cake Slice.jpg"
import LemonCakeSlice from "../assets/Images/Sweet tooth pastries list/Cake Slices/Lemon Cake Slices.jpg"
import RaisinCakeSlice from "../assets/Images/Sweet tooth pastries list/Cake Slices/Raisin cake Slices.jpg"
//Cake Loaves
import VanillaCakeLoaf from "../assets/Images/Sweet tooth pastries list/Cake Loaves/Vanilla Cake loaf.jpg"
import ChocolateCakeLoaf from "../assets/Images/Sweet tooth pastries list/Cake Loaves/Chocolate Cake Loaf.jpg"
import RedVelvetCakeLoaf from "../assets/Images/Sweet tooth pastries list/Cake Loaves/Red velvet Cake Loaf.jpg"
import MarbleCakeLoaf from "../assets/Images/Sweet tooth pastries list/Cake Loaves/Marble Cake Loaf.jpg"
import LemonCakeLoaf from "../assets/Images/Sweet tooth pastries list/Cake Loaves/Lemon Cake Loaf.jpg"
import RaisinCakeLoaf from "../assets/Images/Sweet tooth pastries list/Cake Loaves/Raisin Cake Loaf.jpg"
//Cookies
import PlainCookies from "../assets/Images/Sweet tooth pastries list/Cookies/Plain Cookies.webp"
import MilkCookies from "../assets/Images/Sweet tooth pastries list/Cookies/Milk Cookies.webp"
import PeanutButterCookies from "../assets/Images/Sweet tooth pastries list/Cookies/Peanut Butter Cookies.jpg"
import MarbleCookies from "../assets/Images/Sweet tooth pastries list/Cookies/Marble Cookies.jpg"
import LemonCookies from "../assets/Images/Sweet tooth pastries list/Cookies/Lemon Cookies.jpg"
import DoubleChocolateCookies from "../assets/Images/Sweet tooth pastries list/Cookies/Double Chocolate Cookies.jpg"
import ChocolateChipCookies from "../assets/Images/Sweet tooth pastries list/Cookies/Chocolate Chip Cookies.jpg"
//Cupcakes
import VanillaCupcakes from "../assets/Images/Sweet tooth pastries list/Cupcakes/Vanilla Cupcakes.jpg"
import ChocolateCupcakes from "../assets/Images/Sweet tooth pastries list/Cupcakes/Chocolate cupcakes.webp"
import RedVelvetCupcakes from "../assets/Images/Sweet tooth pastries list/Cupcakes/Redvelvet Cupcake.jpg"
import MarbleCupcakes from "../assets/Images/Sweet tooth pastries list/Cupcakes/Marble Cupcake.jpg"
import LemonCupcakes from "../assets/Images/Sweet tooth pastries list/Cupcakes/Lemon Cupcake.jpg"
import RaisinCupcakes from "../assets/Images/Sweet tooth pastries list/Cupcakes/Raisin Cupcake.jpg"
//Parfait
import ChocolateParfait from "../assets/Images/Sweet tooth pastries list/Parfait/Chocolate-Parfait-20.jpg"
import RedVelvetParfait from "../assets/Images/Sweet tooth pastries list/Parfait/Red velvet Parfait.png"
import VanillaParfait from "../assets/Images/Sweet tooth pastries list/Parfait/Vanilla Parfait.png"
//Muffins
import PlainMuffins from "../assets/Images/Sweet tooth pastries list/Muffins/Plain Muffin.jpg"
import ChocolateChipMuffins from "../assets/Images/Sweet tooth pastries list/Muffins/Chocolate Chip Muffin.jpg"
import RaisinMuffins from "../assets/Images/Sweet tooth pastries list/Muffins/Raisin Muffin.jpg"
import DoubleChocolateMuffins from "../assets/Images/Sweet tooth pastries list/Muffins/Double Chocolate Muffin.jpg"
import BananaNutMuffins from "../assets/Images/Sweet tooth pastries list/Muffins/Banana Nut Muffin.jpg"
//Madeleines
import PlainMadeleines from "../assets/Images/Sweet tooth pastries list/Madeleines/Plain Madeleines.jpg"
import ChocolateMadeleines from "../assets/Images/Sweet tooth pastries list/Madeleines/Chocolate madeleines.jpg"
import LemonMadeleines from "../assets/Images/Sweet tooth pastries list/Madeleines/Lemon madeleines.jpg"    
import MarbleMadeleines from "../assets/Images/Sweet tooth pastries list/Madeleines/marble Madeleines.jpg"
//Pastries
import Doughnuts from "../assets/Images/Sweet tooth pastries list/Pastries/Doughnuts.jpg"
import MeatPie from "../assets/Images/Sweet tooth pastries list/Pastries/Meat Pie.jpg"
import SausageRolls from "../assets/Images/Sweet tooth pastries list/Pastries/Sausage Rolls.jpg"
import ScotchedEggs from "../assets/Images/Sweet tooth pastries list/Pastries/Scotched Eggs.jpg"
//CustomCakes
import BirthdayCake from "../assets/Images/Sweet tooth pastries list/Custom Cakes/Birthday Cakes.jpg"
import CustomizableCakes from "../assets/Images/Sweet tooth pastries list/Custom Cakes/Customizable Cakes.jpg"
import SpecialOccasionCake from "../assets/Images/Sweet tooth pastries list/Custom Cakes/Special occasions Cakes.jpg"
import WeddingCake from "../assets/Images/Sweet tooth pastries list/Custom Cakes/Wedding Cakes.jpg"

export const products = [
    {
        id: "brownies",
        img: ChocolateBrownies,
        name: "Brownies",
        description: "Rich, Fudgy and impossible to share. Baked fresh every morning",
        types: [
            {
                id: "brownies-ChocolateBrownie",
                img: ChocolateBrownies,
                name: "Chocolate Brownies",
                price: "3500",
                description: "Rich and fudgy chocolate brownies with a gooey center.",
                ingredients: ["Cocoa powder", "Butter", "Sugar", "Eggs", "Flour", "Vanilla extract"]
            },
            {
                id: "brownies-DoubleFudgeBrownie",
                img: DoubleFudgeBrownies,
                name: "Double Fudge Brownies",
                price: "4000",
                description: "Extra fudgy brownies with a double dose of chocolate.",
                ingredients: ["Dark chocolate", "Butter", "Sugar", "Eggs", "Flour", "Chocolate chips"]
            },
            {
                id: "brownies-RedVelvetBrownies",
                img: RedVelvetBrownies,
                name: "Red Velvet Brownies",
                price: "4000",
                description: "Soft and chewy red velvet brownies with a hint of cocoa and a striking red color.",
                ingredients: ["Cocoa powder", "Butter", "Sugar", "Eggs", "Flour", "Red food coloring"]
            },
            {
                id: "brownies-LemonDrizzleBrownies",
                img: LemonDrizzleBrownies,
                name: "Lemon Drizzle Brownies",
                price: "3800",
                description: "Soft and tangy blondie-style lemon brownies finished with a refreshing citrus glaze.",
                ingredients: ["Lemon juice", "Lemon zest", "Butter", "Sugar", "Eggs", "Flour"]
            },
            {
                id: "brownies-NuttyBrownies",
                img: NuttyBrownies,
                name: "Nutty Brownies",
                price: "4500",
                description: "Classic rich chocolate brownies loaded with a crunchy blend of premium chopped nuts.",
                ingredients: ["Cocoa powder", "Butter", "Sugar", "Eggs", "Flour", "Mixed nuts"]
            },
            {
                id: "brownies-RaisinBrownies",
                img: RaisinBrownies,
                name: "Raisin Brownies",
                price: "3800",
                description: "Fudgy chocolate brownies packed with sweet, chewy plump raisins.",
                ingredients: ["Cocoa powder", "Butter", "Sugar", "Eggs", "Flour", "Raisins"]
            }
        ],
    },
    {
        id: "cakesSlices",
        img: VanillaCakeSlice,
        name: "Cake Slices", 
        description: "Every slice tells a story — moist layers, bold frosting, made for any occasion.",           
        types: [
            {
                id: "cakeSlice-VanillaCakeSlice",
                img: VanillaCakeSlice,
                name: "Vanilla Cake Slice",
                price: "5000",
                description: "Classic vanilla cake with a soft, fluffy texture and rich buttercream frosting.",
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla extract", "Milk"]
            },
            {
                id: "cakeSlice-ChocolateCakeSlice",
                img: ChocolateCakeSlice,
                name: "Chocolate Cake Slice",
                price: "5500",
                description: "Moist and rich chocolate cake layers with a creamy chocolate frosting.",
                ingredients: ["Cocoa powder", "Flour", "Butter", "Sugar", "Eggs", "Milk"]
            },
            {
                id: "cakeSlice-RedVelvetCakeSlice",
                img: RedVelvetCakeSlice,
                name: "Red Velvet Cake Slice",
                price: "6000",
                description: "Velvety smooth red cake with a subtle hint of cocoa and decadent cream cheese frosting.",
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Cocoa powder", "Red food coloring", "Cream cheese"]
            },
            {
                id: "cakeSlice-LemonCakeSlice",
                img: LemonCakeSlice,
                name: "Lemon Cake Slice",
                price: "5500",
                description: "Bright and zesty lemon cake layers topped with a refreshing citrus glaze frosting.",
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Lemon juice", "Lemon zest", "Milk"]
            },
            {
                id: "cakeSlice-MarbleCakeSlice",
                img: MarbleCakeSlice,
                name: "Marble Cake Slice",
                price: "5500",
                description: "Beautifully swirled ribbons of classic vanilla and rich chocolate cake layers.",
                ingredients: ["Flour", "Cocoa powder", "Butter", "Sugar", "Eggs", "Milk", "Vanilla extract"]
            },
            {
                id: "cakeSlice-RaisinCakeSlice",
                img: RaisinCakeSlice,
                name: "Raisin Cake Slice",
                price: "5000",
                description: "Traditional, moist fruit loaf style cake loaded with sweet, plump raisins.",
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Raisins", "Milk", "Spices"]
            }
        ],
    },
    {
        id: "cakeLoaves",
        img: VanillaCakeLoaf,
        name: "Cake Loaves",
        description: "Golden, dense, and deeply satisfying. Perfect for sharing over tea or gifting whole.",
        types: [
            {
                id: "loaves-VanillaCakeLoaf",
                img: VanillaCakeLoaf,
                name: "Vanilla Cake Loaf",
                price: "8000", // Standardized to reflect the entry price tier (Small)
                description: "Rich, dense, and incredibly moist vanilla pound cake loaf baked to golden perfection.",
                size: [
                    { label: "Small Loaf", modifier: 0 },       // ₦8,000 + 0 = ₦8,000
                    { label: "Medium Loaf", modifier: 4000 },   // ₦8,000 + 4,000 = ₦12,000
                    { label: "Large Loaf", modifier: 8000 }     // ₦8,000 + 8,000 = ₦16,000
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla extract", "Buttermilk"]
            },
            {
                id: "loaves-ChocolateCakeLoaf",
                img: ChocolateCakeLoaf,
                name: "Chocolate Cake Loaf",
                price: "9500",
                description: "Deep, intense chocolate loaf cake finished with a premium cocoa glaze.",
                size: [
                    { label: "Small Loaf", modifier: 0 },
                    { label: "Medium Loaf", modifier: 4000 },
                    { label: "Large Loaf", modifier: 8000 }
                ],
                ingredients: ["Cocoa powder", "Dark chocolate", "Flour", "Butter", "Sugar", "Eggs", "Milk"]
            },
            {
                id: "loaves-RedVelvetCakeLoaf",
                img: RedVelvetCakeLoaf,
                name: "Red Velvet Cake Loaf",
                price: "11000",
                description: "Sumptuous and striking red velvet loaf cake, perfect for sharing.",
                size: [
                    { label: "Small Loaf", modifier: 0 },
                    { label: "Medium Loaf", modifier: 4000 },
                    { label: "Large Loaf", modifier: 8000 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Cocoa powder", "Red food coloring", "Buttermilk"]
            },
            {
                id: "loaves-MarbleCakeLoaf",
                img: MarbleCakeLoaf,
                name: "Marble Cake Loaf",
                price: "10000",
                description: "An elegant full loaf featuring marbled swirls of dark chocolate and vanilla batters.",
                size: [
                    { label: "Small Loaf", modifier: 0 },
                    { label: "Medium Loaf", modifier: 4000 },
                    { label: "Large Loaf", modifier: 8000 }
                ],
                ingredients: ["Flour", "Cocoa powder", "Butter", "Sugar", "Eggs", "Milk", "Vanilla extract"]
            },
            {
                id: "loaves-LemonCakeLoaf",
                img: LemonCakeLoaf,
                name: "Lemon Cake Loaf",
                price: "10500",
                description: "Zesty lemon loaf cake drenched with a vibrant sweet lemon juice drizzle.",
                size: [
                    { label: "Small Loaf", modifier: 0 },
                    { label: "Medium Loaf", modifier: 4000 },
                    { label: "Large Loaf", modifier: 8000 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Lemon juice", "Lemon zest", "Milk"]
            },
            {
                id: "loaves-RaisinCakeLoaf",
                img: RaisinCakeLoaf,
                name: "Raisin Cake Loaf",
                price: "9000",
                description: "Traditional English style tea cake loaf heavily packed with premium sweet raisins.",
                size: [
                    { label: "Small Loaf", modifier: 0 },
                    { label: "Medium Loaf", modifier: 4000 },
                    { label: "Large Loaf", modifier: 8000 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Raisins", "Milk", "Mixed spice"]
            }
        ]
    },
    {
        id: "cookies",
        img: ChocolateChipCookies,
        name: "Cookies",
        description: "Crispy edges, chewy centres. The kind you hide from everyone else.",
        types: [
            {
                id: "cookies-PlainCookies",
                img: PlainCookies,
                name: "Plain Cookies",
                price: "1000",
                description: "Simple and buttery sugar cookies with a soft and chewy texture.",
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla extract"]
            },
            {
                id: "cookies-MilkCookies",
                img: MilkCookies,
                name: "Milk Cookies",
                price: "1200",
                description: "Creamy, rich cookies crafted with a distinct milky sweetness.",
                ingredients: ["Flour", "Butter", "Sugar", "Milk powder", "Condensed milk", "Eggs"]
            },
            {
                id: "cookies-PeanutButterCookies",
                img: PeanutButterCookies,
                name: "Peanut Butter Cookies",
                price: "1200",
                description: "Rich and nutty peanut butter cookies with a soft texture.",
                ingredients: ["Peanut butter", "Flour", "Butter", "Sugar", "Eggs"]
            },
            {
                id: "cookies-MarbleCookies",
                img: MarbleCookies,
                name: "Marble Cookies",
                price: "1200",
                description: "Visually stunning cookies featuring swirled vanilla and chocolate dough layers.",
                ingredients: ["Flour", "Cocoa powder", "Butter", "Sugar", "Eggs", "Vanilla extract"]
            },
            {
                id: "cookies-LemonCookies",
                img: LemonCookies,
                name: "Lemon Cookies",
                price: "1200",
                description: "Zesty, citrusy cookies infused with real lemon juices and sugary hints.",
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Lemon juice", "Lemon zest"]
            },
            {
                id: "cookies-DoubleChocolateCookies",
                img: DoubleChocolateCookies,
                name: "Double Chocolate Cookies",
                price: "1500",
                description: "Soft and chewy chocolate cookies loaded with deep cocoa and chocolate chunks.",
                ingredients: ["Cocoa powder", "Flour", "Butter", "Sugar", "Eggs", "Chocolate chunks"]
            },
            {
                id: "cookies-ChocolateChipCookies",
                img: ChocolateChipCookies,
                name: "Chocolate Chip Cookies",
                price: "1200",
                description: "Classic chocolate chip cookies with a chewy center and crispy edges.",
                ingredients: ["Flour", "Butter", "Sugar", "Brown sugar", "Eggs", "Chocolate chips"]
            }
        ],
    },
   {   
        id: "cupcakes",
        img: VanillaCupcakes,
        name: "Cupcakes",description: "Little towers of joy — fluffy sponge, generous frosting, endlessly giftable.",
        types: [
            {
                id: "cupcakes-VanillaCupcakes",
                img: VanillaCupcakes,
                name: "Vanilla Cupcakes",
                price: "4800", // Base price for a Pack of 4 (₦1,200 each)
                description: "Classic vanilla cupcakes with a light and fluffy texture, frosted beautifully.",
                size: [
                    { label: "Pack of 4", modifier: 0 },       // ₦4,800
                    { label: "Pack of 6", modifier: 2400 },    // ₦4,800 + 2,400 = ₦7,200
                    { label: "Pack of 12", modifier: 9600 }    // ₦4,800 + 9,600 = ₦14,400
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla extract", "Milk"]
            },
            {
                id: "cupcakes-ChocolateCupcakes",
                img: ChocolateCupcakes,
                name: "Chocolate Cupcakes",
                price: "4800",
                description: "Rich and moist chocolate cupcakes topped with a velvety smooth cocoa frosting.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 2400 },
                    { label: "Pack of 12", modifier: 9600 }
                ],
                ingredients: ["Cocoa powder", "Flour", "Butter", "Sugar", "Eggs", "Milk"]
            },
            {
                id: "cupcakes-RedVelvetCupcakes",
                img: RedVelvetCupcakes,
                name: "Red Velvet Cupcakes",
                price: "6000", // Premium base price for a Pack of 4 (₦1,500 each)
                description: "Velvety red cupcakes with a hint of cocoa and luxurious cream cheese frosting.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 3000 },
                    { label: "Pack of 12", modifier: 12000 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Cocoa powder", "Red food coloring", "Cream cheese"]
            },
            {
                id: "cupcakes-MarbleCupcakes",
                img: MarbleCupcakes,
                name: "Marble Cupcakes",
                price: "4800",
                description: "Artfully swirled combinations of vanilla and dark cocoa cupcake batter.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 2400 },
                    { label: "Pack of 12", modifier: 9600 }
                ],
                ingredients: ["Flour", "Cocoa powder", "Butter", "Sugar", "Eggs", "Milk"]
            },
            {
                id: "cupcakes-LemonCupcakes",
                img: LemonCupcakes,
                name: "Lemon Cupcakes",
                price: "5600", // Base price for a Pack of 4 (₦1,400 each)
                description: "Bright and zesty cupcakes spiked with citrus juices and lemon frosting.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 2800 },
                    { label: "Pack of 12", modifier: 11200 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Lemon juice", "Lemon zest", "Milk"]
            },
            {
                id: "cupcakes-RaisinCupcakes",
                img: RaisinCupcakes,
                name: "Raisin Cupcakes",
                price: "4800",
                description: "Soft sponge cupcakes scattered with sweet raisins throughout.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 2400 },
                    { label: "Pack of 12", modifier: 9600 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Raisins", "Milk"]
            }
        ],
    },
    {
        id: "parfait",
        img: VanillaParfait,
        name: "Parfait",
        description: "Layered elegance in a jar. Cool, creamy, and built to impress at first glance.",
        types: [
            {
                id: "parfait-VanillaCakeParfait",
                img: VanillaParfait,
                name: "Vanilla Cake Parfait",
                price: "4500",
                description: "Layered luxury featuring smooth vanilla yogurt, fresh fruit compote, and crunchy granola.",
                ingredients: ["Yogurt", "Granola", "Honey", "Vanilla extract", "Fresh fruits"]
            },
            {
                id: "parfait-ChocolateCakeParfait",
                img: ChocolateParfait,
                name: "Chocolate Cake Parfait",
                price: "5000",
                description: "Decadent chocolate parfait with layers of rich mousse and whipped cream toppings.",
                ingredients: ["Chocolate mousse", "Whipped cream", "Chocolate shavings"]
            },
            {
                id: "parfait-RedVelvetCakeParfait",
                img: RedVelvetParfait,
                name: "Red Velvet CakeParfait",
                price: "5500",
                description: "Stunning dessert jars containing red velvet cake crumbs layered with luxurious cream cheese whip.",
                ingredients: ["Red velvet cake crumbs", "Cream cheese frosting", "Whipped cream"]
            }
        ],
    },
    {
        id: "muffins",
        img: BananaNutMuffins,
        name: "Muffins",
        description: "Domed, golden, and packed with flavour. Morning comfort you'll look forward to.",
        types: [
            {
                id: "muffins-PlainMuffins",
                img: PlainMuffins,
                name: "Plain Muffins",
                price: "4800", // Base price for a Pack of 4 (₦1,200 each)
                description: "Classic, moist golden breakfast muffin with a delicate dome surface.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 2400 },
                    { label: "Pack of 12", modifier: 9600 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Milk", "Baking powder"]
            },
            {
                id: "muffins-ChocolateChipMuffins",
                img: ChocolateChipMuffins,
                name: "Chocolate Chip Muffins",
                price: "6000", // Base price for a Pack of 4 (₦1,500 each)
                description: "Soft sweet muffins heavily spiked with semi-sweet chocolate chips.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 3000 },
                    { label: "Pack of 12", modifier: 12000 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Milk", "Chocolate chips"]
            },
            {
                id: "muffins-RaisinMuffins",
                img: RaisinMuffins,
                name: "Raisin Muffins",
                price: "5600", // Base price for a Pack of 4 (₦1,400 each)
                description: "Hearty morning muffins mixed with soft, sweet dried raisin pockets.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 2800 },
                    { label: "Pack of 12", modifier: 11200 }
                ],
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Milk", "Raisins"]
            },
            {
                id: "muffins-DoubleChocolateMuffins",
                img: DoubleChocolateMuffins,
                name: "Double Chocolate Muffins",
                price: "6400", // Base price for a Pack of 4 (₦1,600 each)
                description: "Ultimate cocoa-rich muffin dough combined with extra chocolate chunks.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 3200 },
                    { label: "Pack of 12", modifier: 12800 }
                ],
                ingredients: ["Flour", "Cocoa powder", "Butter", "Sugar", "Eggs", "Chocolate chunks"]
            },
            {
                id: "muffins-BananaNutMuffins",
                img: BananaNutMuffins,
                name: "Banana Nut Muffins",
                price: "7200", // Base price for a Pack of 4 (₦1,800 each)
                description: "Wholesome muffins made with real mashed ripe bananas and crunchy premium walnuts.",
                size: [
                    { label: "Pack of 4", modifier: 0 },
                    { label: "Pack of 6", modifier: 3600 },
                    { label: "Pack of 12", modifier: 14400 }
                ],
                ingredients: ["Flour", "Mashed bananas", "Walnuts", "Butter", "Sugar", "Eggs"]
            }
        ]
    },
    {
        id: "madeleines",
        img: PlainMadeleines,
        name: "Madeleines",
        description: "Shell-shaped French classics with a buttery crumb. Delicate, refined, and gone too fast.",
        types: [
            {
                id: "madeleines-PlainMadeleines",
                img: PlainMadeleines,
                name: "Plain Madeleines",
                price: "1500",
                description: "Classic shell-shaped French sponge cakes with delicate buttery borders.",
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla extract"]
            },
            {
                id: "madeleines-ChocolateMadeleines",
                img: ChocolateMadeleines,
                name: "Chocolate Madeleines",
                price: "1800",
                description: "Elegant sponge shell pastries enhanced with deep melted French chocolate.",
                ingredients: ["Flour", "Cocoa powder", "Butter", "Sugar", "Eggs", "Dark chocolate"]
            },
            {
                id: "madeleines-LemonMadeleines",
                img: LemonMadeleines,
                name: "Lemon Madeleines",
                price: "1600",
                description: "Shell sponge cakes balanced nicely with fragrant lemon zest and citrus juice.",
                ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Lemon zest", "Lemon juice"]
            },
            {
                id: "madeleines-MarbleMadeleines",
                img: MarbleMadeleines,
                name: "Marble Madeleines",
                price: "1800",
                description: "Beautifully patterned shell cakes featuring dual-toned chocolate and vanilla loops.",
                ingredients: ["Flour", "Cocoa powder", "Butter", "Sugar", "Eggs", "Vanilla extract"]
            }
        ]
    },
    {
        id: "pastries",
        img: MeatPie,
        name: "Pastries",
        description: "Flaky, golden, and savory. The kind of snack that disappears at every gathering.",
        types: [
            {
                id: "pastries-MeatPie",
                img: MeatPie,
                name: "Meat Pie",
                price: "1500",
                description: "Savory meat pie filled with spiced ground beef and vegetables inside a golden crust.",
                ingredients: ["Flour", "Butter", "Ground beef", "Carrots", "Potatoes", "Onions"]
            },
            {
                id: "pastries-SausageRolls",
                img: SausageRolls,
                name: "Sausage Rolls",
                price: "1200",
                description: "Flaky puff pastry rolled securely around seasoned sausage meat fillings.",
                ingredients: ["Flour", "Butter", "Sausage meat", "Eggs"]
            },
            {
                id: "pastries-ScotchedEggs",
                img: ScotchedEggs,
                name: "Scotched Eggs",
                price: "1000",
                description: "Boiled eggs wrapped completely in sausage meat and crisp golden breadcrumbs.",
                ingredients: ["Eggs", "Sausage meat", "Breadcrumbs", "Flour", "Oil"]
            },
            {
                id: "pastries-Doughnuts",
                img: Doughnuts,
                name: "Doughnuts",
                price: "900",
                description: "Soft and fluffy fried yeast doughnuts glazed with standard or sugar coat dustings.",
                ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Milk", "Yeast"]
            }
        ]
    },
    // Locate the "customCakes" block inside your products.js file and substitute it with this layout:
{
    id: "customCakes",
    img: WeddingCake,
    name: "Custom Cakes",
    description: "Your vision, our craft. From grand wedding tiers to personal birthday creations — built for your moment.",
    types: [
        {
            id: "custom-WeddingCake",
            img: WeddingCake,
            name: "Wedding Cake",
            isConsultationOnly: true, 
            description: "Strictly by consultation. Grand matrimonial showstopper cakes crafted explicitly to fit your celebration's theme, size, and guest count.",
        },
        {
            id: "custom-BirthdayCake",
            img: BirthdayCake,
            name: "Custom Birthday Cake",
            isConsultationOnly: true,
            description: "Strictly by consultation. Fully tailored theme cakes, 3D character molding, and advanced structural birthday cake designs.",
        },
        {
            id: "custom-SpecialOccasionCake",
            img: SpecialOccasionCake,
            name: "Special Occasion Cake",
            isConsultationOnly: true,
            description: "Strictly by consultation. Premium customized cakes dedicated to anniversaries, massive milestones, corporate functions, or 3D sculpts (e.g., Golf Courses).",
        },
        {
            id: "custom-RegularCake",
            img: CustomizableCakes, 
            name: "Regular Customizable Cake",
            price: "25000", 
            isCustomizableRegular: true, 
            description: "Our signature preset plain cake layers. Clean, elegant, no custom 3D designs—perfectly customized by your flavor, icing base, and personal inscription.",
            size: [
                { label: "8-Inch Round (Standard)", modifier: 0 },
                { label: "10-Inch Round (Medium)", modifier: 10000 },
                { label: "12-Inch Round (Large)", modifier: 20000 }
            ],
            flavors: ["Vanilla", "Chocolate", "Red Velvet", "Marble", "Lemon"],
            icings: ["Buttercream", "Fondant", "Whipped Cream"],
            ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Milk", "Flavour choices"],
            inscription: ""
        }
    ]
}
];
