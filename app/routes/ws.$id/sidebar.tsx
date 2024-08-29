import { useNavigate, useParams } from "@remix-run/react";

import { ChevronLeft } from "lucide-react";

import { Button } from "~/components/ui/button";

import { regenerateDash } from "~/utils/misc";

import { Desktop } from "../ws/sidebar";

export default function WorkspaceSidebar({
  withoutMobile = false,
}: {
  withoutMobile?: boolean;
}) {
  return (
    <>
      <Desktop />
      {!withoutMobile && <Mobile />}
    </>
  );
}

function Mobile() {
  const params = useParams();
  const navigate = useNavigate();

  const title = params.id ? regenerateDash(params.id).withoutTheLast() : "-";

  const BackButton = () => (
    <Button
      variant="transparent"
      className="gap-2 px-0 font-medium hover:font-medium"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft size={20} strokeWidth={2} />
      <span>Kembali</span>
    </Button>
  );

  return (
    <div className="fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-between gap-2 border-b border-input bg-background px-4 md:hidden">
      <div>
        <BackButton />
      </div>
      <div className="flex items-center md:hidden">
        <h2 className="text-sm font-bold">
          {title.length > 35 ? `${title.substring(0, 35)}..` : title}
        </h2>
      </div>
    </div>
  );
}
