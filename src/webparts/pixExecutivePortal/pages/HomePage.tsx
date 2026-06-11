import * as React from "react";

import Hero from "../components/hero/Hero";
import DashboardShell from "../components/dashboard/DashboardShell";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/footer/Footer";

const HomePage = (): JSX.Element => {
  return (
    <MainLayout>

      {/* HERO */}
      <section className="mb-6">
        <Hero />
      </section>

      {/* DASHBOARD */}
      <DashboardShell />

      {/* FOOTER */}
      <section className="mt-8">
        <Footer />
      </section>

    </MainLayout>
  );
};

export default HomePage;