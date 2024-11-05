import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Player } from './player';
import { drafts } from './drafts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  players: Player[] = []
  draft: string = drafts[Math.floor(Math.random() * drafts.length)]

  ngOnInit(): void {
    var playersFromLocalStorage = (localStorage.getItem("jogo_do_impostor_players")?.split(',') || [])
    var impostors = Number(localStorage.getItem("jogo_do_impostor_impostors"))
    var impostorsIndexs: Set<number> = new Set()

    while(impostorsIndexs.size < impostors) {
      const randomIndex = Math.floor(Math.random() * playersFromLocalStorage.length)
      impostorsIndexs.add(randomIndex)
    }

    playersFromLocalStorage.forEach((player, index) => {
      this.players.push({
        name: player,
        show: false,
        draft: this.draft,
        isImpostor: impostorsIndexs.has(index)
      })
    })
  }

  showRole(player: string) {
    const foundPlayer = this.players.find(_player => _player.name == player)
    if(foundPlayer)
      foundPlayer.show = true
  }

  hideRole(player: string) {
    const foundPlayer = this.players.find(_player => _player.name == player)
    if(foundPlayer)
      foundPlayer.show = false
  }

  routeToFreeDraft() {
    window.location.href = "/free-draft"
  }

  routeToConfig() {
    window.location.href = "/config"
  }
}
