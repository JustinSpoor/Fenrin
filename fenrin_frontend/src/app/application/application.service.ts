import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) {
  }

  postApplication(application: any) {
    return this.http.post('http://localhost:8080/application', application)
  }

  getApplications() {
    return this.http.get<any>('http://localhost:8080/application')
  }

  deleteApplication(id: any) {
    return this.http.delete(`http://localhost:8080/application/${id}`);
  }
}
