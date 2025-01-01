import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {PlaytimeService} from "../playtime.service";
import {ProcessedPlayerData} from "../../shared/playtime.model";

@Component({
  selector: 'app-playtime-page',
  templateUrl: './playtime-page.component.html',
  styleUrls: ['./playtime-page.component.scss']
})
export class PlaytimePageComponent {

  constructor(public authService: AuthService, private playtimeService: PlaytimeService) {
  }

  searchTerm: string = '';

  playerPlaytime: ProcessedPlayerData[] = [
    {name: 'Geen spelers gevonden...', playtimeThisWeek: '', totalPlaytime: ''}
  ];

  ngOnInit() {
    this.playtimeService.fetchPlayerPlaytimeList()
      .subscribe((data) => {
        this.playerPlaytime = this.parsePlayerPlaytime(data);
      });
  }

  parsePlayerPlaytime(data: any): ProcessedPlayerData[] {
    return data.map((player: any) => {
      const [currentWeek, lastWeek] = player.playtimes;

      const playtimeThisWeek = currentWeek && lastWeek ? currentWeek.timePlayed - lastWeek.timePlayed: 0;
      const playtimeThisWeekFormatted = `${playtimeThisWeek} uur`

      const totalPlaytime = currentWeek ? currentWeek.timePlayed: 0;
      const days = Math.floor(totalPlaytime / 1440);
      const hours = Math.floor((totalPlaytime % 1440) / 60)
      const minutes = totalPlaytime % 60
      const totalPlaytimeFormatted = `${days} dagen ${hours} uur ${minutes} minuten`

      return {
        name: player.playerName,
        playtimeThisWeek: playtimeThisWeekFormatted,
        totalPlaytime: totalPlaytimeFormatted
      }
    }).sort((a: ProcessedPlayerData, b: ProcessedPlayerData ) => a.name.localeCompare(b.name));
  }

  filteredPlayerPlaytime() {
    if(!this.searchTerm) {
      return this.playerPlaytime;
    }
    const term = this.searchTerm.trim().toLowerCase();

    return this.playerPlaytime.filter(player =>
      player.name.toLowerCase().includes(term)
    )
  }

}
