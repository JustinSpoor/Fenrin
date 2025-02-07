import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ApplicationService} from "../application.service";
import {ToastService} from "../../shared/toast.service";

@Component({
  selector: 'app-application-view-page',
  templateUrl: './application-view-page.component.html',
  styleUrls: ['./application-view-page.component.scss']
})
export class ApplicationViewPageComponent {
  applications: any = [];
  filteredApplications: any = [];
  searchControl = new FormControl('');
  currentlyViewingApplication: any = [];
  isViewingApplication: boolean = false;


  constructor(private applicationService: ApplicationService, private toasterService: ToastService) {
  }

  ngOnInit() {
    this.loadApplications();
    this.searchControl.valueChanges.subscribe(value => {
      this.filterApplications(value);
    });
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe(applications => {
      this.applications = applications.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.filteredApplications = [...this.applications];
    });
  }

  filterApplications(query: any) {
    this.filteredApplications = this.applications.filter((application: any) =>
      application.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  viewApplication(application: any) {
    this.currentlyViewingApplication = application;
    this.isViewingApplication = true;
  }

  stopViewingApplication() {
    this.isViewingApplication = false;
    this.currentlyViewingApplication = [];
  }

  removeApplication(applicationId: any) {
    this.applicationService.deleteApplication(applicationId).subscribe({
      next: () => {
        this.loadApplications();
        this.toasterService.showInfo('Sollicitatie verwijderd', 'Verwijderd')
      },
      error: () => {
        this.toasterService.showError('Deze sollicitatie was al verwijderd.', 'Error')
      }
    })
  }
}
