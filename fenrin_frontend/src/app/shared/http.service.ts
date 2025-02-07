import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_PATH: string = 'http://localhost:8080';


  constructor(private http: HttpClient) {
  }

  httpGet(route: string) {
    return this.http.get<any>(`${this.API_PATH}/${route}`);
  }

  httpPatch(route: string, body: any) {
    return this.http.patch(`${this.API_PATH}/${route}`, body);
  }

  httpDelete(route: string, id: any) {
    return this.http.delete(`${this.API_PATH}/${route}/${id}`)
  }

  httpPost(route: string, body: any) {
    return this.http.post(`${this.API_PATH}/${route}`, body)
  }
}
