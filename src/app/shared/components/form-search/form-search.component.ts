import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onSearch(value: string){
    
    if(value){
      this.router.navigate(['/characters-list'],{
        queryParams: {q: value}
      })
      //console.log(value);
      
    }
  }
}
