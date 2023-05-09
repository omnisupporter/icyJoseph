import type { ReactNode } from "react";

export const Keyword = ({ children }: { children: ReactNode }) => (
  <b className="inline font-normal text-pale-green">{children}</b>
);
