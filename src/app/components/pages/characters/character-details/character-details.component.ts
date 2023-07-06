import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Characters } from '@app/shared/interfaces/characters.interfaces';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable, take } from 'rxjs';
import {Location} from '@angular/common'
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character$: Observable<Characters>
  
  constructor(
    private route: ActivatedRoute,
    private chracterService: CharacterService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params)=>{
      const id = params['id'];
      this.character$ = this.chracterService.getDetails(id)
    })
  }
  onBackPage(){
    this.location.back()
  }


}
