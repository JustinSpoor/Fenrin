import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {

  constructor(private http: HttpClient) {
  }

  getPlayers() {
    return this.http.get<any>('http://localhost:8080/players');
  }

  updatePlayer(player: any) {
    return this.http.patch('http://localhost:8080/players', player);
  }

  deletePlayer(id: any) {
    return this.http.delete(`http://localhost:8080/players/${id}`);
  }

  savePlayer(player: any) {
    return this.http.post('http://localhost:8080/players', player)
  }
}
