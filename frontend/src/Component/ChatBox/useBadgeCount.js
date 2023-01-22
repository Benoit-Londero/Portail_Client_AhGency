import { useState } from 'react';

export default function useBadgeCount() {
  const [badgeCount, setBadgeCount] = useState(0);

  const incrementBadgeCount = () => {
    setBadgeCount((prevBadgeCount) => prevBadgeCount + 1);
  };

  const resetBadgeCount = () => {
    setBadgeCount(0);
  };

  return { badgeCount, incrementBadgeCount, resetBadgeCount };
}