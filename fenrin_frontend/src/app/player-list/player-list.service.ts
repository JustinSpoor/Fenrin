import {Injectable} from "@angular/core";
import {HttpService} from "../shared/http.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {
  playerListRoute: string = 'players';


  constructor(private httpService: HttpService) {
  }

  getPlayers() {
    return this.httpService.httpGet(this.playerListRoute);
  }

  updatePlayer(player: any) {
    return this.httpService.httpPatch(this.playerListRoute, player);
  }

  deletePlayer(id: any) {
    return this.httpService.httpDelete(this.playerListRoute, id);
  }

  savePlayer(player: any) {
    return this.httpService.httpPost(this.playerListRoute, player);
  }
}
