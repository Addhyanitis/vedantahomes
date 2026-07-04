import { createContext, useContext, type ReactNode } from "react";
import type { CompanyInfo } from "./site-content.types";

const CompanyContext = createContext<CompanyInfo | undefined>(undefined);

export function CompanyProvider({
  company,
  children,
}: {
  company: CompanyInfo | undefined;
  children: ReactNode;
}) {
  return (
    <CompanyContext.Provider value={company}>{children}</CompanyContext.Provider>
  );
}

export function useCompanyContext(): CompanyInfo | undefined {
  return useContext(CompanyContext);
}
