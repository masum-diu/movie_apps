"use client"; // Ensures this component is only rendered on the client side

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

// Define QueryClient instance for TanStack Query
const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <div>{children}</div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
