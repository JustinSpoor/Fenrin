import {Injectable} from "@angular/core";
import {HttpService} from "../shared/http.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  applicationRoute: string = 'application'

  constructor(private httpService: HttpService) {
  }

  postApplication(application: any) {
    return this.httpService.httpPost(this.applicationRoute, application)
  }

  getApplications() {
    return this.httpService.httpGet(this.applicationRoute)
  }

  deleteApplication(id: any) {
    return this.httpService.httpDelete(this.applicationRoute, id);
  }
}
