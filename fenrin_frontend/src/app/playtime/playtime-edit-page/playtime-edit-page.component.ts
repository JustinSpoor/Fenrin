import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {PlaytimeService} from "../playtime.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-playtime-edit-page',
  templateUrl: './playtime-edit-page.component.html',
  styleUrls: ['./playtime-edit-page.component.scss']
})
export class PlaytimeEditPageComponent {
  searchTerm: string = '';
  playerList: any = [];
  showNewPlaytimeModal = false;
  form: FormGroup;


  constructor(public authService: AuthService, private playtimeService: PlaytimeService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      year: ["", [Validators.required, Validators.min(2020), Validators.max(new Date().getFullYear())]],
      week: ['', [Validators.required, Validators.min(1), Validators.max(52)]],
      days: ['', [Validators.required, Validators.min(0)]],
      hours: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      minutes: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
      absence: [false]
    })
  }



  ngOnInit() {
    this.loadPlaytimes();
  }

  loadPlaytimes() {
    this.playtimeService.fetchPlayerPlaytimeListASC()
      .subscribe((data) => {
        this.playerList = data;
      });
  }

  addNewPlaytime() {
    this.showNewPlaytimeModal = true;
  }

  closeModal() {
    this.showNewPlaytimeModal = false;
    this.form.reset();
  }


  formatNewPlaytime() {
    const year = this.form.get('year')?.value;
    const week = this.form.get('week')?.value;
    const days = this.form.get('days')?.value;
    const hours = this.form.get('hours')?.value;
    const minutes = this.form.get('minutes')?.value;
    const absence = this.form.get('absence')?.value;

    const timePlayed = ((days * 1440) + (hours * 60) + minutes);

    return {
      absent: absence,
      time_played: timePlayed,
      year: year,
      week_number: week
    }
  }

  formatDays(timePlayed: number) {
    return Math.floor(timePlayed / 1440)
  }

  formatHours(timePlayed: number) {
    return Math.floor((timePlayed % 1440) / 60)
  }

  filteredPlayerPlaytime() {
    if(!this.searchTerm) {
      return this.playerList;
    }
    const term = this.searchTerm.trim().toLowerCase();

    return this.playerList.filter((player: any) =>
      player.playerName.toLowerCase().includes(term)
    )
  }

  onSubmit(playerName: string) {
    if(this.form.valid) {

      let playtime = {
        name: playerName,
        playtime: this.formatNewPlaytime()
      }

      this.playtimeService.postPlayerPlaytime(playtime)
        .subscribe((response) => {
          //todo add confirmation/error shizzle here
          this.loadPlaytimes();
          this.closeModal();
        });
    }
  }
}
