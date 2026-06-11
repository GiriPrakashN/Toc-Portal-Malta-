import * as React from "react";

import {
  useEffect,
  useState
} from "react";

import DashboardService
from "../../services/DashboardService";

import {
  IExecutiveStat
} from "../../models/IExecutiveStats";

import ExecutiveStatCard
from "./ExecutiveStatCard";

const ExecutiveStats = (): JSX.Element => {

  const [stats, setStats] =
    useState<IExecutiveStat[]>([]);

  useEffect(() => {

    const loadStats = async () => {

      const response =
        await DashboardService
          .getExecutiveStats();

      setStats(response);
    };

    loadStats();

  }, []);

  return (

    <section className="pix-stats">

      <div className="pix-stats__grid">

        {stats.map((item) => (

          <ExecutiveStatCard
            key={item.id}
            item={item}
          />

        ))}

      </div>

    </section>
  );
};

export default ExecutiveStats;