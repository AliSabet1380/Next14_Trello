import Footer from "@/components/other/Home/Footer";
import Navbar from "@/components/other/Home/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-gray-100">
      <Navbar />
      <main className="pb-20 pt-40 bg-gray-100">{children}</main>
      <Footer />
    </div>
  );
};
export default MarketingLayout;
