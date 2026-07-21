import * as React from "react";

import Hero from "../components/hero/Hero";
import DashboardShell from "../components/dashboard/DashboardShell";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/footer/Footer";
import ErrorBoundary from "../components/common/ErrorBoundary";

const HomePage = (): JSX.Element => {
  return (
    <MainLayout>

      {/* HERO */}
      <section className="mb-6">
        <ErrorBoundary label="Hero Banner">
          <Hero />
        </ErrorBoundary>
      </section>

      {/* DASHBOARD */}
      <DashboardShell />

      {/* FOOTER */}
      <section className="mt-8">
        <ErrorBoundary label="Footer">
          <Footer />
        </ErrorBoundary>
      </section>

    </MainLayout>
  );
};

export default HomePage;