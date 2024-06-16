import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { redirect } from 'next/navigation';

import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import clsx from 'clsx';

import { localeFont, font_variables, locales } from '@/locales';
import type { Locale } from '@/locales';

import './globals.css';

export type LocaleProps = { locale: Locale };

export type RootLayoutProps = PropsWithChildren & {
  params: LocaleProps;
};

export async function generateMetadata({
  params: { locale },
}: Pick<RootLayoutProps, 'params'>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://armina-levon-wedding.vercel.app'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      siteName: t('title'),
      title: t('title'),
      description: t('description'),
      images: '/LA.png',
    },
    twitter: {
      site: t('title'),
      title: t('title'),
      description: t('description'),
      images: '/LA.png',
    },
  };
}

export default function RootLayout({ children, params: { locale } }: Readonly<RootLayoutProps>) {
  if (!locales.includes(locale)) redirect('/hy');

  const messages = useMessages();

  return (
    <html lang={locale} >
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title></title>
    </head>
    <body className={clsx(localeFont[locale], font_variables)}>
    <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
