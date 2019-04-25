import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: ToastrService) { }


  showToasterSuccess(msg: any) {
    this.toastrService.success('Message', msg, {timeOut: 1500});
  }

  showToasterError(msg: string){
    this.toastrService.error(msg);
  }

  showToasterInfo(msg: string){
    this.toastrService.info(msg);
  }

}
