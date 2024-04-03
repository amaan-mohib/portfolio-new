import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MainWrapper from "../components/MainWrapper/MainWrapper";
import BackgroundSwitcher from "../components/BackgroundSwitcher";
import { cookies, headers } from "next/headers";
import { getCachedData } from "@/actions/getCachedData";
import { convert } from "html-to-text";

const inter = Inter({ subsets: ["latin"] });
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--display-font",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--body-font",
});

export async function generateMetadata({
  params,
  searchParams,
}: any): Promise<Metadata> {
  const info = await getCachedData("info");

  const description = convert(info.description);

  const headerList = headers();
  const host = headerList.get("host");

  return {
    title: {
      template: `${info.name} - %s`,
      default: `${info.name}`,
    },
    description,
    keywords: [
      "Next.js",
      "React",
      "JavaScript",
      "TypeScript",
      "Software Engineer",
      "Portfolio",
      info.name,
    ],
    authors: [{ name: info.name }],
    creator: info.name,
    publisher: info.name,
    openGraph: {
      url: `https://${host}`,
      title: {
        template: `${info.name} - %s`,
        default: `${info.name}`,
      },
      type: "profile",
      siteName: info.name,
      description,
      images: [
        {
          url: "https://amaan-mohib.github.io/assets/img/favicon.png",
          width: 180,
          height: 110,
        },
      ],
    },
    icons: {
      icon: "/android-chrome-192x192.png",
      apple: "/android-chrome-192x192.png",
      shortcut: "/android-chrome-192x192.png",
    },
    manifest: "/manifest.json",
    ...(info.googleVerification
      ? {
          verification: {
            google: info.googleVerification,
          },
        }
      : {}),
    archives: ["https://amaan-mohib.web.app"],
    category: "technology",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <html lang="en" data-theme={theme}>
      <body
        className={`${sourceSerif.variable} ${ibmPlexMono.variable} ${ibmPlexMono.className}`}
      >
        <BackgroundSwitcher>
          <div className="relative mx-auto max-w-3xl px-5">
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </div>
        </BackgroundSwitcher>
      </body>
    </html>
  );
}
