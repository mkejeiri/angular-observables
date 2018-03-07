import { Component, OnInit, OnDestroy } from '@angular/core';

//for more info on rxjs package visit : http://reactivex.io/rxjs/ 
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import  'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  //http://reactivex.io/rxjs/
  private myNumbersSubscription : Subscription;
  private myObservableSubscription : Subscription;
  constructor() { }

  ngOnInit() {


    /* * * * * * * * * * * * * * * * * * W A R N I N G * * * * * * * * * * * * * * * * * * * * * * 
     * we need to unsubscribe our observables because they don't get destroyed after 
     * the hosted component is destroyed (use ngOnDestroy() for such purpose),
     * otherwise we will create a MEMORY LEAK!!! 
     * * * * * * * * * * * * * * * * * * W A R N I N G * * * * * * * * * * * * * * * * * * * * * * /  


     /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
      * Operators (we use map here)
      * http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // const myNumbers = Observable.interval(1000);//emits data every second
    const myNumbers = Observable.interval(1000)//emits data every second 
            .map((number:number) =>{
              return number*2;
            });

    //this is a utility function that render a timer which set on 'rxjs/Rx' package
    this.myNumbersSubscription = myNumbers.subscribe((number:number)=>{
      console.log(number);
    });


    /* * * * * * * * * * * * * * * * * * W A R N I N G * * * * * * * * * * * * * * * * * * * * * * 
     * we need to unsubscribe our observables because they don't get destroyed after 
     * the hosted component is destroyed, otherwise we will create a MEMORY LEAK!!! 
     * we should implement OnDestroy-life-cycle-hock, and inside 'ngOnDetroyed()' we should unsubscribe 
     * from all custom observales (unlike built-in angular observales which will get automatically unsubscribed by Angular!)
     */      
    const myObservable = Observable.create((observer:Observer<string>) =>{
      setTimeout(()=>{
        observer.next('First data package'); //next() emits/pushes normal data package.
      },2000); //wait for 2 seconds and send data
      setTimeout(()=>{
        observer.next('Seconds data package'); //next() emits/pushes normal data package.
      },4000); //wait for 4 seconds and send data
      setTimeout(()=>{
        observer.error('Err data package');//error() emits/pushes error data package.
                                                  //this should fail!!! => progam gets interrupted!
                                                  /*
                                                  * depends on timeout settings, the 4 setTimeout func run at the same time, print out ->:
                                                  * 3th data package
                                                  * First data package
                                                  * ERROR Err data package
                                                  */

      },3000); //wait for 3 seconds and send raise an ERR

      setTimeout(()=>{
        observer.next('3th data package'); //next() emits/pushes normal data package.
      },1000); //wait for 1 second and send data

      /**
       * after 0.5 second completed is fired and 
       * all other Jobs are ignored/discarded because our observer is DEAD!!!
       */
      // setTimeout(()=>{
      //   observer.complete(); 
      // },500); //wait for 0.5 second and send data
    });

     /*
      * depends on timeout settings, the 4 setTimeout func run at the same time, print out ->:
      * 3th data package
      * First data package
      * ERROR Err data package
      */
    this.myObservableSubscription = myObservable.subscribe((data:string)=>{
        console.log(data);
    }
    ,(error:string)=>{
      //console.log(error);
      console.error(error);
      // console.info(error);
      // console.warn(error);
      // console.assert(error);
    },
    ()=>{
      console.log('Completed'); //this will not be printed the error will break the program!!!
    }
  );
  }

  ngOnDestroy(){
    //as soon a we leave the component the observable get destoryed!!!
    this.myNumbersSubscription.unsubscribe();
    this.myObservableSubscription.unsubscribe();
  }
}

