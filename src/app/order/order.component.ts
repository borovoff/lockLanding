import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent {
    name = '';
    mail = '';
    phone = '';
    success = false;
    error = '';
    OrderStatus = OrderStatus;
    status = OrderStatus.Prepare;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    matcher = new MyErrorStateMatcher();

    constructor(private http: HttpClient,
                private translate: TranslateService) {
    }

    send() {
        const url = 'https://sharing.tzar.su/rest/user/addmail?name=' + this.name + '&mail=' +
            this.mail + '&phone=' + this.phone + '&lang=' + this.translate.currentLang;

        this.status = OrderStatus.Sending;

        this.http.get<OrderResponse>(url).subscribe(res => {
            this.status = OrderStatus.Sended;
            this.success = res.result;
            const error = res.error;
            let stringError = '';
            if (error) {
                Object.keys(error).forEach(key => {
                    stringError += this.getString(error[key]);
                });
            }
            this.error = stringError;

            console.log('error', res);
        });
    }

    getString(field?: string[]) {
        return field ? field[0] + ' ' : '';
    }
}

export enum OrderStatus {
    Prepare,
    Sending,
    Sended
}

export class OrderResponse {
    result: boolean;
    error: ErrorFields;
}

export class ErrorFields {
    mail?: string[];
    name?: string[];
    phone?: string[];
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
