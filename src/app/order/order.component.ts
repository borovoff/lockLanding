import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['../app.component.scss']
})
export class OrderComponent {
    name = '';
    mail = '';
    phone = '';
    sended = false;
    error = false;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    matcher = new MyErrorStateMatcher();

    constructor(private http: HttpClient) { }

    send() {
        const url = 'https://sharing.tzar.su/rest/user/addmail?name=' + this.name + '&mail=' +
            this.mail + '&phone=' + this.phone;

        console.log(url);

        this.http.get(url).subscribe((res) => {
            if (res['result']) {
                this.sended = true;
                this.error = false;
            } else {
                this.sended = false;
                this.error = true;
            }
            console.log(res);
        });
    }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
