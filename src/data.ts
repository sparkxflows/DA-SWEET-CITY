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
}

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

export const IMG = {
  hero: '/images/hero-home.jpg',
  redVelvet: '/images/cake-redvelvet.jpg',
  pineapple: '/images/cake-pineapple.jpg',
  blackForest: '/images/cake-blackforest.jpg',
  butterscotch: '/images/cake-butterscotch.jpg',
  floral: '/images/cake-floral.jpg',
  heart: '/images/cake-heart.jpg',
  theme: '/images/cake-theme.jpg',
  hamperHero: '/images/hamper-hero.jpg',
  strawberry: '/images/cake-strawberry.jpg',
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
  { id: 'choc-truffle', name: 'Chocolate Truffle Cake', shortName: 'Chocolate Truffle', price: 899, rating: 4.9, reviews: 120, img: IMG.hero, flavour: 'Chocolate', category: 'Birthday', occasions: ['Birthday', 'Love & Romance'], desc: 'Rich, moist chocolate layers filled with silky Belgian truffle ganache, finished with glossy chocolate drip, chocolate swirls and fresh strawberries. 100% eggless and baked fresh on order.', type: 'cake', tag: 'Bestseller' },
  { id: 'red-velvet', name: 'Red Velvet Cake', shortName: 'Red Velvet', price: 849, rating: 4.8, reviews: 98, img: IMG.redVelvet, flavour: 'Red Velvet', category: 'Anniversary', occasions: ['Anniversary', 'Love & Romance', 'Birthday'], desc: 'Classic crimson red velvet sponge layered with smooth cream-cheese frosting and a sprinkle of red velvet crumbs. Soft, velvety and made with love — 100% eggless.', type: 'cake', tag: 'Bestseller' },
  { id: 'pineapple', name: 'Pineapple Cake', shortName: 'Pineapple', price: 799, rating: 4.7, reviews: 86, img: IMG.pineapple, flavour: 'Pineapple', category: 'Birthday', occasions: ['Birthday'], desc: 'Light vanilla sponge soaked in pineapple juice, layered with whipped cream and juicy pineapple chunks, topped with pineapple jelly glaze. Fresh, fruity and 100% eggless.', type: 'cake' },
  { id: 'black-forest', name: 'Black Forest Cake', shortName: 'Black Forest', price: 849, rating: 4.8, reviews: 102, img: IMG.blackForest, flavour: 'Chocolate', category: 'Birthday', occasions: ['Birthday', 'Anniversary'], desc: 'The all-time favourite — chocolate sponge, whipped cream, cherry filling and a generous coat of dark chocolate shavings, crowned with cream swirls and cherries. 100% eggless.', type: 'cake', tag: 'Bestseller' },
  { id: 'butterscotch', name: 'Butterscotch Cake', shortName: 'Butterscotch', price: 799, rating: 4.7, reviews: 76, img: IMG.butterscotch, flavour: 'Butterscotch', category: 'Anniversary', occasions: ['Birthday', 'Anniversary'], desc: 'Golden butterscotch sponge with caramel cream, crunchy praline and a caramel drizzle in every bite. A crowd favourite, freshly baked and 100% eggless.', type: 'cake' },
  { id: 'strawberry', name: 'Strawberry Cake', price: 899, rating: 4.9, reviews: 94, img: IMG.strawberry, flavour: 'Strawberry', category: 'Love & Romance', occasions: ['Love & Romance', 'Birthday', 'Anniversary'], desc: 'Pretty-in-pink strawberry cake with fresh strawberry cream, delicate rosettes and juicy strawberries on top. Sweet, fresh and 100% eggless.', type: 'cake' },
  { id: 'vanilla', name: 'Vanilla Cake', price: 749, rating: 4.6, reviews: 58, img: IMG.vanilla, flavour: 'Vanilla', category: 'Anniversary', occasions: ['Anniversary', 'Birthday'], desc: 'Elegant Madagascar vanilla sponge with silky vanilla buttercream and delicate floral finishing. Simple, classic and 100% eggless.', type: 'cake' },
  { id: 'mix-fruit', name: 'Mix Fruit Cake', price: 799, rating: 4.7, reviews: 71, img: IMG.mixFruit, flavour: 'Mix Fruit', category: 'Birthday', occasions: ['Birthday', 'Anniversary'], desc: 'Fresh cream cake loaded with seasonal fruits, kiwi and berries over a soft vanilla sponge. Light, refreshing and 100% eggless.', type: 'cake' },
  { id: 'choc-fudge', name: 'Chocolate Fudge Cake', price: 849, rating: 4.8, reviews: 88, img: IMG.chocStrawb, flavour: 'Chocolate', category: 'Theme Cakes', occasions: ['Birthday', 'Theme Cakes', 'Custom Cakes'], desc: 'Dense chocolate fudge layers with rich cocoa frosting, chocolate truffles and fresh strawberries. A chocolate lover\u2019s dream — 100% eggless.', type: 'cake' },
  { id: 'heart-love', name: 'Love You Heart Cake', price: 999, rating: 4.9, reviews: 112, img: IMG.heart, flavour: 'Strawberry', category: 'Love & Romance', occasions: ['Love & Romance', 'Anniversary'], desc: 'Heart-shaped pink cake with hand-piped rosettes and a sweet \u2018Love You\u2019 message. Perfect for proposals, anniversaries and romantic surprises. 100% eggless.', type: 'cake', tag: 'Trending' },
  { id: 'theme-unicorn', name: 'Rainbow Theme Cake', price: 1299, rating: 4.8, reviews: 67, img: IMG.theme, flavour: 'Vanilla', category: 'Theme Cakes', occasions: ['Theme Cakes', 'Birthday', 'Custom Cakes'], desc: 'Magical pastel theme cake with rainbow, unicorn and cute toppers — fully customisable for your little one\u2019s big day. 100% eggless.', type: 'cake', tag: 'Kids Love' },
  { id: 'floral-anniv', name: 'Floral Anniversary Cake', price: 1199, rating: 5.0, reviews: 143, img: IMG.floral, flavour: 'Vanilla', category: 'Anniversary', occasions: ['Anniversary', 'Love & Romance', 'Custom Cakes'], desc: 'Blush pink showstopper adorned with fresh roses and peonies, finished with a golden topper. Our most-loved celebration cake — 100% eggless.', type: 'cake', tag: 'Premium' },
];

export const hampers: Product[] = [
  { id: 'h-birthday', name: 'Birthday Surprise Hamper', price: 1499, rating: 4.8, reviews: 120, img: IMG.cupcakesChoc, flavour: 'Chocolate', category: 'Hamper', occasions: ['Birthday Hampers'], desc: 'A joy-packed box of assorted cupcakes, chocolates and treats with a Happy Birthday card — beautifully packed and ready to gift.', type: 'hamper' },
  { id: 'h-anniversary', name: 'Anniversary Special Hamper', price: 1699, rating: 4.9, reviews: 98, img: IMG.rosesDessert, flavour: 'Mix', category: 'Hamper', occasions: ['Anniversary Hampers'], desc: 'Roses, desserts and sweet little surprises curated for your special someone. Handpicked with love and packed to perfection.', type: 'hamper' },
  { id: 'h-wedding', name: 'Wedding Bliss Hamper', price: 2499, rating: 4.8, reviews: 76, img: IMG.cupcakeBoxHeld, flavour: 'Mix', category: 'Hamper', occasions: ['Wedding Hampers'], desc: 'An elegant wedding gift box with floral cupcakes, premium chocolates and a heartfelt message card.', type: 'hamper', tag: 'Premium' },
  { id: 'h-festive', name: 'Festive Celebration Hamper', price: 1899, rating: 4.7, reviews: 64, img: IMG.cupcakesCandles, flavour: 'Mix', category: 'Hamper', occasions: ['Festive Hampers'], desc: 'Gourmet cupcakes and festive treats in a celebration-ready box — perfect for Diwali, Rakhi and every happy occasion.', type: 'hamper' },
  { id: 'h-baby', name: 'Baby Shower Hamper', price: 1799, rating: 4.9, reviews: 52, img: IMG.giftPink, flavour: 'Mix', category: 'Hamper', occasions: ['Custom Hampers'], desc: 'The sweetest welcome for the little one — pastel treats, a soft gift box and lots of love in every detail.', type: 'hamper' },
  { id: 'h-choco', name: 'Chocolate Indulgence Hamper', price: 1999, rating: 4.8, reviews: 102, img: IMG.valentineBox, flavour: 'Chocolate', category: 'Hamper', occasions: ['Festive Hampers', 'Birthday Hampers'], desc: 'For true chocolate lovers — truffles, chocolate cupcakes, brownies and more, tied with a satin ribbon.', type: 'hamper', tag: 'Bestseller' },
  { id: 'h-custom', name: 'Custom Hamper', price: 2199, rating: 4.7, reviews: 88, img: IMG.cupcakesColor, flavour: 'Mix', category: 'Hamper', occasions: ['Custom Hampers'], desc: 'Build it your way — choose your favourite treats, add a personal message and we will pack it beautifully for you.', type: 'hamper' },
  { id: 'h-cookies', name: 'Cookies & Treats Hamper', price: 1499, rating: 4.6, reviews: 75, img: IMG.cupcakesPink, flavour: 'Mix', category: 'Hamper', occasions: ['Festive Hampers', 'Custom Hampers'], desc: 'Fresh-baked cookies, cupcakes and bite-sized treats in a pretty gift box — sweetness in every bite.', type: 'hamper' },
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
