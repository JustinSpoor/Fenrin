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
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  playerPlaytime: ProcessedPlayerData[] = [
    {name: 'Geen spelers gevonden...', playtimeThisWeek: '', totalPlaytime: ''}
  ];

  ngOnInit() {
    this.playtimeService.fetchPlayerPlaytimeListDESC()
      .subscribe((data) => {
        this.playerPlaytime = this.parsePlayerPlaytime(data);
      });
  }

  parsePlayerPlaytime(data: any): ProcessedPlayerData[] {
    return data.map((player: any) => {
      const [currentWeek, lastWeek] = player.playtimes;

      let playtimeThisWeek = currentWeek && lastWeek ? currentWeek.timePlayed - lastWeek.timePlayed : 0;
      let playtimeThisWeekFormatted;

      if (playtimeThisWeek <= 60) {
        playtimeThisWeekFormatted = `${playtimeThisWeek} minuten`

      } else {
        playtimeThisWeek = parseFloat((playtimeThisWeek / 60).toFixed(2));
        playtimeThisWeekFormatted = `${playtimeThisWeek} uur`
      }

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
    let players = [...this.playerPlaytime];

    if (this.searchTerm) {
      const term = this.searchTerm.trim().toLowerCase();
      players = players.filter((player) => player.name.toLowerCase().includes(term));
    }

    return players.sort((a, b) => {
      let valueA: number;
      let valueB: number;

      if (this.sortColumn === 'name') {
        valueA = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        valueB = 0; // not needed, just for consistency
      } else if (this.sortColumn === 'playtimeThisWeek') {
        valueA = this.convertPlaytimeToMinutes(a.playtimeThisWeek);
        valueB = this.convertPlaytimeToMinutes(b.playtimeThisWeek);
      } else if (this.sortColumn === 'totalPlaytime') {
        valueA = this.convertPlaytimeToMinutes(a.totalPlaytime);
        valueB = this.convertPlaytimeToMinutes(b.totalPlaytime);
      } else {
        return 0;
      }

      return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }

  convertPlaytimeToMinutes(playtime: string): number {
    if (!playtime) return 0;

    const dayMatch = playtime.match(/(\d+)\s*dagen?/);
    const hourMatch = playtime.match(/(\d+(\.\d+)?)\s*uur/);
    const minuteMatch = playtime.match(/(\d+)\s*minuten?/);

    const days = dayMatch ? parseInt(dayMatch[1], 10) * 1440 : 0; // 1 day = 1440 minutes
    const hours = hourMatch ? parseFloat(hourMatch[1]) * 60 : 0; // Handles decimals (e.g., 2.5 uur)
    const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

    return days + hours + minutes;
  }

  sortTable(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
}
