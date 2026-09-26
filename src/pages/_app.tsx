import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/context/ThemeContext";
import { AudioProvider } from "@/context/AudioContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeTransition from "@/components/ThemeTransition";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AudioProvider>
      <ThemeProvider>
        <div className={`flex flex-col min-h-screen ${['/contact', '/404'].includes(router.pathname) ? 'lg:h-screen lg:overflow-hidden' : ''}`}>
          <ThemeTransition />
          <Navbar />
          <main className="pt-16 flex-grow flex flex-col relative">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </AudioProvider>
  );
}
