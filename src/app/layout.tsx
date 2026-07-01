import type { Metadata } from "next";
import {
  Fraunces,
  Instrument_Sans,
  JetBrains_Mono,
  Kaushan_Script,
  Zhi_Mang_Xing,
} from "next/font/google";
import "./globals.css";
import WorldMapBackground from "./components/WorldMapBackground";
import WorldMapSvg from "./components/WorldMapSvg";
import PaperTexture from "./components/PaperTexture";
import ThemeToggle from "./components/ThemeToggle";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body and prose.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Mono accents.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Hero greeting — English script font.
const kaushanScript = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kaushan",
  display: "swap",
});

// Hero greeting — Chinese handwriting font for 俊成。
const zhiMangXing = Zhi_Mang_Xing({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zhimang",
  display: "swap",
  preload: false,
});

const title = "JC Ang | 洪俊成";
const siteName = "JC Ang";
const description = "Present dad and product builder.";
const url = "https://jcang.org";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  openGraph: {
    type: "website",
    url,
    siteName,
    title,
    description,
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: siteName },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/og-image.png"],
  },
};

// Sets the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} ${kaushanScript.variable} ${zhiMangXing.variable}`}
    >
      <body className="min-h-screen">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Dark-mode headshot de-fringe: fade the faint, low-alpha watercolour
            edge pixels so no white halo shows on the dark background. */}
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          className="absolute"
        >
          <filter id="headshot-defringe" colorInterpolationFilters="sRGB">
            {/* Linear alpha threshold: drop the faint, low-alpha halo pixels to
                zero while leaving the near-opaque subject crisp. */}
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.6" intercept="-0.45" />
            </feComponentTransfer>
          </filter>
        </svg>
        {/* Layer order, back to front: world map, paper grain, content. */}
        <WorldMapBackground>
          <WorldMapSvg />
        </WorldMapBackground>
        <PaperTexture />
        <ThemeToggle />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
