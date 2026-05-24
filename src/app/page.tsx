import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import TrendingProducts from '@/components/home/TrendingProducts';
import PremiumCollection from '@/components/home/PremiumCollection';
import FlashDeals from '@/components/home/FlashDeals';
import CustomerReviews from '@/components/home/CustomerReviews';
import SustainableBanner from '@/components/home/SustainableBanner';
import InspirationGrid from '@/components/home/InspirationGrid';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <TrendingProducts />
      <FlashDeals />
      <PremiumCollection />
      <SustainableBanner />
      <CustomerReviews />
      <InspirationGrid />
    </>
  );
}
