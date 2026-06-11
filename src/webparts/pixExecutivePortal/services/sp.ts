import {
  SPFI,
  spfi,
} from "@pnp/sp";

import {
  SPFx
} from "@pnp/sp/presets/all";

let _sp: SPFI;

/* =========================================================
   INITIALIZE
========================================================= */

export const initializeSP = (
  context: any
): void => {

  _sp = spfi().using(
    SPFx(context)
  );
};

/* =========================================================
   GET INSTANCE
========================================================= */

export const getSP = (): SPFI => {

  return _sp;
};