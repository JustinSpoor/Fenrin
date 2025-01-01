import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PlaytimeService {

  constructor(private http: HttpClient) {
  }


  fetchPlayerPlaytimeList() {
    return this.http.get<any>('http://localhost:8080/playtimelist');
  }
}
