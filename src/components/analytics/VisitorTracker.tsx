"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const response = await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || "direct"
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Tracking Error:", errorData);
        }
      } catch (err) {
        console.error("Failed to track visit:", err);
      }
    };

    // Delay tracking slightly to prioritize page load
    const timer = setTimeout(trackVisit, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
