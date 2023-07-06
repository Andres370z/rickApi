import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Characters } from '@app/shared/interfaces/characters.interfaces';
import { CharacterService } from '@app/shared/services/character.service';
import { filter, take, tap } from 'rxjs';
type RequestInfo = {
  next: null
}
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: Characters[] = []
  private pageNum = 1;
  private query: any;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  info: RequestInfo = {
    next: null

  }
  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.onChangeUrl()
   }

  ngOnInit(): void {
    this.getCharacters()
  }
  private onChangeUrl(){
    this.router.events.pipe(
      filter((event) =>event instanceof NavigationEnd)
    ).subscribe(
      ()=>{
        this.characters = [];
        this.pageNum= 1;
        this.getCharacters()
      }
    )
  }
  private getCharacters(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.characterService.searchCharacters(this.query, this.pageNum)
      .pipe(
        take(1)
      )
      .subscribe((res: any) => {
        if (res?.results?.length) {
          console.log('Esta es tu respuesta ->', res);
          const { info, results } = res;
          this.characters = [...this.characters, ...results];
          console.log('Estos son los personajes:', this.characters);
          this.info = info;
        } else {
          //console.log('Se jodió')
          this.characters = [];
        }
      });
  }
  
}
