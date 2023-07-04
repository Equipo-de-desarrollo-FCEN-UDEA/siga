import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '@services/user.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Pipe({
  name: 'userPerId'
})
export class UserPerIdPipe implements PipeTransform {

  constructor( private userService: UserService ) { }

  async transform(value: number): Promise<string> {
    const res: any = await firstValueFrom(this.userService.getUser(value));
    console.log(res);
    return res.names + ' ' + res.last_names;
  }
}
