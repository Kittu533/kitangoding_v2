"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-4 font-sans text-center">
      <div className="space-y-6 max-w-md w-full">
        {/* Abstract Illustration/Icon */}
        <div className="relative mx-auto h-40 w-40">
          <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse blur-3xl opacity-50"></div>
          <div className="relative flex h-full items-center justify-center text-[8rem] font-black text-indigo-600/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 bg-indigo-600 text-white rounded-2xl rotate-12 flex items-center justify-center shadow-xl shadow-indigo-600/20 ring-1 ring-white/20">
              <svg className="h-8 w-8 -rotate-12" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-base text-zinc-500">
            Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman ini mungkin telah dipindahkan atau dihapus.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button 
            onClick={() => router.back()}
            className="w-full sm:w-auto h-11 px-8 rounded-full"
          >
            Kembali ke Halaman Sebelumnya
          </Button>
          <Link 
            href="/contact" 
            className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto h-11 px-8 rounded-full border-zinc-200")}
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}
