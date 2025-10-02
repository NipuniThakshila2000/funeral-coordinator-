"use client";

import { type ElementType, type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
};

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  once = true,
  threshold = 0.2,
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const nodeRef = useRef<HTMLElement | null>(null);

  const setNodeRef = (node: HTMLElement | null) => {
    nodeRef.current = node;
  };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  return (
    <Component
      ref={setNodeRef}
      className={cn(
        "relative opacity-0 translate-y-6 transition duration-700 ease-out will-change-transform",
        isVisible && "opacity-100 translate-y-0 motion-safe:animate-rise-soft",
        className
      )}
      style={isVisible ? { animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
