import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../application.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss']
})
export class ApplicationPageComponent {
  applicationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private applicationService: ApplicationService, public authService: AuthService) {
    this.applicationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      discordName: ['', [Validators.required, Validators.maxLength(100)]],
      minecraftName: ['', [Validators.required, Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
      aboutMe: ['', Validators.required],
      strengthsAndWeaknesses: ['', Validators.required],
      whyYou: ['', Validators.required],
      history: ['', Validators.required],
      other: ['', Validators.required],
    })
  }


  onSubmit() {
    if (this.applicationForm.valid) {
      this.applicationService.postApplication(this.applicationForm.value)
        .subscribe((response) => {
          //todo add confirmation/error shizzle here
          this.applicationForm.reset();
        })
    }
  }
}
