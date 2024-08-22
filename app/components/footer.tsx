import { Link } from "@remix-run/react";

import { Copyright } from "lucide-react";

import { MybucksLogo } from "~/utils/icons";

export default function Footer() {
  return (
    <div className="max-w-screen-3xl mx-auto flex flex-col gap-6">
      <div className="mb-14 hidden w-fit lg:block">
        <MybucksLogo />
      </div>
      <div className="flex gap-12">
        <Link to="/" className="text-xs font-semibold">
          Syarat & Ketentuan
        </Link>
        <Link to="/" className="text-xs font-semibold">
          Kebijakan Privasi
        </Link>
        <Link to="/" className="text-xs font-semibold">
          Ikuti Kami
        </Link>
      </div>
      <p className="hidden items-start gap-1 text-wrap text-xs font-normal leading-relaxed text-muted-foreground md:flex">
        <span>
          <Copyright size={14} strokeWidth={1.5} className="mt-[3px]" />
        </span>
        <span>
          {new Date().getFullYear()} PT Abadi Digital Bersama, Tbk. Jl. Prof.
          DR. Satrio No.7, RT.7/RW.2, Kuningan, Kuningan Timur, Kecamatan
          Setiabudi, Kota Jakarta Selatan, DKI Jakarta 12950
        </span>
      </p>
    </div>
  );
}
