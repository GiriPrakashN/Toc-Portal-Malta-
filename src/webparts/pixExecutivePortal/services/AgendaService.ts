import {
  AgendaSharePointService,
  IAgendaItem
} from "./agenda.service";

class AgendaService {

  public async getAgenda():
    Promise<IAgendaItem[]> {

    return await
      AgendaSharePointService
        .getAgenda();
  }
}

export default new AgendaService();