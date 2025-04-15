'use client';

import { useRouter } from 'next/navigation'; 
import { ReactNode, useEffect, useState } from 'react';

const ZoneIdProtector = ({ children }: { children: ReactNode }) => {
  const route = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const zoneId = localStorage.getItem("zoneId");
    if (!zoneId) {
      route.push("/zoneId");
    } else {
      setIsAllowed(true);
    }
  }, []);

  if (!isAllowed) return null; 

  return <>{children}</>;
};

export default ZoneIdProtector;
