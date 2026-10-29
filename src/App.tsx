import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { CartDrawer, CustomOrderModal, OrderSuccessModal, QuickViewModal, SearchModal, Toast } from './components/Modals';
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Orders from './pages/Orders';
import Hampers from './pages/Hampers';
import { About, Gallery } from './pages/Extra';
import { ShopProvider, useShop } from './store';

function Shell() {
  const { page } = useShop();
  return (
    <div className="min-h-screen bg-cream font-sans text-choco antialiased">
      <Header />
      <div key={page} className="anim-fade-in">
        {page === 'home' && <Home />}
        {page === 'cakes' && <Cakes />}
        {page === 'orders' && <Orders />}
        {page === 'hampers' && <Hampers />}
        {page === 'gallery' && <Gallery />}
        {page === 'about' && <About />}
      </div>
      <Footer dark={page === 'hampers'} />
      <WhatsAppButton />
      <QuickViewModal />
      <CartDrawer />
      <CustomOrderModal />
      <SearchModal />
      <OrderSuccessModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Shell />
    </ShopProvider>
  );
}
