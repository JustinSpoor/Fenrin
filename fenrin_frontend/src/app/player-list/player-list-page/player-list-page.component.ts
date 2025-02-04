import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {PlayerListService} from "../player-list.service";

@Component({
  selector: 'app-player-list-page',
  templateUrl: './player-list-page.component.html',
  styleUrls: ['./player-list-page.component.scss']
})
export class PlayerListPageComponent {
  players: any = [];
  filteredPlayers: any = [];
  searchControl = new FormControl('');
  editingPlayer: any | null = null;
  newPlayerName: string = '';
  newPlayerRank: string = 'sfeerproever';
  whitelistSlots: number = 45;

  constructor(private playerService: PlayerListService) {}

  ngOnInit() {
    this.loadPlayers();
    this.searchControl.valueChanges.subscribe(value => {
      this.filterPlayers(value);
    });
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.filteredPlayers = [...this.players];
    });


  }

  filterPlayers(query: any) {
    this.filteredPlayers = this.players.filter((player: any) =>
      player.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  getWhitelistedPlayerCount() {
    return this.players.filter((player: any) => player.rank === 'whitelisted' || player.rank === 'lead').length
  }

  editPlayer(player: any) {
    this.editingPlayer = { ...player };
  }

  cancelEdit() {
    this.editingPlayer = null;
  }

  addPlayer(name: string, rank: string) {
    this.playerService.savePlayer({
      name: name,
      rank: rank
    }).subscribe( () => {
      this.loadPlayers();
      this.resetPlayerForm();
    })
  }

  removePlayer(playerId: any) {
    this.playerService.deletePlayer(playerId).subscribe(() => {
      this.loadPlayers();
    });
  }

  updatePlayer() {
    if (this.editingPlayer) {
      this.playerService.updatePlayer(this.editingPlayer).subscribe(() => {
        this.loadPlayers();
        this.editingPlayer = null;
      });
    }
  }

  isAddButtonDisabled() {
    return !this.newPlayerName;
  }

  isUpdateButtonDisabled() {
    return !this.editingPlayer?.name;
  }

  resetPlayerForm() {
    this.newPlayerName = '';
    this.newPlayerRank = 'sfeerproever';
  }
}
