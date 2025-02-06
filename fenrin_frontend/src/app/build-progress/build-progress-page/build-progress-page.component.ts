import { Component } from '@angular/core';
import {BuildProgressService} from "../build-progress.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-build-progress-page',
  templateUrl: './build-progress-page.component.html',
  styleUrls: ['./build-progress-page.component.scss']
})
export class BuildProgressPageComponent {
  builds: any = [];
  filteredBuilds: any = [];
  searchControl = new FormControl('')
  currentlyViewingBuild: any = [];
  editingBuild: any | null = null;
  isViewingBuild: boolean = false;
  isCurrentlyEditingBuild: boolean = false;
  isAddingBuild: boolean = false;
  buildForm: FormGroup;

  constructor(private buildService: BuildProgressService, public authService: AuthService, private formBuilder: FormBuilder) {
    this.buildForm = this.formBuilder.group({
      buildName: ['', [Validators.required, Validators.maxLength(30)]],
      builderInCharge: ['', [Validators.required, Validators.maxLength(30)]],
      warp: ['', [Validators.required, Validators.maxLength(30)]],
      progress: ['', Validators.required],
      priority: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loadBuilds();
    this.searchControl.valueChanges.subscribe( value => {
      this.filterBuilds(value);
    });
  }

  loadBuilds() {
    this.buildService.getBuilds().subscribe(builds => {
      this.builds = builds.sort((a:any, b:any) => a.buildName.localeCompare(b.buildName));
      this.filteredBuilds = [...this.builds]
    })
  }

  filterBuilds(query: any) {
    this.filteredBuilds = this.builds.filter((build: any) =>
      build.buildName.toLowerCase().includes(query.toLowerCase())
    );
  }

  viewBuild(build: any) {
    this.currentlyViewingBuild = build;
    this.isViewingBuild = true;
  }

  editBuild(build: any) {
    this.isCurrentlyEditingBuild = true;
    this.editingBuild = { ...build };
  }

  cancelEdit() {
    this.editingBuild = null;
    this.isCurrentlyEditingBuild = false;
  }

  updateBuild() {
    if(this.editingBuild) {
      this.buildService.updateBuild(this.editingBuild).subscribe(() => {
        this.loadBuilds();
        this.editingBuild = null;
        this.stopViewingBuild();
      })
    }
  }

  isUpdateButtonDisabled() {
    if(this.editingBuild.buildName == '' || this.editingBuild.builderInCharge == '' || this.editingBuild.warp == '') {
      return true;
    }
    return false
  }

  stopViewingBuild() {
    this.isViewingBuild = false;
    this.currentlyViewingBuild = [];
    this.isCurrentlyEditingBuild = false;
    this.editingBuild = null;
  }

  removeBuild(id: any) {
    this.buildService.deleteBuild(id).subscribe( () => {
        this.loadBuilds();
      });
  }

  addBuild() {
    this.isAddingBuild = true;
  }

  cancelAddingBuild() {
    this.isAddingBuild = false;
    this.buildForm.reset();
  }

  onSubmit() {
    if(this.buildForm.valid) {
      this.buildService.saveBuild(this.buildForm.value)
        .subscribe(() => {
          //todo add confirmation/error shizzle here
          this.buildForm.reset();
          this.isAddingBuild = false;
          this.loadBuilds();
        })
    }
  }

}
