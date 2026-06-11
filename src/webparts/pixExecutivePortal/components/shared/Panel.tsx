import * as React from "react";

interface PanelProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  rightText?: string;
}

const Panel = ({
  title,
  badge,
  children,
  rightText,
}: PanelProps) => {
  return (
    <div className="overflow-hidden rounded-[6px] border border-[var(--border)] bg-[var(--surface-1)]">

      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--navy-900)] px-4 py-3">

        <h2 className="flex-1 text-[11px] font-bold uppercase tracking-[1.5px] text-[var(--text-primary)]">

          {title}

        </h2>

        {badge && (
          <div className="rounded-[3px] border border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.12)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[var(--blue-300)]">

            {badge}

          </div>
        )}

        {rightText && (
          <button className="text-[11px] font-semibold text-[var(--blue-400)] hover:text-cyan-300">

            {rightText}

          </button>
        )}

      </div>

      {/* BODY */}
      <div className="p-4">
        {children}
      </div>

    </div>
  );
};

export default Panel;