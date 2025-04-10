import { Component } from '@angular/core';
import { EventService } from "../event.service";
import { ToastService } from "../../shared/toast.service";

interface KotHEntry {
  rowIndex: number;
  columnIndex: number;
  cappedBy: string | null;
}

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  groups: string[] = ['Niet Gecapped', 'Calici', 'Eleftheria', 'Entropia', 'Fenrin', 'Khearon', 'Ljord', 'Midusa', 'Mura', 'Roemas', 'Tyksa', 'Vystara', 'Xar', 'Zera'];

  selectedGroups: (string | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));
  kothGrid: (string | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));

  constructor(private eventService: EventService, private toasterService: ToastService) {}

  ngOnInit() {
    this.loadGrid();
  }

  loadGrid() {
    this.eventService.getKothGrid().subscribe((gridEntries: KotHEntry[]) => {
      this.kothGrid = Array.from({ length: 4 }, () => Array(4).fill(null));

      gridEntries.forEach(entry => {
        if (entry.rowIndex >= 0 && entry.rowIndex < 4 && entry.columnIndex >= 0 && entry.columnIndex < 4) {
          this.kothGrid[entry.rowIndex][entry.columnIndex] = entry.cappedBy;
          this.selectedGroups[entry.rowIndex][entry.columnIndex] = entry.cappedBy;
        }
      });
    });
  }

  saveGrid() {
    const payload = [] as KotHEntry[];

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        payload.push({
          rowIndex: row,
          columnIndex: col,
          cappedBy: this.selectedGroups[row][col]
        });
      }
    }

    this.eventService.saveKothGrid(payload).subscribe({
      next: () => {
        this.loadGrid();
        this.toasterService.showSuccess('Grid geupdate!');
      },
      error: (err) => {
        console.log(err);
        this.toasterService.showError('Er ging iets fout met het updaten van het grid');
      }
    });
  }

  refreshGrid() {
    this.loadGrid();
  }
}
