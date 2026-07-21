import * as React from "react";

interface IErrorBoundaryProps {

  /* Shown in the fallback message so it's obvious which
     section failed, e.g. "Team Directory". */
  label: string;

  children: React.ReactNode;
}

interface IErrorBoundaryState {

  hasError: boolean;
}

/* =========================================================
   ERROR BOUNDARY

   Any single section's render/runtime error used to escape
   React entirely and unmount the whole web part (the page
   "vanishing" - a blank workbench). Each dashboard section
   is now wrapped in one of these, so a bad value coming from
   a SharePoint list (e.g. an invalid Timezone, a malformed
   date) only takes down that one card - every other section
   keeps working.
========================================================= */

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {

  constructor(props: IErrorBoundaryProps) {

    super(props);

    this.state = { hasError: false };
  }

  public static getDerivedStateFromError():
    IErrorBoundaryState {

    return { hasError: true };
  }

  public componentDidCatch(
    error: Error,
    info: React.ErrorInfo
  ): void {

    console.error(
      `[ErrorBoundary] "${this.props.label}" section failed`,
      error,
      info
    );
  }

  public render(): React.ReactNode {

    if (this.state.hasError) {

      return (

        <div className="pix-error-boundary">

          <div className="pix-error-boundary__title">

            {this.props.label} couldn&apos;t load

          </div>

          <div className="pix-error-boundary__body">

            Something in the underlying SharePoint data
            for this section isn&apos;t formatted as
            expected. The rest of the page is unaffected -
            check the browser console for details, or
            contact IT.

          </div>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
