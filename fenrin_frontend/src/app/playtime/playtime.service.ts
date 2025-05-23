import {Injectable} from "@angular/core";
import {HttpService} from "../shared/http.service";

@Injectable({
  providedIn: 'root'
})
export class PlaytimeService {

  constructor(private httpService: HttpService) {
  }


  fetchPlayerPlaytimeListDESC() {
    return this.httpService.httpGet('descplaytimelist');
  }

  fetchPlayerPlaytimeListASC() {
    return this.httpService.httpGet('ascplaytimelist');
  }

  postPlayerPlaytime(playtime: any) {
    return this.httpService.httpPost('playtime', playtime);
  }

  patchPlayerPlaytime(playtime: any) {
    return this.httpService.httpPatch(`playtime`, playtime);
  }

  deletePlayer(id: any) {
    return this.httpService.httpDelete(`playtime`, id);
  }

}
