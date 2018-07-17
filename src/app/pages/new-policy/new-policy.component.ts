import { Component, OnInit } from '@angular/core';
import { Policy, CoverageType, Risk, Agency, Customer } from './../../common/models/index';
import { CoverageService, RiskService, AgencyService, CustomerService, MessageService, PolicyService } from '../../common/services/';
import { TdDialogService } from '@covalent/core';
import { Router } from '@angular/router';
import { isObject } from 'util';

@Component({
  selector: 'app-new-policy',
  templateUrl: './new-policy.component.html',
  styleUrls: ['./new-policy.component.scss'],
  viewProviders: [MessageService]
})
export class NewPolicyComponent implements OnInit {

  private types: Object[];
  public policyDTO: Policy;
  public customerDTO: Customer;
  public coverageType: CoverageType;
  public risk: Risk;
  public agency: any;
  public coverages: Array<CoverageType>;
  public riskList: Array<Risk>;
  public agencyList: Array<Agency>;
  public notUserFound: boolean;
  public isUpdating: boolean;
  public ideTypes = [{
    name: 'Tarjeta de identidad'
  }, {
    name: 'Cedula'
  }, {
    name: 'Nit'
  }, {
    name: 'Cedula extranjeria'
  }];

  public genders = [
    {
      name: 'Masculino'
    }, {
      name: 'Femenino'
    }];

  public maritalStatus = [
    {
      name: 'Solter@'
    }, {
      name: 'Casad@'
    }, {
      name: 'Viud@'
    }];

  constructor(private _coverageService: CoverageService,
    private _riskService: RiskService,
    private _agencyService: AgencyService,
    private _customerService: CustomerService,
    private _messageServices: MessageService,
    private _policyService: PolicyService,
    private _dialogService: TdDialogService,
    private _router: Router) {
    this.policyDTO = new Policy();
    this.customerDTO =  new Customer();
    this.coverages = new Array<CoverageType>();
    this.coverageType = new CoverageType();
    this.risk = new Risk();
    this.agency = new Agency();
    this.riskList = new Array<Risk>();
    this.agencyList = new Array<Agency>();
    this.notUserFound = false;
    this.isUpdating = false;
  }

  ngOnInit() {
    this._coverageService.getAll().then((response) => {
      this.coverages = response;
    }).catch((ex) => {
        console.log('error getting coverages to select', ex);
    });

    this._riskService.getAll().then((response) => {
      this.riskList = response;
    }).catch((ex) => {
        console.log('error getting risks to select', ex);
    });

    this._agencyService.getAll().then((response) => {
      this.agencyList = response;
    }).catch((ex) => {
        console.log('error getting agencies to select', ex);
    });
    if (localStorage.policyToUpdate) {
      const dataToUpdate = JSON.parse(localStorage.policyToUpdate);
      this.policyDTO.Id = dataToUpdate.id;
      this.policyDTO.Name = dataToUpdate.name;
      this.policyDTO.Description = dataToUpdate.description;
      this.policyDTO.StartDay = dataToUpdate.startDay;
      this.policyDTO.CoveragePeriod = dataToUpdate.coveragePeriod;
      this.policyDTO.CoveragePeriod = dataToUpdate.coveragePeriod;
      this.policyDTO.Ammount = dataToUpdate.ammount;
      localStorage.removeItem('policyToUpdate');
      this.isUpdating = true;
    }
  }

  findUser() {
    this._customerService.findByIdUser(this.customerDTO.identification).then((response) => {
      if (response.status === 404) {
          this.notUserFound = true;
      } else {
        if (isObject(response)) {
          this.customerDTO.Id = response.id;
          this.customerDTO.Age = response.age;
          this.customerDTO.CellPhone = response.cellPhone;
          this.customerDTO.CellPhone = response.cellPhone;
          this.customerDTO.identification = response.identification;
          this.customerDTO.Gender = response.gender;
          this.customerDTO.identificationType = response.identificationType;
          this.customerDTO.identificationType = response.identificationType;
          this.customerDTO.Name = response.name;
          this.customerDTO.LastName = response.lastName;
          this.customerDTO.MaritalStatus = response.maritalStatus;
          this.notUserFound = true;
        }
      }
    }).catch((ex) => {
      this.notUserFound = true;
      console.log('error getting agencies to select', ex);
    });
  }

  create(form: any) {
      if (form.valid) {
        this._messageServices.showLoading();
        this.policyDTO.Agency = this.agency;
        this.policyDTO.Coverage = [this.coverageType];
        this.policyDTO.Customer = this.customerDTO;
        this.policyDTO.RiskType = this.risk;
        this._policyService.cereate(this.policyDTO).then((response) => {
          this._messageServices.hideLoading();
          if (response.status === 404) {
            this._messageServices.openAlert('OHHH!!', 'Error creando la poliza');
          } else {
            this._customerService.cereate(response.customer).then((customerCreate) => {
          this._dialogService.openConfirm({
             message: `La poliza ha sido creada con el id ${response.id}.`,
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
              this.notUserFound = true;
              this._messageServices.openAlert('OHHH!!', 'Error creando la poliza');
            });
          }
        }).catch((ex) => {
          this.notUserFound = true;
          this._messageServices.openAlert('OHHH!!', 'Error creando la poliza');
        });
      }
  }

  update(form: any) {
    if (form.valid) {
      this._messageServices.showLoading();
      this.policyDTO.Agency = this.agency;
      this.policyDTO.Coverage = [this.coverageType];
      this.policyDTO.Customer = this.customerDTO;
      this.policyDTO.RiskType = this.risk;
      this._policyService.update(this.policyDTO).then((response) => {
        this._messageServices.hideLoading();
        if (response.status === 404) {
          this._messageServices.openAlert('OHHH!!', 'Error Actualizando la poliza');
        } else {
          this._customerService.update(this.customerDTO).then((customerCreate) => {
        this._dialogService.openConfirm({
           message: `La poliza ha sido Actualizada.`,
           title: 'Confirmar',
           cancelButton: ' ',
           acceptButton: 'SI',
          }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
              this._router.navigate(['/dashboard']);
            } else {
              // DO SOMETHING ELSE
            }
          });
          }).catch((ex) => {
            this.notUserFound = true;
            this._messageServices.openAlert('OHHH!!', 'Error creando la poliza');
          });
        }
      }).catch((ex) => {
        this.notUserFound = true;
        this._messageServices.openAlert('OHHH!!', 'Error creando la poliza');
      });
    }
}
}
