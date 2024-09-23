"use client";

import { useRef, useEffect } from "react";

import styles from "./meet-button.module.css";

export function MeetButton() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    btnRef?.current?.addEventListener("mouseover", () => {
      parentRef.current?.style.setProperty("--size", "250px");
      parentRef.current?.style.setProperty(
        "--shineColor",
        "rgba(255, 255, 255, 0.3)"
      );
    });

    btnRef?.current?.addEventListener("mouseleave", () => {
      parentRef.current?.style.setProperty("--size", "0px");
      parentRef.current?.style.setProperty(
        "--shineColor",
        "rgba(255, 255, 255, 0.0)"
      );
    });

    btnRef?.current?.addEventListener("mousemove", (e) => {
      parentRef.current?.style.setProperty("--x", e.offsetX + "px");
      parentRef.current?.style.setProperty("--y", e.offsetY + "px");
    });
  }, []);

  return (
    <div ref={parentRef} className={styles.skeuParent}>
      <button
        ref={btnRef}
        className={`overflow-hidden cursor-pointer text-white rounded-full px-4 py-2 bg-[radial-gradient(100%_100%_at_100%_0%,_#000_0%,_#000_100%)] transition-[box-shadow_0.15s_ease,_transform_0.15s_ease] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[inset_0px_3px_7px_#6903f6] ${styles.skeu}`}
      >
        Entrar em contato
      </button>
    </div>
  );
}
