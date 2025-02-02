import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {PlaytimeService} from "../playtime.service";
@Component({
  selector: 'app-playtime-edit-page',
  templateUrl: './playtime-edit-page.component.html',
  styleUrls: ['./playtime-edit-page.component.scss']
})
export class PlaytimeEditPageComponent {

  constructor(public authService: AuthService, private playtimeService: PlaytimeService) {
  }

  searchTerm: string = '';
  playerList: any = [];
  showNewPlaytimeModal = false;

  ngOnInit() {
    this.playtimeService.fetchPlayerPlaytimeListASC()
      .subscribe((data) => {
        this.playerList = data;
      });
  }

  addNewPlaytime() {
    this.showNewPlaytimeModal = true;
  }

  saveNewPlaytime() {
  }

  formatNewPlaytime() {
    //todo format the new playtime to be send over to backend
    // format should look like: playername, playtimes: [year, weeknumber, timeplayed, absent]
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
}
