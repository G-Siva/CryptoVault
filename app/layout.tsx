import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigations/navbar';
import Footer from '@/components/navigations/footer';
import Hero from '@/components/home/hero';
import BgAnimation from '@/components/animation/bganimation';
import StatisticsCard from '@/components/stats/statisticscard';
import ToggleButton from '@/components/ToogleButton';
import Main from '@/components/home/main';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToggleButton>
          <BgAnimation />
          <Navbar />
          <div className="pt-16 sm:pt-20">
            <Main />
             
            {/* Hero Section */}
            <div className="mb-12">
              <Hero />
            </div>
            
            {/* Statistics Cards */}
            <div className="mb-12">
              <StatisticsCard />
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 pb-12">
              {children}
            </main>
          </div>
          
          {/* Footer */}
          <Footer />
        </ToggleButton>
      </body>
    </html>
  );
}