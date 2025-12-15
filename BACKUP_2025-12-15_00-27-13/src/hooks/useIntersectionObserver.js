
import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}) => {
  const [entry, setEntry] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const frozen = entry?.isIntersecting && freezeOnceVisible;
  
  const elementRef = useRef(null);

  const updateEntry = ([entry]) => {
    setEntry(entry);
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

  return { ref: elementRef, entry, isVisible };
};
