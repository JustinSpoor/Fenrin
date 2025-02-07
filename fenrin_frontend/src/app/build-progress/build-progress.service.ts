import {Injectable} from "@angular/core";
import {HttpService} from "../shared/http.service";

@Injectable({
  providedIn: 'root'
})
export class BuildProgressService {
  buildProgressRoute: string = 'build'

  constructor(private httpService: HttpService) {
  }

  getBuilds() {
    return this.httpService.httpGet(this.buildProgressRoute + 'list');
  }

  updateBuild(build: any) {
    return this.httpService.httpPatch(this.buildProgressRoute, build);
  }

  deleteBuild(id: any) {
    return this.httpService.httpDelete(this.buildProgressRoute, id);
  }

  saveBuild(build: any) {
    return this.httpService.httpPost(this.buildProgressRoute, build)
  }

}
