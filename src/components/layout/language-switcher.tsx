'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const languages = {
  en: 'English',
  km: 'ខ្មែរ'
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath as any);
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4" />
      <select
        value={locale}
        onChange={(e) => switchLanguage(e.target.value)}
        className="bg-transparent border-none text-sm font-medium cursor-pointer focus:outline-none"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
} 