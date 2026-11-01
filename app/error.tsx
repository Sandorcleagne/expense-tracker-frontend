// app/error.tsx — catches everything else (any route segment, since layout stays mounted)
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // send to your logging/monitoring here
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => retry()}>Try again</button>
    </div>
  );
}
