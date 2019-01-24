import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

interface TrueResponse {
    result: boolean;
}

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['../app.component.scss']
})
export class OrderComponent {

    courses$: Observable<TrueResponse[]>;
    name = '';
    mail = '';
    phone = '';

    constructor(private http: HttpClient) { }


    send() {
        const url = 'https://sharing.tzar.su/rest/user/addmail?name=' + this.name + '&mail=' +
            this.mail + '&phone=' + this.phone;

        console.log(url);

        this.http.get(url).subscribe((res) => {
            console.log(res);
        });

        // this.courses$ = this.http
        //     .get<TrueResponse[]>(url)
        //     .map(data => _.values(data))
        //     .do(console.log);
    }
}
