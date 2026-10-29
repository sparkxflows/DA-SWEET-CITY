import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeAlert,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Eye,
  FileEdit,
  Filter,
  Lock,
  LogOut,
  MapPin,
  Package,
  PackageCheck,
  PackageX,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  TrendingUp,
  Truck,
  User,
  Users,
  UtensilsCrossed,
  X,
  Zap,
} from 'lucide-react';
import { inr, type AdminOrder, type Customer, type Product } from '../data';
import { useShop } from '../store';

// Image choices for quick selection in Add/Edit product
const PRESET_IMAGES = [
  { label: 'Chocolate Truffle', url: './images/hero-home.jpg' },
  { label: 'Red Velvet', url: './images/cake-redvelvet.jpg' },
  { label: 'Pineapple Cake', url: './images/cake-pineapple.jpg' },
  { label: 'Black Forest', url: './images/cake-blackforest.jpg' },
  { label: 'Butterscotch', url: './images/cake-butterscotch.jpg' },
  { label: 'Floral Peony', url: './images/cake-floral.jpg' },
  { label: 'Heart Cake', url: './images/cake-heart.jpg' },
  { label: 'Theme Unicorn', url: './images/cake-theme.jpg' },
  { label: 'Strawberry Rosette', url: './images/cake-strawberry.jpg' },
  { label: 'Hamper Gift Hero', url: './images/hamper-hero.jpg' },
];

export default function AdminPortal() {
  const {
    go,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    products,
    cakes,
    hampers,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    setStockCount,
    autoStockAll,
    resetProductsToDefault,
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    adminOrders,
    addAdminOrder,
    updateAdminOrderStatus,
    updateAdminOrder,
    deleteAdminOrder,
  } = useShop();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'maal' | 'stock' | 'customers' | 'orders'>('orders');

  // ---------------- MAAL (PRODUCTS) STATE ----------------
  const [productSearch, setProductSearch] = useState('');
  const [productFilter, setProductFilter] = useState<'all' | 'under599' | 'cakes' | 'hampers' | 'bestsellers' | 'outofstock'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // ---------------- STOCK STATE ----------------
  const [stockSearch, setStockSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'outofstock' | 'lowstock'>('all');

  // ---------------- CUSTOMER STATE ----------------
  const [customerSearch, setCustomerSearch] = useState('');
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  // ---------------- ORDER STATE ----------------
  const [orderFilter, setOrderFilter] = useState<'all' | 'today' | 'Pending' | 'Baking' | 'Out for Delivery' | 'Delivered'>('today');
  const [orderSearch, setOrderSearch] = useState('');
  const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  // Orders statistics for "Dekhna hai aaj kitna order aaya"
  const orderStats = useMemo(() => {
    const todayOrders = adminOrders.filter(o => o.isToday || o.orderDate === 'Today');
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const pendingOrders = todayOrders.filter(o => o.status === 'Pending').length;
    const bakingOrders = todayOrders.filter(o => o.status === 'Baking').length;
    const outOrders = todayOrders.filter(o => o.status === 'Out for Delivery').length;
    const deliveredOrders = todayOrders.filter(o => o.status === 'Delivered').length;
    return {
      todayCount: todayOrders.length,
      todayRevenue,
      pendingOrders,
      bakingOrders,
      outOrders,
      deliveredOrders,
      totalOrdersCount: adminOrders.length,
    };
  }, [adminOrders]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = (p.name + ' ' + p.flavour + ' ' + p.category).toLowerCase().includes(productSearch.toLowerCase());
      if (!matchSearch) return false;
      if (productFilter === 'under599') return p.price <= 599;
      if (productFilter === 'cakes') return p.type === 'cake';
      if (productFilter === 'hampers') return p.type === 'hamper';
      if (productFilter === 'bestsellers') return p.tag?.toLowerCase().includes('bestseller');
      if (productFilter === 'outofstock') return p.inStock === false;
      return true;
    });
  }, [products, productSearch, productFilter]);

  // Filtered Stock Items
  const filteredStockItems = useMemo(() => {
    return products.filter(p => {
      const matchSearch = (p.name + ' ' + p.category).toLowerCase().includes(stockSearch.toLowerCase());
      if (!matchSearch) return false;
      if (stockFilter === 'instock') return p.inStock !== false;
      if (stockFilter === 'outofstock') return p.inStock === false;
      if (stockFilter === 'lowstock') return p.inStock !== false && (p.stockCount ?? 0) <= 8;
      return true;
    });
  }, [products, stockSearch, stockFilter]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      return (c.name + ' ' + c.phone + ' ' + c.city).toLowerCase().includes(customerSearch.toLowerCase());
    });
  }, [customers, customerSearch]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return adminOrders.filter(o => {
      const matchSearch = (o.orderNumber + ' ' + o.customerName + ' ' + o.customerPhone).toLowerCase().includes(orderSearch.toLowerCase());
      if (!matchSearch) return false;
      if (orderFilter === 'today') return o.isToday || o.orderDate === 'Today';
      if (orderFilter === 'all') return true;
      return o.status === orderFilter;
    });
  }, [adminOrders, orderFilter, orderSearch]);

  // ================= PASSWORD GATE SCREEN =================
  if (!isAdminLoggedIn) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center bg-gradient-to-br from-cream via-cream-2 to-blush px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-rose-200 bg-white p-8 shadow-[0_20px_50px_-20px_rgba(61,29,18,.3)]">
          <div className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blush text-rose shadow-inner">
              <Lock size={32} />
            </span>
            <h1 className="mt-4 font-serif text-3xl font-bold text-choco">Super Admin Portal</h1>
            <p className="mt-2 text-sm text-choco/70">
              Enter admin password to manage products, prices, stock, customers, and view daily orders.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-choco">Password</label>
              <input
                type="password"
                autoFocus
                placeholder="Enter password (admin123)"
                value={passwordInput}
                onChange={e => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                className={`mt-1.5 w-full rounded-2xl border px-4 py-3.5 text-base text-choco outline-none transition ${
                  loginError ? 'border-red-400 bg-red-50/50' : 'border-rose-200 bg-cream-2/40 focus:border-rose focus:bg-white'
                }`}
              />
              {loginError && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  Password galat hai. Kripya <span className="font-bold underline">admin123</span> dalein.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-anim btn-rose flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-semibold"
            >
              <span>Unlock Admin Portal</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 border-t border-rose-100 pt-5 text-center">
            <button
              onClick={() => go('home')}
              className="flex items-center justify-center gap-2 text-sm font-medium text-choco/70 transition hover:text-rose"
            >
              <ArrowLeft size={16} />
              <span>Back to DA SWEET CITY Store</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= LOGGED IN ADMIN PORTAL =================
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Top Banner & Header */}
      <div className="border-b border-rose-100 bg-white/95 sticky top-0 z-30 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 md:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blush text-rose">
              <ShieldCheck size={22} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-tight text-choco">DA SWEET CITY</span>
                <span className="rounded-lg bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose border border-rose-200">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-choco/60">Live Management Portal (Kaithal & Hansi)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go('home')}
              className="btn-anim btn-outline flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            >
              <Eye size={16} />
              <span>View Website</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 rounded-xl border border-rose-100 px-3.5 py-2 text-sm font-medium text-choco/70 hover:bg-blush hover:text-rose transition"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-rose-100/60 bg-cream-2/50 px-4 md:px-8">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === 'orders'
                  ? 'bg-rose text-white shadow-md'
                  : 'bg-white/80 text-choco hover:bg-white hover:text-rose'
              }`}
            >
              <Clock size={17} />
              <span>Orders (Aaj ke Orders)</span>
              {orderStats.todayCount > 0 && (
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                    activeTab === 'orders' ? 'bg-white text-rose' : 'bg-rose text-white'
                  }`}
                >
                  {orderStats.todayCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('maal')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === 'maal'
                  ? 'bg-rose text-white shadow-md'
                  : 'bg-white/80 text-choco hover:bg-white hover:text-rose'
              }`}
            >
              <UtensilsCrossed size={17} />
              <span>Maal (Cakes & Hampers)</span>
              <span className="text-xs opacity-75">({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('stock')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === 'stock'
                  ? 'bg-rose text-white shadow-md'
                  : 'bg-white/80 text-choco hover:bg-white hover:text-rose'
              }`}
            >
              <Package size={17} />
              <span>Stock Control</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === 'customers'
                  ? 'bg-rose text-white shadow-md'
                  : 'bg-white/80 text-choco hover:bg-white hover:text-rose'
              }`}
            >
              <Users size={17} />
              <span>Customers</span>
              <span className="text-xs opacity-75">({customers.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-8">
        {/* ========================================================= */}
        {/* TAB 1: ORDERS (AAJ KITNA ORDER AAYA)                     */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Header & Quick Action */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-choco">Order Management</h2>
                <p className="text-sm text-choco/70">
                  Aaj ke sabhi orders, baking progress aur delivery track karein.
                </p>
              </div>
              <button
                onClick={() => setIsAddOrderOpen(true)}
                className="btn-anim btn-rose flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
              >
                <Plus size={18} />
                <span>+ Naya Phone / Walk-in Order Dalein</span>
              </button>
            </div>

            {/* Prominent Daily Summary Dashboard */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Box 1: Aaj Ke Orders */}
              <div className="rounded-2xl border border-rose-200/80 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-choco/70">Aaj Ke Total Orders</span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-blush text-rose">
                    <Calendar size={18} />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-rose">{orderStats.todayCount}</span>
                  <span className="text-xs font-semibold text-choco/60">orders today</span>
                </div>
                <p className="mt-2 text-xs text-choco/60">
                  {orderStats.pendingOrders} pending confirmation
                </p>
              </div>

              {/* Box 2: Aaj Ki Kamai (Revenue) */}
              <div className="rounded-2xl border border-rose-200/80 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-choco/70">Aaj Ki Bikri (Revenue)</span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <TrendingUp size={18} />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-choco">{inr(orderStats.todayRevenue)}</span>
                </div>
                <p className="mt-2 text-xs text-emerald-700 font-medium">
                  Aaj ke online & custom orders
                </p>
              </div>

              {/* Box 3: Oven / Baking */}
              <div className="rounded-2xl border border-rose-200/80 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-choco/70">Baking in Oven</span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-600">
                    <Sparkles size={18} />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-amber-700">{orderStats.bakingOrders}</span>
                  <span className="text-xs font-semibold text-choco/60">freshly baking</span>
                </div>
                <p className="mt-2 text-xs text-choco/60">100% eggless cakes in kitchen</p>
              </div>

              {/* Box 4: Out for Delivery / Delivered */}
              <div className="rounded-2xl border border-rose-200/80 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-choco/70">Out for Delivery</span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Truck size={18} />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-blue-700">{orderStats.outOrders}</span>
                  <span className="text-xs font-semibold text-choco/60">on the way</span>
                </div>
                <p className="mt-2 text-xs text-emerald-600 font-medium">{orderStats.deliveredOrders} delivered today</p>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                {(['today', 'all', 'Pending', 'Baking', 'Out for Delivery', 'Delivered'] as const).map(tabKey => (
                  <button
                    key={tabKey}
                    onClick={() => setOrderFilter(tabKey)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      orderFilter === tabKey
                        ? 'bg-choco text-white'
                        : 'bg-cream text-choco/80 hover:bg-blush hover:text-rose'
                    }`}
                  >
                    {tabKey === 'today'
                      ? `Aaj Ke Orders (${orderStats.todayCount})`
                      : tabKey === 'all'
                      ? `Sabhi Orders (${adminOrders.length})`
                      : tabKey}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-choco/40" />
                <input
                  type="text"
                  placeholder="Order #, Customer, Phone..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="w-full rounded-xl border border-rose-200 bg-cream/50 py-2 pl-9 pr-3 text-sm text-choco outline-none focus:border-rose focus:bg-white"
                />
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-rose-200 bg-white py-16 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blush text-rose">
                  <Clock size={28} />
                </span>
                <p className="mt-3 font-serif text-xl font-bold text-choco">Koi order nahi mila</p>
                <p className="text-sm text-choco/60">Is category ya search query mein koi order mojud nahi hai.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-rose-100/70 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg font-bold text-choco">{order.orderNumber}</span>
                        {order.isToday || order.orderDate === 'Today' ? (
                          <span className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose border border-rose-200">
                            Aaj ka Order • {order.orderTime}
                          </span>
                        ) : (
                          <span className="rounded-lg bg-cream px-2.5 py-1 text-xs font-medium text-choco/70">
                            {order.orderDate} • {order.orderTime}
                          </span>
                        )}
                        <span className="rounded-lg bg-cream px-2 py-0.5 text-xs text-choco/60">
                          {order.type === 'online' ? 'Website Cart' : order.type === 'custom' ? 'Custom Cake' : 'Phone Order'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Status Change Selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-choco/60">Status:</span>
                          <select
                            value={order.status}
                            onChange={e => updateAdminOrderStatus(order.id, e.target.value as AdminOrder['status'])}
                            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer ${
                              order.status === 'Delivered'
                                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                : order.status === 'Out for Delivery'
                                ? 'border-blue-300 bg-blue-50 text-blue-700'
                                : order.status === 'Baking'
                                ? 'border-amber-300 bg-amber-50 text-amber-700'
                                : order.status === 'Cancelled'
                                ? 'border-red-300 bg-red-50 text-red-700'
                                : 'border-rose-300 bg-rose-50 text-rose'
                            }`}
                          >
                            <option value="Pending">Pending Confirmation</option>
                            <option value="Baking">Baking in Oven</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered (Completed)</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        <button
                          onClick={() => setEditingOrder(order)}
                          className="rounded-lg border border-rose-200 p-1.5 text-choco/70 hover:bg-blush hover:text-rose"
                          title="Edit Order"
                        >
                          <FileEdit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Order ${order.orderNumber} hatana chahte hain?`)) {
                              deleteAdminOrder(order.id);
                            }
                          }}
                          className="rounded-lg border border-rose-200 p-1.5 text-choco/70 hover:bg-red-50 hover:text-red-600"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-[1.5fr_1fr]">
                      <div>
                        <p className="text-xs font-semibold text-choco/50">ITEMS ORDERED</p>
                        <div className="mt-1.5 space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span className="font-semibold text-choco">
                                {item.productName} <span className="font-normal text-choco/70">({item.weight})</span> × {item.qty}
                              </span>
                              <span className="font-semibold text-rose">{inr(item.price * item.qty)}</span>
                            </div>
                          ))}
                        </div>
                        {order.notes && (
                          <div className="mt-3 rounded-xl bg-cream-2/70 p-2.5 text-xs text-choco/80">
                            <b>Cake Note / Message:</b> {order.notes}
                          </div>
                        )}
                      </div>

                      <div className="rounded-xl border border-rose-100 bg-cream/40 p-3 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-choco/60">Customer:</span>
                          <span className="font-bold text-choco">{order.customerName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-choco/60">Phone:</span>
                          <a href={`tel:${order.customerPhone}`} className="font-semibold text-rose hover:underline">
                            {order.customerPhone}
                          </a>
                        </div>
                        {order.deliveryAddress && (
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-choco/60 shrink-0">Address:</span>
                            <span className="text-right text-choco/80">{order.deliveryAddress}</span>
                          </div>
                        )}
                        <div className="border-t border-rose-100 pt-1.5 flex items-center justify-between text-sm">
                          <span className="font-bold text-choco">Total Bill:</span>
                          <span className="font-bold text-rose text-base">{inr(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MAAL (CAKES & HAMPERS CATALOG EDIT)               */}
        {/* ========================================================= */}
        {activeTab === 'maal' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-choco">Maal (Cakes & Hampers) Management</h2>
                <p className="text-sm text-choco/70">
                  Sabhi cakes, hampers, prices (under ₹599, bestsellers) edit karein aur naye items jodein.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetProductsToDefault}
                  className="rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-choco hover:bg-blush hover:text-rose transition"
                  title="Reset to initial catalogue"
                >
                  <RefreshCw size={15} className="inline mr-1.5" />
                  Reset to Default
                </button>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="btn-anim btn-rose flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
                >
                  <Plus size={18} />
                  <span>+ Naya Cake / Item Dalein</span>
                </button>
              </div>
            </div>

            {/* Quick Filter Buttons & Search */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: 'all', label: `Sabhi Items (${products.length})` },
                  { key: 'under599', label: `Under ₹599 (${products.filter(p => p.price <= 599).length})` },
                  { key: 'cakes', label: `Cakes (${cakes.length})` },
                  { key: 'hampers', label: `Hampers (${hampers.length})` },
                  { key: 'bestsellers', label: 'Bestsellers' },
                  { key: 'outofstock', label: `Out of Stock (${products.filter(p => p.inStock === false).length})` },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setProductFilter(f.key as any)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      productFilter === f.key
                        ? 'bg-rose text-white shadow-sm'
                        : 'bg-cream text-choco/80 hover:bg-blush hover:text-rose'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-choco/40" />
                <input
                  type="text"
                  placeholder="Cake name, flavour, category..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full rounded-xl border border-rose-200 bg-cream/50 py-2 pl-9 pr-3 text-sm text-choco outline-none focus:border-rose focus:bg-white"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map(p => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-rose-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <div className="relative h-48 w-full bg-cream-2">
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                    {p.tag && (
                      <span className="absolute left-3 top-3 rounded-lg bg-choco/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                        {p.tag}
                      </span>
                    )}
                    <span
                      className={`absolute right-3 top-3 rounded-lg px-2.5 py-1 text-xs font-semibold backdrop-blur ${
                        p.inStock !== false ? 'bg-emerald-600/90 text-white' : 'bg-red-600/90 text-white'
                      }`}
                    >
                      {p.inStock !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold text-choco">{p.name}</h3>
                        <span className="rounded-lg bg-blush px-2 py-0.5 text-xs font-medium text-rose shrink-0">
                          {p.category}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-choco/60">
                        Flavour: <b>{p.flavour}</b> • Type: <b>{p.type}</b>
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-choco/70 line-clamp-2">{p.desc}</p>
                    </div>

                    <div className="mt-4 border-t border-rose-100 pt-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-choco/50">Base Price (500g):</span>
                          <p className="font-serif text-2xl font-bold text-rose">{inr(p.price)}</p>
                          {p.price <= 599 && (
                            <span className="text-[11px] font-bold text-emerald-600">✓ Under ₹599 Deal</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStock(p.id)}
                            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                              p.inStock !== false
                                ? 'border-red-200 text-red-600 hover:bg-red-50'
                                : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                            }`}
                            title="Toggle in/out of stock"
                          >
                            {p.inStock !== false ? 'Stock Hatayein' : 'Stock Dalein'}
                          </button>

                          <button
                            onClick={() => setEditingProduct(p)}
                            className="btn-anim btn-choco rounded-xl px-3.5 py-1.5 text-xs font-semibold"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`"${p.name}" ko menu se hatana chahte hain?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="rounded-xl border border-rose-200 p-1.5 text-choco/60 hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: STOCK MANAGEMENT (AUTO STOCK, HATANA, DAALNA)      */}
        {/* ========================================================= */}
        {activeTab === 'stock' && (
          <div className="space-y-6">
            {/* Header & Auto-Stock Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-choco">Stock Control & Auto-Stock</h2>
                <p className="text-sm text-choco/70">
                  Item ko website se instant out-of-stock karein ya 1-click mein sabhi items ko auto-restock karein.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={autoStockAll}
                  className="btn-anim btn-rose flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md"
                >
                  <Zap size={18} />
                  <span>⚡ 1-Click Auto Stock All (Sabhi In-Stock)</span>
                </button>
              </div>
            </div>

            {/* Quick Status Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
                <span className="text-sm font-semibold text-choco/70">Total Menu Items</span>
                <p className="mt-2 font-serif text-3xl font-bold text-choco">{products.length}</p>
                <p className="mt-1 text-xs text-choco/50">Cakes and Hampers</p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 shadow-sm">
                <span className="text-sm font-semibold text-emerald-800">In Stock (Available Now)</span>
                <p className="mt-2 font-serif text-3xl font-bold text-emerald-700">
                  {products.filter(p => p.inStock !== false).length}
                </p>
                <p className="mt-1 text-xs text-emerald-600">Visible for customer purchase</p>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5 shadow-sm">
                <span className="text-sm font-semibold text-red-800">Out of Stock (Hate Hue)</span>
                <p className="mt-2 font-serif text-3xl font-bold text-red-600">
                  {products.filter(p => p.inStock === false).length}
                </p>
                <p className="mt-1 text-xs text-red-500">Disabled on store</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-white p-4">
              <div className="flex items-center gap-2">
                {[
                  { key: 'all', label: 'All Items' },
                  { key: 'instock', label: 'In Stock' },
                  { key: 'outofstock', label: 'Out of Stock' },
                  { key: 'lowstock', label: 'Low Stock (≤ 8)' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setStockFilter(f.key as any)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      stockFilter === f.key
                        ? 'bg-choco text-white'
                        : 'bg-cream text-choco/80 hover:bg-blush hover:text-rose'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-choco/40" />
                <input
                  type="text"
                  placeholder="Search item to manage stock..."
                  value={stockSearch}
                  onChange={e => setStockSearch(e.target.value)}
                  className="w-full rounded-xl border border-rose-200 bg-cream/50 py-2 pl-9 pr-3 text-sm text-choco outline-none focus:border-rose focus:bg-white"
                />
              </div>
            </div>

            {/* Stock Control Table */}
            <div className="rounded-2xl border border-rose-100 bg-white overflow-hidden shadow-sm">
              <div className="divide-y divide-rose-100">
                {filteredStockItems.map(p => (
                  <div key={p.id} className="flex flex-wrap items-center justify-between gap-4 p-4 hover:bg-cream/40 transition">
                    <div className="flex items-center gap-3.5">
                      <img src={p.img} alt={p.name} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                      <div>
                        <h4 className="font-serif text-base font-bold text-choco">{p.name}</h4>
                        <p className="text-xs text-choco/60">
                          {p.category} • {p.flavour} • Base {inr(p.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      {/* Current Status Badge */}
                      <span
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                          p.inStock !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-600 border border-red-200'
                        }`}
                      >
                        {p.inStock !== false ? '● In Stock' : '✕ Out of Stock'}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 border border-rose-200 rounded-xl bg-cream px-2 py-1">
                        <button
                          onClick={() => setStockCount(p.id, (p.stockCount ?? 10) - 1)}
                          className="h-7 w-7 rounded-lg bg-white text-choco font-bold hover:bg-blush"
                          title="Kam karein"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-sm font-bold text-choco">
                          {p.stockCount ?? 10} units
                        </span>
                        <button
                          onClick={() => setStockCount(p.id, (p.stockCount ?? 10) + 1)}
                          className="h-7 w-7 rounded-lg bg-white text-choco font-bold hover:bg-blush"
                          title="Badhayein"
                        >
                          +
                        </button>
                      </div>

                      {/* Quick Hatana / Daalna Toggle */}
                      <button
                        onClick={() => toggleStock(p.id)}
                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                          p.inStock !== false
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {p.inStock !== false ? 'Stock Hatayein' : 'Stock Dalein (Available)'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: CUSTOMERS MANAGEMENT                              */}
        {/* ========================================================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-choco">Customer Profiles & Directory</h2>
                <p className="text-sm text-choco/70">
                  Customer name, phone number, address, taste notes aur order history edit karein.
                </p>
              </div>

              <button
                onClick={() => setIsAddCustomerOpen(true)}
                className="btn-anim btn-rose flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
              >
                <Plus size={18} />
                <span>+ Naya Customer Jodein</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center justify-between rounded-2xl border border-rose-100 bg-white p-4">
              <div className="relative w-full max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-choco/40" />
                <input
                  type="text"
                  placeholder="Customer name, phone, or city..."
                  value={customerSearch}
                  onChange={e => setCustomerSearch(e.target.value)}
                  className="w-full rounded-xl border border-rose-200 bg-cream/50 py-2 pl-9 pr-3 text-sm text-choco outline-none focus:border-rose focus:bg-white"
                />
              </div>
              <span className="text-xs text-choco/60">{filteredCustomers.length} registered customers</span>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCustomers.map(c => (
                <div key={c.id} className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-2 border-b border-rose-100/70 pb-3">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-choco">{c.name}</h3>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-choco/60">
                        <MapPin size={13} className="text-rose" />
                        <span>{c.city}</span>
                      </div>
                    </div>
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        c.status === 'VIP'
                          ? 'bg-amber-100 text-amber-800'
                          : c.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-choco/60">Phone:</span>
                      <a href={`tel:${c.phone}`} className="font-semibold text-rose hover:underline">
                        {c.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-choco/60">Total Orders:</span>
                      <span className="font-bold text-choco">{c.totalOrders} orders</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-choco/60">Last Ordered:</span>
                      <span className="text-choco/80">{c.lastOrderDate}</span>
                    </div>
                    {c.notes && (
                      <div className="mt-2 rounded-xl bg-cream-2/70 p-2 text-choco/75 italic">
                        "{c.notes}"
                      </div>
                    )}
                  </div>

                  <div className="mt-4 border-t border-rose-100 pt-3 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingCustomer(c)}
                      className="rounded-xl border border-rose-200 px-3.5 py-1.5 text-xs font-semibold text-choco hover:bg-blush hover:text-rose transition"
                    >
                      Edit Customer
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`${c.name} ko delete karna chahte hain?`)) {
                          deleteCustomer(c.id);
                        }
                      }}
                      className="rounded-xl border border-rose-200 p-1.5 text-choco/60 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: EDIT PRODUCT (MAAL)                                */}
      {/* ========================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-choco/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-choco">Edit Cake / Item: {editingProduct.name}</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-blush text-choco"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateProduct(editingProduct.id, editingProduct);
                setEditingProduct(null);
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-choco">Item Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-choco">Price (₹ Base for 500g)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose font-bold text-rose"
                    required
                  />
                  <span className="text-[11px] text-choco/50">
                    {editingProduct.price <= 599 ? '🎉 Automatically appears in "Under ₹599"!' : 'Regular price'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-choco">Flavour</label>
                  <input
                    type="text"
                    value={editingProduct.flavour}
                    onChange={e => setEditingProduct({ ...editingProduct, flavour: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-choco">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                  >
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Love & Romance</option>
                    <option>Theme Cakes</option>
                    <option>Cupcakes</option>
                    <option>Hamper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-choco">Tag (Badge)</label>
                  <select
                    value={editingProduct.tag || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, tag: e.target.value || undefined })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                  >
                    <option value="">None</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Trending">Trending</option>
                    <option value="Premium">Premium</option>
                    <option value="Kids Love">Kids Love</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-choco">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.img}
                  onChange={e => setEditingProduct({ ...editingProduct, img: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                  required
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-choco/60">Quick pick image:</span>
                  {PRESET_IMAGES.slice(0, 5).map(img => (
                    <button
                      type="button"
                      key={img.label}
                      onClick={() => setEditingProduct({ ...editingProduct, img: img.url })}
                      className="rounded-lg bg-cream px-2 py-0.5 text-[11px] text-choco hover:bg-blush hover:text-rose"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-choco">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.desc}
                  onChange={e => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                />
              </div>

              <div className="flex items-center gap-3 border-t border-rose-100 pt-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-choco cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock !== false}
                    onChange={e => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="h-4 w-4 rounded text-rose"
                  />
                  <span>Currently In Stock</span>
                </label>
              </div>

              <div className="mt-4 flex justify-end gap-3 border-t border-rose-100 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded-xl border border-rose-200 px-5 py-2.5 text-sm font-semibold text-choco hover:bg-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-anim btn-rose rounded-xl px-6 py-2.5 text-sm font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NEW PRODUCT                                    */}
      {/* ========================================================= */}
      {isAddProductOpen && (
        <AddProductModal onClose={() => setIsAddProductOpen(false)} onAdd={addProduct} />
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT CUSTOMER                                      */}
      {/* ========================================================= */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-choco/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-choco">Edit Customer Details</h3>
              <button
                onClick={() => setEditingCustomer(null)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-blush text-choco"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateCustomer(editingCustomer.id, editingCustomer);
                setEditingCustomer(null);
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-choco">Customer Name</label>
                <input
                  type="text"
                  value={editingCustomer.name}
                  onChange={e => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-choco">Phone Number</label>
                <input
                  type="text"
                  value={editingCustomer.phone}
                  onChange={e => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-choco">City / Outlet Area</label>
                  <input
                    type="text"
                    value={editingCustomer.city}
                    onChange={e => setEditingCustomer({ ...editingCustomer, city: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-choco">Status</label>
                  <select
                    value={editingCustomer.status}
                    onChange={e => setEditingCustomer({ ...editingCustomer, status: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                  >
                    <option value="Active">Active</option>
                    <option value="VIP">VIP</option>
                    <option value="New">New</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-choco">Taste Notes / Preferences</label>
                <textarea
                  rows={3}
                  value={editingCustomer.notes || ''}
                  onChange={e => setEditingCustomer({ ...editingCustomer, notes: e.target.value })}
                  placeholder="e.g. Always likes chocolate eggless, less sugar..."
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3 border-t border-rose-100 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="rounded-xl border border-rose-200 px-5 py-2 text-sm font-semibold text-choco hover:bg-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-anim btn-rose rounded-xl px-6 py-2 text-sm font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NEW CUSTOMER                                   */}
      {/* ========================================================= */}
      {isAddCustomerOpen && (
        <AddCustomerModal onClose={() => setIsAddCustomerOpen(false)} onAdd={addCustomer} />
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT ORDER                                         */}
      {/* ========================================================= */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-choco/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-choco">Order {editingOrder.orderNumber}</h3>
              <button
                onClick={() => setEditingOrder(null)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-blush text-choco"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateAdminOrder(editingOrder.id, editingOrder);
                setEditingOrder(null);
              }}
              className="mt-4 space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-choco">Customer Name</label>
                  <input
                    type="text"
                    value={editingOrder.customerName}
                    onChange={e => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-choco">Customer Phone</label>
                  <input
                    type="text"
                    value={editingOrder.customerPhone}
                    onChange={e => setEditingOrder({ ...editingOrder, customerPhone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-choco">Delivery Address / Outlet</label>
                <input
                  type="text"
                  value={editingOrder.deliveryAddress || ''}
                  onChange={e => setEditingOrder({ ...editingOrder, deliveryAddress: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-choco">Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={e => setEditingOrder({ ...editingOrder, status: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                  >
                    <option value="Pending">Pending Confirmation</option>
                    <option value="Baking">Baking in Oven</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-choco">Total Bill Amount (₹)</label>
                  <input
                    type="number"
                    value={editingOrder.totalAmount}
                    onChange={e => setEditingOrder({ ...editingOrder, totalAmount: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm font-bold text-rose outline-none focus:border-rose"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-choco">Cake Note / Message</label>
                <textarea
                  rows={2}
                  value={editingOrder.notes || ''}
                  onChange={e => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3 border-t border-rose-100 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="rounded-xl border border-rose-200 px-5 py-2 text-sm font-semibold text-choco hover:bg-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-anim btn-rose rounded-xl px-6 py-2 text-sm font-semibold"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD MANUAL / PHONE ORDER                           */}
      {/* ========================================================= */}
      {isAddOrderOpen && (
        <AddOrderModal
          onClose={() => setIsAddOrderOpen(false)}
          onAdd={addAdminOrder}
          products={products}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// HELPER MODAL: Add Product
// -------------------------------------------------------------
function AddProductModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (p: any) => void;
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(549);
  const [flavour, setFlavour] = useState('Chocolate');
  const [category, setCategory] = useState('Birthday');
  const [type, setType] = useState<'cake' | 'hamper'>('cake');
  const [tag, setTag] = useState('');
  const [img, setImg] = useState(PRESET_IMAGES[0].url);
  const [desc, setDesc] = useState('Freshly baked on order, 100% eggless with premium ingredients.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      shortName: name,
      price: Number(price),
      rating: 4.9,
      reviews: 12,
      flavour,
      category,
      occasions: [category, 'Custom Cakes'],
      desc,
      type,
      tag: tag || undefined,
      img,
      inStock: true,
      stockCount: 15,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-choco/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-rose-100 pb-3">
          <h3 className="font-serif text-xl font-bold text-choco">Naya Cake / Hamper Jodein</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-blush text-choco">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-choco">Item Name</label>
            <input
              type="text"
              placeholder="e.g. Belgian Chocolate Mousse Cake"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-choco">Price (₹ Base for 500g)</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco font-bold text-rose outline-none focus:border-rose"
                required
              />
              <span className="text-[11px] text-choco/50">
                {price <= 599 ? '🎉 Appears in Under ₹599!' : 'Regular price'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-choco">Flavour</label>
              <select
                value={flavour}
                onChange={e => setFlavour(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              >
                <option>Chocolate</option>
                <option>Vanilla</option>
                <option>Red Velvet</option>
                <option>Butterscotch</option>
                <option>Strawberry</option>
                <option>Pineapple</option>
                <option>Mix Fruit</option>
                <option>Mix</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-choco">Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              >
                <option value="cake">Cake</option>
                <option value="hamper">Hamper</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-choco">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              >
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Love & Romance</option>
                <option>Theme Cakes</option>
                <option>Cupcakes</option>
                <option>Hamper</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-choco">Tag (Badge)</label>
              <select
                value={tag}
                onChange={e => setTag(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              >
                <option value="">None</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Trending">Trending</option>
                <option value="Premium">Premium</option>
                <option value="Kids Love">Kids Love</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-choco">Photo Selection</label>
            <input
              type="text"
              value={img}
              onChange={e => setImg(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              required
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESET_IMAGES.map(p => (
                <button
                  type="button"
                  key={p.label}
                  onClick={() => setImg(p.url)}
                  className={`rounded-lg border px-2.5 py-1 text-xs transition ${
                    img === p.url ? 'border-rose bg-rose text-white' : 'border-rose-200 bg-cream text-choco/70'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-choco">Description</label>
            <textarea
              rows={2}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-rose-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-rose-200 px-5 py-2 text-sm font-semibold text-choco hover:bg-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-anim btn-rose rounded-xl px-6 py-2 text-sm font-semibold"
            >
              Add to Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// HELPER MODAL: Add Customer
// -------------------------------------------------------------
function AddCustomerModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (c: any) => void;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Kaithal');
  const [status, setStatus] = useState<'Active' | 'VIP' | 'New'>('New');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      phone,
      city,
      totalOrders: 1,
      lastOrderDate: 'Today',
      status,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-choco/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-rose-100 pb-3">
          <h3 className="font-serif text-xl font-bold text-choco">Naya Customer Jodein</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-blush text-choco">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-choco">Customer Name</label>
            <input
              type="text"
              placeholder="e.g. Deepak Kumar"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-choco">Phone Number</label>
            <input
              type="text"
              placeholder="e.g. 98125-XXXXX"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-choco">City / Area</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-choco">Customer Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              >
                <option value="New">New</option>
                <option value="Active">Active</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-choco">Taste Notes / Preferences</label>
            <textarea
              rows={2}
              placeholder="Special instructions or favorite cakes..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-rose-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-rose-200 px-5 py-2 text-sm font-semibold text-choco hover:bg-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-anim btn-rose rounded-xl px-6 py-2 text-sm font-semibold"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// HELPER MODAL: Add Manual / Phone Order
// -------------------------------------------------------------
function AddOrderModal({
  onClose,
  onAdd,
  products,
}: {
  onClose: () => void;
  onAdd: (order: any) => void;
  products: Product[];
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Kaithal');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'choc-truffle');
  const [weight, setWeight] = useState('1 kg');
  const [qty, setQty] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<AdminOrder['status']>('Baking');

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  const weightMult = selectedProduct?.type === 'cake' ? ({ '500g': 1, '1 kg': 1.8, '1.5 kg': 2.6, '2 kg': 3.4 }[weight] ?? 1) : 1;
  const computedTotal = Math.round((selectedProduct?.price || 799) * weightMult * qty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    onAdd({
      customerName,
      customerPhone,
      customerCity,
      items: [
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          weight,
          qty,
          price: Math.round(selectedProduct.price * weightMult),
        },
      ],
      totalAmount: computedTotal,
      orderDate: 'Today',
      orderTime: timeStr,
      isToday: true,
      status,
      type: 'manual',
      deliveryAddress: deliveryAddress || `${customerCity} Outlet Pickup`,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-choco/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-rose-100 pb-3">
          <h3 className="font-serif text-xl font-bold text-choco">Naya Phone / Walk-in Order Dalein</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-blush text-choco">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-choco">Customer Name</label>
              <input
                type="text"
                placeholder="Name"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-choco">Phone Number</label>
              <input
                type="text"
                placeholder="Phone"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-choco">Cake / Product Select Karein</label>
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — {inr(p.price)} ({p.category})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-choco">Weight</label>
              <select
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              >
                <option>500g</option>
                <option>1 kg</option>
                <option>1.5 kg</option>
                <option>2 kg</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-choco">Quantity</label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-choco">Outlet / City</label>
              <input
                type="text"
                value={customerCity}
                onChange={e => setCustomerCity(e.target.value)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-choco">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
              >
                <option value="Pending">Pending Confirmation</option>
                <option value="Baking">Baking in Oven</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-choco">Delivery Address / Notes</label>
            <input
              type="text"
              placeholder="Address or outlet pickup..."
              value={deliveryAddress}
              onChange={e => setDeliveryAddress(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-choco">Cake Note (Message on Cake)</label>
            <textarea
              rows={2}
              placeholder="e.g. Happy Birthday Papa in dark chocolate icing..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3.5 py-2 text-sm text-choco outline-none focus:border-rose"
            />
          </div>

          <div className="rounded-xl bg-cream-2/70 p-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-choco">Total Order Amount:</span>
            <span className="font-serif text-2xl font-bold text-rose">{inr(computedTotal)}</span>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-rose-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-rose-200 px-5 py-2 text-sm font-semibold text-choco hover:bg-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-anim btn-rose rounded-xl px-6 py-2 text-sm font-semibold"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

