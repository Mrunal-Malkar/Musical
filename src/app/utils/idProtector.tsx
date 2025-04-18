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
    } else if(zoneId){
      setIsAllowed(true);
    }
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  if (!isAllowed) return null; 

  return <>{children}</>;
};

export default ZoneIdProtector;
