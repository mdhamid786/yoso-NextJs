import Banner from "@/components/Banner";
import BannerBottom from "@/components/BannerBottom";
import DealofWeek from "@/components/DealofWeek";
import NewsLetter from "@/components/NewsLetter";
import Products from "@/components/Products";
import Shipping from "@/components/Shipping";
import Slider from "@/components/Slider";
import TopSellingProduct from "@/components/TopSellingProduct";
import VideoBanner from "@/components/VideoBanner";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>YATAS Jewellery</title>
        <meta
          name="description"
          content="Amazing Jewellery by YATAS .
              The most beautiful range of Jewellery.
                Boundless wonders of the world are translated into rare and exquisite jewellery.
                Enquire online. Stunning Jewellery."
        />
        <meta
          name="keywords"
          content="jewelry, fashion, jewellery,
              handmade, earJewellery, accessories,
                necklace, gold, handmadejewelry, love, style,
                jewelrydesigner, silver, jewelryaddict, ring,
                  bracelet, jewelrydesign, jewels, Jewellery,
                  bracelets, diamonds, design, diamond, beautiful,
                    instagood, art, instajewelry, gemstones, luxury,
                    jewelrygram"
        />
      </Head>
      <main className="main__content_wrapper">

        <Slider />
        
        <Banner />
        <TopSellingProduct />
        <Products />
        <DealofWeek />
        <BannerBottom />
        <VideoBanner />
        <Shipping />
        <NewsLetter />
      </main>
    </>
  );
}
