import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getAllSlugs } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import Markdown from "./Markdown";
import type { Metadata } from "next";

const baseUrl = "https://controla.cloud";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}/blog/${slug}`;
  }
  languages["x-default"] = `${baseUrl}/es/blog/${slug}`;

  return {
    title: `${post.title} | Controlá`,
    description: post.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      siteName: "Controlá",
      type: "article",
      publishedTime: post.date,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug, locale);
  if (!post) notFound();

  return <PostContent post={post} locale={locale} />;
}

function PostContent({
  post,
  locale,
}: {
  post: NonNullable<ReturnType<typeof getPost>>;
  locale: string;
}) {
  const t = useTranslations("blog");

  return (
    <main>
      <article className="pt-[148px] pb-[80px] px-6 bg-white max-md:pt-[118px] max-md:pb-[50px]">
        <div className="max-w-[720px] mx-auto">
          {/* Header */}
          <div className="mb-10">
            <Link
              href={`/${locale}/blog`}
              className="text-azul text-[0.85rem] font-semibold no-underline hover:underline mb-6 inline-block"
            >
              &larr; {t("backToBlog")}
            </Link>

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

            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-[800] text-navy leading-[1.2] tracking-[-0.5px]">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-texto-light text-[1.1rem] mt-4 leading-[1.7]">
                {post.description}
              </p>
            )}
          </div>

          {/* Divider */}
          <hr className="border-t border-gris mb-10" />

          {/* Content */}
          <Markdown content={post.content} />

          {/* Footer CTA */}
          <div className="mt-16 pt-10 border-t border-gris text-center">
            <p className="text-navy font-bold text-[1.1rem] mb-4">
              {t("ctaTitle")}
            </p>
            <a
              href={`/${locale}#contacto`}
              className="inline-block bg-naranja text-white font-bold py-3 px-8 rounded-xl no-underline transition-all hover:bg-naranja-hover hover:-translate-y-0.5"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
