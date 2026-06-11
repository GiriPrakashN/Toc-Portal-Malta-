import * as React from "react";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({
  children
}: AppShellProps): JSX.Element => {
  return (
    <div className="pix-shell">
      <div className="pix-shell__viewport">
        {children}
      </div>
    </div>
  );
};

export default AppShell;