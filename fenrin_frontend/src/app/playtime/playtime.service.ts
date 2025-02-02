import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PlaytimeService {

  constructor(private http: HttpClient) {
  }


  fetchPlayerPlaytimeListDESC() {
    return this.http.get<any>('http://localhost:8080/descplaytimelist');
  }

  fetchPlayerPlaytimeListASC() {
    return this.http.get<any>('http://localhost:8080/ascplaytimelist');
  }
}
