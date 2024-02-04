import { Inter } from "next/font/google";
import "./globals.css";
import "../../public/css/style.css";
import "../../public/css/plugins/glightbox.min.css";
import "../../public/css/plugins/swiper-bundle.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import Prvider from "@/Redux/Prvider";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title:
    "YATAS",
  description:
    "Amazing Jewellery by YATAS . The most beautiful range of Jewellery. Boundless wonders of the world are translated into rare and exquisite jewellery. Enquire online. Stunning Jewellery.",
};
export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <html lang="en">
        <body className={inter.className}>
          <Prvider>
            <Navbar />
            <ChakraProvider>{children}</ChakraProvider>
            <Footer />
            <Toaster />
          </Prvider>
        </body>
      </html>
    </>
  );
}
