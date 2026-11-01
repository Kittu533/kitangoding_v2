"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, inView, type AnimationPlaybackControls } from "motion";
import { useReducedMotion } from "motion/react";
import studio from "../Studio.module.css";
import blog from "../pages/Blog.module.css";
import portfolio from "../components/Portfolio.module.css";

export function StudioMotion() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const main = document.getElementById("konten");
    if (!main) return;
    const animations: AnimationPlaybackControls[] = [];
    const observers: Array<() => void> = [];
    const seen = new WeakSet<Element>();
    const observe = () => {
      const targets = Array.from(main.querySelectorAll(
        `:scope > section > :is(h1,h2,p), :scope > header, :scope > article > header, .${studio.centerHeading}, .${studio.splitHeading}, .${studio.aboutCopy}, .${studio.aboutGallery}, .${studio.servicesHeading}, .${studio.service}, .${studio.workHeading}, .${studio.processGrid} > article, .${studio.priceCard}, .${studio.faq} > div, .${studio.finalCta} > *, .${blog.card}, .${blog.articleCover}, .${portfolio.card}`,
      )).filter(element => !seen.has(element));
      if (!targets.length) return;
      targets.forEach(element => seen.add(element));
      observers.push(inView(targets, element => {
        const siblings = Array.from(element.parentElement?.children || []);
        const delay = Math.min(siblings.indexOf(element) * 0.07, 0.21);
        animations.push(animate(element, { opacity: [0.25, 1], y: [22, 0] }, {
          duration: 0.65, delay, ease: [0.22, 1, 0.36, 1],
        }));
      }, { margin: "0px 0px -24px 0px" }));
    };
    observe();
    // Portfolio and pricing can arrive after hydration through Suspense.
    const contentObserver = new MutationObserver(observe);
    contentObserver.observe(main, { childList: true, subtree: true });

    return () => {
      contentObserver.disconnect();
      observers.forEach(stop => stop());
      animations.forEach(animation => animation.cancel());
    };
  }, [pathname, reducedMotion]);

  return null;
}
