import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-albert-sans",
});

const localeNames: Record<string, string> = {
  es: "Español",
  en: "English",
  ca: "Català",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
};

const baseUrl = "https://controla.cloud";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const meta = messages.meta;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }
  languages["x-default"] = `${baseUrl}/es`;

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `${baseUrl}/${locale}`,
      siteName: "Controlá",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const htmlLang = locale === "ca" ? "ca" : locale;

  return (
    <html lang={htmlLang} className={albertSans.variable} style={{ colorScheme: "light" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Controlá",
              url: baseUrl,
              logo: `${baseUrl}/logo.svg`,
              description:
                "Controlá digitizes hotel infrastructure. HVAC automation, room operations, incident prevention, and access control.",
              foundingDate: "2025",
              founders: [
                {
                  "@type": "Person",
                  name: "Tomás Kancyper",
                  jobTitle: "CEO",
                  sameAs: "https://www.linkedin.com/in/tkancyper/",
                },
                {
                  "@type": "Person",
                  name: "Ezequiel Vallejo",
                  jobTitle: "Co-founder",
                  sameAs:
                    "https://www.linkedin.com/in/ezequiel-vallejo/",
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Barcelona",
                addressCountry: "ES",
              },
              sameAs: [
                "https://www.linkedin.com/company/controla-iot/",
              ],
            }),
          }}
        />
      </head>
      <body className={albertSans.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </NextIntlClientProvider>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vzvafkxry9");`}
        </Script>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="bc8f1cc5-f6f5-425f-a01c-c9642dfee809"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
