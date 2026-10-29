export interface Product {
  id: string;
  name: string;
  shortName?: string;
  price: number;
  rating: number;
  reviews: number;
  img: string;
  flavour: string;
  category: string; // Birthday | Anniversary | Love & Romance | Theme Cakes | Cupcakes | Hamper
  occasions: string[];
  desc: string;
  type: 'cake' | 'hamper';
  tag?: string;
  inStock?: boolean;
  stockCount?: number;
}

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

export const IMG = {
  hero: './images/hero-home.jpg',
  redVelvet: './images/cake-redvelvet.jpg',
  pineapple: './images/cake-pineapple.jpg',
  blackForest: './images/cake-blackforest.jpg',
  butterscotch: './images/cake-butterscotch.jpg',
  floral: './images/cake-floral.jpg',
  heart: './images/cake-heart.jpg',
  theme: './images/cake-theme.jpg',
  hamperHero: './images/hamper-hero.jpg',
  strawberry: './images/cake-strawberry.jpg',
  vanilla: px(36497518),
  mixFruit: px(1027811),
  fruitCake: px(9553737),
  chocStrawb: px(37382219),
  cupcakesChoc: px(10546542),
  cupcakesColor: px(18804938),
  cupcakesPink: px(1028704),
  flowerBox: px(26628920),
  rosesDessert: px(11522868),
  cupcakeBoxHeld: px(7180271),
  valentineBox: px(31009878),
  giftPink: px(27442658),
  cupcakesCandles: px(30199170),
  cupcakesFruit: px(7966082),
};

export const cakes: Product[] = [
  { id: 'choc-truffle', name: 'Chocolate Truffle Cake', shortName: 'Chocolate Truffle', price: 899, rating: 4.9, reviews: 120, img: IMG.hero, flavour: 'Chocolate', category: 'Birthday', occasions: ['Birthday', 'Love & Romance'], desc: 'Rich, moist chocolate layers filled with silky Belgian truffle ganache, finished with glossy chocolate drip, chocolate swirls and fresh strawberries. 100% eggless and baked fresh on order.', type: 'cake', tag: 'Bestseller', inStock: true, stockCount: 18 },
  { id: 'red-velvet', name: 'Red Velvet Cake', shortName: 'Red Velvet', price: 849, rating: 4.8, reviews: 98, img: IMG.redVelvet, flavour: 'Red Velvet', category: 'Anniversary', occasions: ['Anniversary', 'Love & Romance', 'Birthday'], desc: 'Classic crimson red velvet sponge layered with smooth cream-cheese frosting and a sprinkle of red velvet crumbs. Soft, velvety and made with love — 100% eggless.', type: 'cake', tag: 'Bestseller', inStock: true, stockCount: 14 },
  { id: 'pineapple', name: 'Pineapple Cake', shortName: 'Pineapple', price: 799, rating: 4.7, reviews: 86, img: IMG.pineapple, flavour: 'Pineapple', category: 'Birthday', occasions: ['Birthday'], desc: 'Light vanilla sponge soaked in pineapple juice, layered with whipped cream and juicy pineapple chunks, topped with pineapple jelly glaze. Fresh, fruity and 100% eggless.', type: 'cake', inStock: true, stockCount: 12 },
  { id: 'black-forest', name: 'Black Forest Cake', shortName: 'Black Forest', price: 849, rating: 4.8, reviews: 102, img: IMG.blackForest, flavour: 'Chocolate', category: 'Birthday', occasions: ['Birthday', 'Anniversary'], desc: 'The all-time favourite — chocolate sponge, whipped cream, cherry filling and a generous coat of dark chocolate shavings, crowned with cream swirls and cherries. 100% eggless.', type: 'cake', tag: 'Bestseller', inStock: true, stockCount: 15 },
  { id: 'butterscotch', name: 'Butterscotch Cake', shortName: 'Butterscotch', price: 799, rating: 4.7, reviews: 76, img: IMG.butterscotch, flavour: 'Butterscotch', category: 'Anniversary', occasions: ['Birthday', 'Anniversary'], desc: 'Golden butterscotch sponge with caramel cream, crunchy praline and a caramel drizzle in every bite. A crowd favourite, freshly baked and 100% eggless.', type: 'cake', inStock: true, stockCount: 10 },
  { id: 'strawberry', name: 'Strawberry Cake', price: 899, rating: 4.9, reviews: 94, img: IMG.strawberry, flavour: 'Strawberry', category: 'Love & Romance', occasions: ['Love & Romance', 'Birthday', 'Anniversary'], desc: 'Pretty-in-pink strawberry cake with fresh strawberry cream, delicate rosettes and juicy strawberries on top. Sweet, fresh and 100% eggless.', type: 'cake', inStock: true, stockCount: 8 },
  { id: 'vanilla', name: 'Vanilla Cake', price: 749, rating: 4.6, reviews: 58, img: IMG.vanilla, flavour: 'Vanilla', category: 'Anniversary', occasions: ['Anniversary', 'Birthday'], desc: 'Elegant Madagascar vanilla sponge with silky vanilla buttercream and delicate floral finishing. Simple, classic and 100% eggless.', type: 'cake', inStock: true, stockCount: 16 },
  { id: 'mix-fruit', name: 'Mix Fruit Cake', price: 799, rating: 4.7, reviews: 71, img: IMG.mixFruit, flavour: 'Mix Fruit', category: 'Birthday', occasions: ['Birthday', 'Anniversary'], desc: 'Fresh cream cake loaded with seasonal fruits, kiwi and berries over a soft vanilla sponge. Light, refreshing and 100% eggless.', type: 'cake', inStock: true, stockCount: 9 },
  { id: 'choc-fudge', name: 'Chocolate Fudge Cake', price: 849, rating: 4.8, reviews: 88, img: IMG.chocStrawb, flavour: 'Chocolate', category: 'Theme Cakes', occasions: ['Birthday', 'Theme Cakes', 'Custom Cakes'], desc: 'Dense chocolate fudge layers with rich cocoa frosting, chocolate truffles and fresh strawberries. A chocolate lover’s dream — 100% eggless.', type: 'cake', inStock: true, stockCount: 11 },
  { id: 'heart-love', name: 'Love You Heart Cake', price: 999, rating: 4.9, reviews: 112, img: IMG.heart, flavour: 'Strawberry', category: 'Love & Romance', occasions: ['Love & Romance', 'Anniversary'], desc: 'Heart-shaped pink cake with hand-piped rosettes and a sweet ‘Love You’ message. Perfect for proposals, anniversaries and romantic surprises. 100% eggless.', type: 'cake', tag: 'Trending', inStock: true, stockCount: 14 },
  { id: 'theme-unicorn', name: 'Rainbow Theme Cake', price: 1299, rating: 4.8, reviews: 67, img: IMG.theme, flavour: 'Vanilla', category: 'Theme Cakes', occasions: ['Theme Cakes', 'Birthday', 'Custom Cakes'], desc: 'Magical pastel theme cake with rainbow, unicorn and cute toppers — fully customisable for your little one’s big day. 100% eggless.', type: 'cake', tag: 'Kids Love', inStock: true, stockCount: 6 },
  { id: 'floral-anniv', name: 'Floral Anniversary Cake', price: 1199, rating: 5.0, reviews: 143, img: IMG.floral, flavour: 'Vanilla', category: 'Anniversary', occasions: ['Anniversary', 'Love & Romance', 'Custom Cakes'], desc: 'Blush pink showstopper adorned with fresh roses and peonies, finished with a golden topper. Our most-loved celebration cake — 100% eggless.', type: 'cake', tag: 'Premium', inStock: true, stockCount: 7 },
];

export const hampers: Product[] = [
  { id: 'h-birthday', name: 'Birthday Surprise Hamper', price: 1499, rating: 4.8, reviews: 120, img: IMG.cupcakesChoc, flavour: 'Chocolate', category: 'Hamper', occasions: ['Birthday Hampers'], desc: 'A joy-packed box of assorted cupcakes, chocolates and treats with a Happy Birthday card — beautifully packed and ready to gift.', type: 'hamper', inStock: true, stockCount: 10 },
  { id: 'h-anniversary', name: 'Anniversary Special Hamper', price: 1699, rating: 4.9, reviews: 98, img: IMG.rosesDessert, flavour: 'Mix', category: 'Hamper', occasions: ['Anniversary Hampers'], desc: 'Roses, desserts and sweet little surprises curated for your special someone. Handpicked with love and packed to perfection.', type: 'hamper', inStock: true, stockCount: 8 },
  { id: 'h-wedding', name: 'Wedding Bliss Hamper', price: 2499, rating: 4.8, reviews: 76, img: IMG.cupcakeBoxHeld, flavour: 'Mix', category: 'Hamper', occasions: ['Wedding Hampers'], desc: 'An elegant wedding gift box with floral cupcakes, premium chocolates and a heartfelt message card.', type: 'hamper', tag: 'Premium', inStock: true, stockCount: 5 },
  { id: 'h-festive', name: 'Festive Celebration Hamper', price: 1899, rating: 4.7, reviews: 64, img: IMG.cupcakesCandles, flavour: 'Mix', category: 'Hamper', occasions: ['Festive Hampers'], desc: 'Gourmet cupcakes and festive treats in a celebration-ready box — perfect for Diwali, Rakhi and every happy occasion.', type: 'hamper', inStock: true, stockCount: 12 },
  { id: 'h-baby', name: 'Baby Shower Hamper', price: 1799, rating: 4.9, reviews: 52, img: IMG.giftPink, flavour: 'Mix', category: 'Hamper', occasions: ['Custom Hampers'], desc: 'The sweetest welcome for the little one — pastel treats, a soft gift box and lots of love in every detail.', type: 'hamper', inStock: true, stockCount: 7 },
  { id: 'h-choco', name: 'Chocolate Indulgence Hamper', price: 1999, rating: 4.8, reviews: 102, img: IMG.valentineBox, flavour: 'Chocolate', category: 'Hamper', occasions: ['Festive Hampers', 'Birthday Hampers'], desc: 'For true chocolate lovers — truffles, chocolate cupcakes, brownies and more, tied with a satin ribbon.', type: 'hamper', tag: 'Bestseller', inStock: true, stockCount: 15 },
  { id: 'h-custom', name: 'Custom Hamper', price: 2199, rating: 4.7, reviews: 88, img: IMG.cupcakesColor, flavour: 'Mix', category: 'Hamper', occasions: ['Custom Hampers'], desc: 'Build it your way — choose your favourite treats, add a personal message and we will pack it beautifully for you.', type: 'hamper', inStock: true, stockCount: 6 },
  { id: 'h-cookies', name: 'Cookies & Treats Hamper', price: 1499, rating: 4.6, reviews: 75, img: IMG.cupcakesPink, flavour: 'Mix', category: 'Hamper', occasions: ['Festive Hampers', 'Custom Hampers'], desc: 'Fresh-baked cookies, cupcakes and bite-sized treats in a pretty gift box — sweetness in every bite.', type: 'hamper', inStock: true, stockCount: 9 },
];

export const allProducts: Product[] = [...cakes, ...hampers];

export interface OrderCard {
  id: number; title: string; customer: string; date: string; quote: string;
  flavour: string; weight: string; img: string; category: string;
}

export const orders: OrderCard[] = [
  { id: 1, title: 'Birthday Cake', customer: 'Priya Sharma', date: '12 Apr 2025', quote: 'Amazing cake! It was exactly as I asked for. Everyone loved it!', flavour: 'Chocolate', weight: '1.5 kg', img: IMG.hero, category: 'Birthday' },
  { id: 2, title: 'Anniversary Cake', customer: 'Rohit & Neha', date: '5 Apr 2025', quote: 'Beautiful cake and great taste. Thank you for making our day special!', flavour: 'Vanilla', weight: '2 kg', img: IMG.floral, category: 'Anniversary' },
  { id: 3, title: 'Baby Shower Cake', customer: 'Sneha Verma', date: '28 Mar 2025', quote: 'The cake was super cute and delicious. Perfect for our baby shower!', flavour: 'Butterscotch', weight: '1.5 kg', img: IMG.theme, category: 'Baby Shower' },
  { id: 4, title: 'Birthday Cake', customer: 'Aman Gupta', date: '20 Mar 2025', quote: 'Loved the design and taste. Will definitely order again!', flavour: 'Chocolate', weight: '1 kg', img: IMG.blackForest, category: 'Birthday' },
  { id: 5, title: 'Birthday Cake', customer: 'Anjali Mehta', date: '15 Mar 2025', quote: 'So much better than expected. It was fresh, soft and so beautiful.', flavour: 'Red Velvet', weight: '2 kg', img: IMG.redVelvet, category: 'Birthday' },
  { id: 6, title: 'Custom Theme Cake', customer: 'Karan Singh', date: '10 Mar 2025', quote: 'The football theme cake was perfect! My son was so happy!', flavour: 'Chocolate', weight: '1.5 kg', img: IMG.theme, category: 'Custom Designs' },
  { id: 7, title: 'Birthday Cake', customer: 'Neha Kapoor', date: '2 Mar 2025', quote: 'Beautiful and tasty! Exactly what I wanted.', flavour: 'Vanilla', weight: '2 kg', img: IMG.strawberry, category: 'Birthday' },
  { id: 8, title: 'Custom Order', customer: 'Riya Malhotra', date: '25 Feb 2025', quote: 'Special cake for a special person. It turned out even better than I imagined!', flavour: 'Red Velvet', weight: '1.5 kg', img: IMG.heart, category: 'Custom Designs' },
];

export const reviews = [
  { text: 'The cake was absolutely beautiful and tasted amazing! Highly recommend DA Sweet City.', name: 'Pooja Sharma', city: 'Kaithal', img: px(415829) },
  { text: 'Superb quality, fresh ingredients and on-time delivery. You guys are the best!', name: 'Rohit Verma', city: 'Hansi', img: px(2379005) },
  { text: 'Custom order was perfect! The team really understood our requirements. Thank you!', name: 'Simran Kaur', city: 'Kaithal', img: px(415829) },
];

export const weights = ['500g', '1 kg', '1.5 kg', '2 kg'];
export const weightMultiplier: Record<string, number> = { '500g': 1, '1 kg': 1.8, '1.5 kg': 2.6, '2 kg': 3.4 };
export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

/* ---------------- Customer Management Interface ---------------- */
export interface Customer {
  id: string;
  name: string;
  phone: string;
  city: string;
  totalOrders: number;
  lastOrderDate: string;
  notes?: string;
  status: 'Active' | 'VIP' | 'New';
}

export const initialCustomers: Customer[] = [
  { id: 'c-1', name: 'Priya Sharma', phone: '98123-45678', city: 'Kaithal', totalOrders: 4, lastOrderDate: 'Today, 03:30 PM', status: 'VIP', notes: 'Prefers pure eggless chocolate ganache. Regular birthday client.' },
  { id: 'c-2', name: 'Rohit Verma', phone: '98125-42172', city: 'Hansi', totalOrders: 3, lastOrderDate: 'Today, 06:15 PM', status: 'Active', notes: 'Always requests extra cherries on Black Forest cakes.' },
  { id: 'c-3', name: 'Aman Gupta', phone: '98765-43210', city: 'Kaithal', totalOrders: 2, lastOrderDate: 'Today, 08:45 PM', status: 'New', notes: 'First online order for anniversary.' },
  { id: 'c-4', name: 'Sneha Verma', phone: '98765-11223', city: 'Hansi', totalOrders: 2, lastOrderDate: '28 Oct 2026', status: 'Active', notes: 'Baby shower and festive cupcakes.' },
  { id: 'c-5', name: 'Anjali Mehta', phone: '98990-12345', city: 'Kaithal', totalOrders: 5, lastOrderDate: '26 Oct 2026', status: 'VIP', notes: 'Very sweet family, order custom designer cakes.' },
  { id: 'c-6', name: 'Karan Singh', phone: '98111-22334', city: 'Hansi', totalOrders: 3, lastOrderDate: '24 Oct 2026', status: 'Active', notes: 'Loves theme cakes for his kids.' },
  { id: 'c-7', name: 'Simran Kaur', phone: '98222-33445', city: 'Kaithal', totalOrders: 4, lastOrderDate: '22 Oct 2026', status: 'VIP', notes: 'Hampers for festive gifting and corporate treats.' },
];

/* ---------------- Admin Order Management Interface ---------------- */
export interface AdminOrderItem {
  productId: string;
  productName: string;
  weight: string;
  qty: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity?: string;
  items: AdminOrderItem[];
  totalAmount: number;
  orderDate: string; // e.g. "Today" or "28 Oct 2026"
  orderTime: string; // e.g. "06:15 PM"
  isToday: boolean;
  status: 'Pending' | 'Baking' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  type: 'online' | 'custom' | 'manual';
  deliveryAddress?: string;
  notes?: string;
}

export const initialAdminOrders: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'DSC-8921',
    customerName: 'Priya Sharma',
    customerPhone: '98123-45678',
    customerCity: 'Kaithal',
    items: [
      { productId: 'choc-truffle', productName: 'Chocolate Truffle Cake', weight: '1 kg', qty: 1, price: 1618 },
    ],
    totalAmount: 1618,
    orderDate: 'Today',
    orderTime: '03:30 PM',
    isToday: true,
    status: 'Baking',
    type: 'online',
    deliveryAddress: 'Model Town, Kaithal',
    notes: 'Write "Happy 18th Birthday Ananya!" in gold icing.',
  },
  {
    id: 'ord-102',
    orderNumber: 'DSC-8922',
    customerName: 'Rohit Verma',
    customerPhone: '98125-42172',
    customerCity: 'Hansi',
    items: [
      { productId: 'heart-love', productName: 'Love You Heart Cake', weight: '1.5 kg', qty: 1, price: 2597 },
    ],
    totalAmount: 2597,
    orderDate: 'Today',
    orderTime: '06:15 PM',
    isToday: true,
    status: 'Out for Delivery',
    type: 'online',
    deliveryAddress: 'Main Bazar, Hansi',
    notes: 'Please add 5 red birthday candles.',
  },
  {
    id: 'ord-103',
    orderNumber: 'DSC-8923',
    customerName: 'Aman Gupta',
    customerPhone: '98765-43210',
    customerCity: 'Kaithal',
    items: [
      { productId: 'h-birthday', productName: 'Birthday Surprise Hamper', weight: 'Standard', qty: 1, price: 1499 },
    ],
    totalAmount: 1499,
    orderDate: 'Today',
    orderTime: '08:45 PM',
    isToday: true,
    status: 'Pending',
    type: 'online',
    deliveryAddress: 'Near Pehowa Chowk, Kaithal',
    notes: 'Deliver sharp at 10:00 PM surprise gift.',
  },
  {
    id: 'ord-104',
    orderNumber: 'DSC-8919',
    customerName: 'Sneha Verma',
    customerPhone: '98765-11223',
    customerCity: 'Hansi',
    items: [
      { productId: 'red-velvet', productName: 'Red Velvet Cake', weight: '2 kg', qty: 1, price: 2886 },
    ],
    totalAmount: 2886,
    orderDate: '28 Oct 2026',
    orderTime: '05:20 PM',
    isToday: false,
    status: 'Delivered',
    type: 'custom',
    deliveryAddress: 'Jind Road, Hansi',
    notes: 'Baby shower special theme rosettes.',
  },
  {
    id: 'ord-105',
    orderNumber: 'DSC-8918',
    customerName: 'Anjali Mehta',
    customerPhone: '98990-12345',
    customerCity: 'Kaithal',
    items: [
      { productId: 'theme-unicorn', productName: 'Rainbow Theme Cake', weight: '1.5 kg', qty: 1, price: 3377 },
    ],
    totalAmount: 3377,
    orderDate: '26 Oct 2026',
    orderTime: '02:10 PM',
    isToday: false,
    status: 'Delivered',
    type: 'custom',
    deliveryAddress: 'Sector 19, Kaithal',
    notes: 'Rainbow pastel theme.',
  },
];
