import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {PlaytimeService} from "../playtime.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../shared/toast.service";
import Swal from "sweetalert2";
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
  addingPlayer: any | null = null;
  editingPlaytimeId: any | null = null;

  constructor(public authService: AuthService, private playtimeService: PlaytimeService, private formBuilder: FormBuilder, private toasterService: ToastService) {
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

  addNewPlaytime(player: any) {
    this.showNewPlaytimeModal = true;
    this.addingPlayer = { ...player}
  }

  editPlaytime(player: any, playtime: any) {
    this.showNewPlaytimeModal = true;
    this.addingPlayer = { ...player };

    this.form.patchValue({
      year: playtime.year,
      week: playtime.weekNumber,
      days: this.formatDays(playtime.timePlayed),
      hours: this.formatHours(playtime.timePlayed),
      minutes: playtime.timePlayed % 60,
      absence: playtime.absent
    });

    this.editingPlaytimeId = playtime.playtimeId;
  }

  removePlaytime(playtimeId: any) {
    Swal.fire({
      title: 'Weet je het zeker?',
      text: 'Deze actie is onomkeerbaar',
      color: 'white',
      showCancelButton: true,
      confirmButtonText: 'Verwijderen',
      cancelButtonText: 'Annuleren'
    }).then((result) => {
      if (result.isConfirmed) {
        this.playtimeService.deletePlayer(playtimeId).subscribe( {
          next: () => {
            this.loadPlaytimes()
            this.toasterService.showInfo(`Playtime verwijderd!`, 'Verwijderd');
          },
          error: () => {
            this.toasterService.showError('Deze playtime was al verwijderd.', 'Error')
          }
        });
      }
    });
  }

  closeModal() {
    this.showNewPlaytimeModal = false;
    this.form.reset();
    this.addingPlayer = null;
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
    if (this.form.valid) {
      let playtimeData = this.formatNewPlaytime();

      if (this.editingPlaytimeId) {
        this.playtimeService.patchPlayerPlaytime({id: this.editingPlaytimeId, playtime: playtimeData})
          .subscribe({
            next: () => {
              this.loadPlaytimes();
              this.closeModal();
              this.toasterService.showSuccess(`Playtime bijgewerkt voor ${playerName}`, 'Bijgewerkt');
            },
            error: () => {
              this.toasterService.showError(`Fout bij het bijwerken van playtime`, 'Error');
            }
          });
      } else {
        this.playtimeService.postPlayerPlaytime({ name: playerName, playtime: playtimeData })
          .subscribe({
            next: () => {
              this.loadPlaytimes();
              this.closeModal();
              this.toasterService.showSuccess(`Playtime toegevoegd aan ${playerName}`, 'Toegevoegd');
            },
            error: () => {
              this.toasterService.showError(`Er bestaat geen speler met de naam ${playerName}`, 'Error');
            }
          });
      }
    }
  }
}
