/* =========================================================
   DATA SOURCE SWITCH
========================================================= */

const USE_SHAREPOINT_SOURCE = false;

/* =========================================================
   LOCAL DATA
========================================================= */

import {
  agenda,
  IAgendaItem,
} from "../data/agenda";

/* =========================================================
   SERVICE
========================================================= */

class AgendaService {

  /* ======================================================
     GET AGENDA
  ====================================================== */

  public async getAgenda():
    Promise<IAgendaItem[]> {

    /* ====================================================
       SHAREPOINT SOURCE
    ===================================================== */

    if (USE_SHAREPOINT_SOURCE) {

      /*
        FUTURE:
        Replace with SharePoint service
      */

      console.log(
        "[AgendaService] SharePoint source enabled"
      );

      return [];
    }

    /* ====================================================
       MOCK SOURCE
    ===================================================== */

    console.log(
      "[AgendaService] Mock source enabled"
    );

    return agenda;
  }
}

export default new AgendaService();