
import {Subject} from 'rxjs/Subject';

export class UsersService{
 //Subject is comparable to EventEmitter
 //Subject is ideal for cross component communication!!!    
    userActivated = new Subject();
}