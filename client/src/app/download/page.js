import { Suspense } from "react";
import DownloadClient from "./DownloadClient";

export default function DownloadPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <DownloadClient />
    </Suspense>
  );
}
