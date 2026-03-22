import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

const baseUrl = "https://controla.cloud";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const blog = messages.blog;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/blog`;
  }
  languages["x-default"] = `${baseUrl}/es/blog`;

  return {
    title: `${blog.title} | Controlá`,
    description: blog.subtitle,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages,
    },
    openGraph: {
      title: `${blog.title} | Controlá`,
      description: blog.subtitle,
      url: `${baseUrl}/${locale}/blog`,
      siteName: "Controlá",
      type: "website",
      locale,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts(locale);

  return <BlogContent posts={posts} locale={locale} />;
}

function BlogContent({
  posts,
  locale,
}: {
  posts: Awaited<ReturnType<typeof getAllPosts>>;
  locale: string;
}) {
  const t = useTranslations("blog");

  return (
    <main>
      <section className="pt-[168px] pb-[100px] px-6 bg-white max-md:pt-[138px] max-md:pb-[70px]">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[0.82rem] font-semibold text-azul uppercase tracking-[1.5px] mb-2">
            {t("label")}
          </p>
          <h1 className="text-[clamp(1.6rem,3vw,2.3rem)] font-bold text-navy leading-[1.3] mb-3">
            {t("title")}
          </h1>
          <p className="text-texto-light text-[1.05rem] mb-14 max-w-[600px]">
            {t("subtitle")}
          </p>

          {posts.length === 0 ? (
            <p className="text-texto-light text-center py-20">
              {t("soon")}
            </p>
          ) : (
            <div className="flex flex-col gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="block no-underline group"
                >
                  <article className="border border-gris rounded-2xl p-8 transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-4">
                      {post.tag && (
                        <span className="text-[0.75rem] font-semibold text-naranja uppercase tracking-[0.5px]">
                          {post.tag}
                        </span>
                      )}
                      {post.date && (
                        <span className="text-[0.75rem] text-gris-dark">
                          {new Date(post.date).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <h2 className="text-[1.2rem] font-bold text-navy mb-2 leading-[1.4] group-hover:text-azul transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[0.92rem] text-texto-light leading-[1.65]">
                      {post.description}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              href={`/${locale}#contacto`}
              className="text-azul font-semibold text-[0.95rem] no-underline hover:underline"
            >
              &larr; {t("backToHome")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
