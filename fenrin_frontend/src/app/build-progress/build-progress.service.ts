import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BuildProgressService {

  constructor(private http: HttpClient) {
  }

  getBuilds() {
    return this.http.get<any>('http://localhost:8080/buildlist');
  }

  updateBuild(build: any) {
    return this.http.patch('http://localhost:8080/build', build);
  }

  deleteBuild(id: any) {
    return this.http.delete(`http://localhost:8080/build/${id}`);
  }

  saveBuild(build: any) {
    return this.http.post('http://localhost:8080/build', build)
  }

}
