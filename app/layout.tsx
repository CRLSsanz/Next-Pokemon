import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  Barlow_Condensed, //para mucho texto y numeros
  Orbitron,
  Allerta_Stencil,
  Gugi, //Titulo mayuscula
  //Stick, //PAra game
  Text_Me_One,
  Josefin_Sans,
  Poiret_One,
  Abel,
  Raleway,
  Jost,
  Roboto,
  Comfortaa,
  Montserrat,
  Outfit,
} from "next/font/google";
import PokemonProvider from "./context/PokemonContext";

const inter = Outfit({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pokemon Code",
  description: "Generated by create CRLSCODE",
};

// WEB TUTORIAL
// https://www.youtube.com/watch?v=0jFq3VHj-rw&t=7s

//bg-cover bg-fixed bg-[0%] bg-[url('/images/piggy-mobile.jpg')] min-h-screen
//https://www.pixelstalk.net/wp-content/uploads/2016/02/Pokemon-Backgrounds-for-desktop.jpg
//

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`$ {geistSans.variable} $ {geistMono.variable} antialiased ${inter.className}`}
      >
        <div className="bg-cover bg-fixed bg-[0%] bg-[url('https://wallpapercave.com/wp/wp10742481.jpg')] min-h-screen">
          <div className="w-full h-full lg:h-screen p-5 lg:p-0 flex lg:items-center justify-center ">
            <PokemonProvider>
              {children}
            </PokemonProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
