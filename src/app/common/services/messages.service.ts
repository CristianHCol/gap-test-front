import { Injectable } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { TdLoadingService, LoadingMode, LoadingType } from '@covalent/core';

@Injectable()
export class MessageService {
    constructor(private _dialogService: TdDialogService, private _loadingService: TdLoadingService) {
        this._loadingService.create({
            name: 'LinearfullScreenLoading',
            mode: LoadingMode.Indeterminate,
            type: LoadingType.Linear,
            color: 'primary',
        });
    }

    showLoading(): void {
        this._loadingService.register('LinearfullScreenLoading');
    }

    hideLoading(): void {
        this._loadingService.resolve('LinearfullScreenLoading');
    }

    openAlert(title: string, body: string): void {
        this._dialogService.openAlert({
            message: body,
            title: title,
            closeButton: 'cerrar',
        });
    }

    openConfirm(body): void {
        this._dialogService.openConfirm({
            message: body,
            title: 'Confirmar',
            cancelButton: 'NO',
            acceptButton: 'YSI',
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                // DO SOMETHING
            } else {
                // DO SOMETHING ELSE
            }
        });
    }
}
