import BreadcrumbContact from '@/components/BreadcrumbContact';
import Contact from '@/components/Contact';
import Map from '@/components/Map';
import Head from 'next/head';
import React from 'react'

const Page = () => {

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
      <main style={{overflow:"hidden"}} className="main__content_wrapper">
   <BreadcrumbContact/>
   <Contact/>
     <Map/>


</main>

    </>
  )
}

export default Page
