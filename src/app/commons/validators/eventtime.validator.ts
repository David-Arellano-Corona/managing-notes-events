import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

export function testValidator():ValidatorFn{
    return (control:AbstractControl): ValidationErrors | null => {
      const minuteInit = control.get('minuteInit')?.value;
      const hourInit = control.get('hourInit')?.value;
      const minuteEnd = control.get('minuteEnd')?.value;
      const hourEnd = control.get('hourEnd')?.value;
      const date = moment().format("YYYY-MM-DD")
      const initTime = moment(`${date} ${hourInit}:${minuteInit}:00`)
      const endTime = moment(`${date} ${hourEnd}:${minuteEnd}:00`)  
      const initTimeIsBefore = moment(initTime).isBefore(endTime);
      return initTimeIsBefore ? null: { eventTimeError:"La hora de inicio debe ser menor que la hora de fin" }
    }
  }