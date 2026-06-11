import * as React from "react";
import { clocks } from "../../data/clocks";

const WorldClocks = () => {
  return (
    <section className="px-12 mt-6">

      <div className="grid grid-cols-4 gap-[1px] overflow-hidden rounded-md border border-[#1e3a5f] bg-[#1e3a5f]">

        {clocks.map((clock, index) => (
          <div
            key={clock.city}
            className="bg-[#0f1e3d] p-5 transition-all duration-300 hover:bg-[#162447]"
          >

            {/* TOP BORDER */}
            <div
              className={`mb-4 h-[3px] w-full rounded-full ${
                index === 0
                  ? "bg-blue-400"
                  : index === 1
                  ? "bg-cyan-400"
                  : index === 2
                  ? "bg-green-400"
                  : "bg-purple-400"
              }`}
            />

            {/* FLAG */}
            <div className="text-2xl">
              {clock.flag}
            </div>

            {/* REGION */}
            <p className="mt-3 text-[10px] font-bold tracking-[2px] text-blue-200 uppercase">

              {clock.region}

            </p>

            {/* CITY */}
            <p className="mt-1 text-[11px] text-slate-400">
              {clock.city}
            </p>

            {/* TIME */}
            <h1 className="mt-4 text-[34px] font-black tracking-[-1px] text-white">

              {clock.time}

            </h1>

            {/* ZONE */}
            <p className="mt-2 text-[11px] tracking-[2px] uppercase text-slate-500">

              {clock.zone}

            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default WorldClocks;