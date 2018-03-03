import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;
  userActivated:boolean= false;

  constructor(private route: ActivatedRoute, private userService:UsersService) { }

  ngOnInit() {
    //Angular doesn't re-render the user component just because the param is changed!
    //hence the use of observables: 
    //this.id = + this.route.snapshot.params.id; //doesn't update  the component since it's not re-rendered
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        });      
    
  }
 
  //Subject is comparable to EventEmitter
  //Subject is ideal for cross component communication!!!   
  onActivate() {
    //pushing the 'user id' value to app component where it consumed (subscribed)    
    this.userService.userActivated.next(this.id);
  }

}
