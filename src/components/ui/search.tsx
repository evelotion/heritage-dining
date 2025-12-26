'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Fungsi agar tidak spam server setiap ketik 1 huruf (tunggu 300ms)
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-lg border border-zinc-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-500 focus:border-batik focus:outline-none focus:ring-1 focus:ring-batik"
        placeholder={placeholder}
        onChange={(e) => {
          // Debounce manual sederhana
          setTimeout(() => handleSearch(e.target.value), 500); 
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-batik" />
    </div>
  );
}