import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  user1Activated:boolean=false;
  user2Activated:boolean=false;
  private userActivateSubscription:Subscription;
  constructor(private usersService:UsersService){}

  ngOnInit(){
   //Subject (from Rxjs package) is comparable to EventEmitter
   //Subject is ideal for cross component communication!!!
   //here we consume the subject value pushed by 'next()' within user component 
    this.userActivateSubscription = this.usersService.userActivated.subscribe((id:number)=>{
      this.user1Activated = (id==1);
      this.user2Activated = (id==2);
    })
  }



    /* * * * * * * * * * * * * * * * * * W A R N I N G * * * * * * * * * * * * * * * * * * * * * * 
     * we need to unsubscribe our subjects (extends observables) because they don't get destroyed after 
     * the hosted component is destroyed (use ngOnDestroy() for such purpose),
     * otherwise we will create a MEMORY LEAK!!! 
     */ 
  ngOnDestroy(){
    this.userActivateSubscription.unsubscribe();
  }
}
