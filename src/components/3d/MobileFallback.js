import { useEffect, useState } from "react";
import { getDeviceCapabilities } from "@/utils/performanceOptimizer";

export default function MobileFallback({ children, fallback }) {
  const [shouldShowFallback, setShouldShowFallback] = useState(false);

  useEffect(() => {
    const capabilities = getDeviceCapabilities();
    setShouldShowFallback(capabilities.mobile || !capabilities.webgl);
  }, []);

  return shouldShowFallback ? fallback : children;
}
