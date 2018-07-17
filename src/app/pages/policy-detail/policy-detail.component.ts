import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, PolicyService  } from '../../common/services/';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.scss'],
  viewProviders: [MessageService],
})
export class PolicyDetailComponent implements OnInit {

  item: any = {};

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _messageService: MessageService,
    private _policyService: PolicyService,
    private _dialogService: TdDialogService) { }

  goBack(): void {
    this._router.navigate(['/']);
  }

  ngOnInit(): void {
    this.item = JSON.parse(localStorage.PolicyDetail);
    console.log(this.item);
  }

  update(): void {
    localStorage.setItem('policyToUpdate', JSON.stringify(this.item));
    this._router.navigate(['/newPolicy']);
  }

  delete(): void {
    this._policyService.delete(this.item.id).then((deleted) => {
    this._dialogService.openConfirm({
     message: `La poliza ${this.item.name} ha sido Eliminada.`,
     title: 'Confirmar',
     cancelButton: ' ',
     acceptButton: 'Ok',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this._router.navigate(['/dashboard']);
      } else {
        // DO SOMETHING ELSE
      }
    });
    }).catch((ex) => {
      this._messageService.openAlert('OHHH!!', 'Error Eliminando la poliza');
    });
  }
}
