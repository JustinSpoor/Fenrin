import {Injectable} from "@angular/core";
import {HttpService} from "../shared/http.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventRoute: string = 'event';


  constructor(private httpService: HttpService) {
  }

  getKothGrid() {
    return this.httpService.httpGet(this.eventRoute);
  }

  updateKothGrid(kothGrid: any) {
    return this.httpService.httpPatch(this.eventRoute, kothGrid);
  }

  deleteKothGrid(id: any) {
    return this.httpService.httpDelete(this.eventRoute, id);
  }

  saveKothGrid(kothGrid: any) {
    return this.httpService.httpPost(this.eventRoute, kothGrid);
  }
}
