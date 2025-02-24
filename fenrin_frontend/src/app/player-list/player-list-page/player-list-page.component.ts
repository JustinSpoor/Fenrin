import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {PlayerListService} from "../player-list.service";
import {ToastService} from "../../shared/toast.service";
import Swal  from 'sweetalert2';

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

  constructor(private playerService: PlayerListService, private toasterService: ToastService) {}

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
    }).subscribe(  {
      next: () => {
        this.loadPlayers();
        this.resetPlayerForm();
        this.toasterService.showSuccess(`Speler ${name} succesvol toegevoegd.` , `success`);
      },
      error: () => {
        this.toasterService.showError(`Speler met de naam ${name} bestaat al.`, "Error");
      }
    });
  }

  removePlayer(playerId: any) {
    Swal.fire({
      title: 'Weet je het zeker?',
      text: 'Deze actie is onomkeerbaar',
      color: 'white',
      showCancelButton: true,
      confirmButtonText: 'Verwijderen',
      cancelButtonText: 'Annuleren'
    }).then((result) => {
      if (result.isConfirmed) {
        this.playerService.deletePlayer(playerId).subscribe( {
          next: () => {
            this.loadPlayers()
            this.toasterService.showInfo(`Speler verwijderd!`, 'Verwijderd');
          },
          error: () => {
            this.toasterService.showError('De speler met deze naam was al verwijderd.', 'Error')
          }
        });
      }
    });
  }

  updatePlayer() {
    if (this.editingPlayer) {
      this.playerService.updatePlayer(this.editingPlayer).subscribe({
        next: () => {
          this.loadPlayers();
          this.editingPlayer = null;
          this.toasterService.showSuccess(`Speler aangepast!`, 'Aangepast');
        },
        error: (error) => {

          if(error.toString().includes(404)) {
            this.toasterService.showError('De speler die je probeerd te updaten bestaat niet', 'Error');
          }

          if(error.toString().includes(409)) {
            this.toasterService.showError(`Er bestaal al een speler met de naam ${this.editingPlayer.name}`, 'Error');
          }
        }
      })
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
