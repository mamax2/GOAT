import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { MatchService, Match } from 'src/app/core/services/match-service';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {
  private router = inject(Router);
  private service = inject(MatchService);

  activeTab: 'pending' | 'confirmed' = 'pending';

  matches: Match[] = [];
  loading = true;

  get filtered(): Match[] {
    return this.matches.filter((m) => m.match_status === this.activeTab);
  }
  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getMyMatches().subscribe({
      next: (res) => {
        this.matches = res.data ?? [];
        this.loading = false;
      },
      error: () => {
        alert('Errore caricamento match');
        this.loading = false;
      },
    });
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  showCode(match: Match) {
    alert(`Codice di convalida:\n${match.validation_code}`);
  }

  switchTab(tab: 'pending' | 'confirmed') {
    this.activeTab = tab;
  }

  badgeLabel(status: Match['match_status']) {
    return status === 'pending'
      ? 'IN ATTESA'
      : status === 'confirmed'
      ? 'CONFERMATO'
      : 'RIFIUTATO';
  }
}
