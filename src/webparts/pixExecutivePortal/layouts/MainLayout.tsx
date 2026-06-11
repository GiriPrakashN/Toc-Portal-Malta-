import * as React from "react";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#050816]
        text-slate-200
      "
    >

      {/* GLOBAL DASHBOARD CONTAINER */}
      <div
        className="
          mx-auto
          w-full
          max-w-[1680px]
          px-4
          pb-10
          pt-4

          sm:px-5
          lg:px-6
          xl:px-8
          2xl:px-10
        "
      >

        {children}

      </div>

    </div>
  );
};

export default MainLayout;