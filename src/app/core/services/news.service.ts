
import { Injectable } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
// import { userInfo } from 'os';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    public notify = new Subject<any>();
    public adminPanel = new Subject<any>();
    public searchData = new Subject<any>();
    public responseCache = new Map();
    public cacheUser = new Map();
    public apiUrl = environment.apiUrl;
    public userName=new Subject<any>();

    constructor(
        private http: HttpClient) {
        if (sessionStorage.getItem('userInfo') !== null) {
            const cache = JSON.parse(sessionStorage.getItem('userInfo'));
            this.cacheUser.set('userInfo', cache);
        }
    }
    // getHttpRequest(path) {
    //     const url = this.apiUrl + path;
    //     return this.http.get(url);
    // }

    getAllTransactions() {
        const url = this.apiUrl + 'api/transactions';
        console.log(url);
        return this.http.get(url);
    }

    getBranches() {
        let url = this.apiUrl + 'api/branches';
        return this.http.get(url);
    }

    getCustomerDetails(path) {
        let accounts_id = JSON.parse(sessionStorage.getItem('accounts_id'));
        const url = this.apiUrl + path + '/' + accounts_id + '/' + 'user-summary';
        console.log(url)
        return this.http.get(url);
    }
    // getAccountDetails(path) {
    //     let accounts_id = JSON.parse(sessionStorage.getItem('accounts_id'));
    //     const url = this.apiUrl + path + '/' + accounts_id + '/' + 'accounts';
    //     console.log(url)
    //     return this.http.get(url);
    // }
    postHttpRequest(path, body) {
        const url = this.apiUrl + path;
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache',
                    'accept': 'application/json'
                }
            )
        };
        return this.http.post(url, body, httpOptions);
    }

    putHttpRequest(path, body) {
        const url = this.apiUrl + path;
        return this.http.put(url, body);
    }

    deleteHttpRequest(path) {
        const url = this.apiUrl + path;
        return this.http.delete(url);
    }

    search(enteredName) {
        let accounts_id = JSON.parse(sessionStorage.getItem('accounts_id'));
        let url = this.apiUrl + 'api/search/';
        const params = new HttpParams()
            // .set("accounts_id", accounts_id);
            .set("name", enteredName);
        console.log(url);
        return this.http.get(url, { params });
    }
    searchBy(req) {
        let url = this.apiUrl + req;
        console.log(url);
        return this.http.get(url);
    }

    loginAPI(body) {
        const url = this.apiUrl + 'api/access';
        return this.http.post(url, body);
    }
    createAccount(body: any) {
         let accounts_id = JSON.parse(sessionStorage.getItem('accounts_id'));
        let url = this.apiUrl + 'api/account/';
        const params = new HttpParams()
            .set("accounts_id", accounts_id);
        return this.http.post(url, body, { params })
    }

    createFD(body) {
        let url = this.apiUrl + 'api/fixed-deposit/';
        return this.http.post(url, body);
    }

    postTransaction(body){
        let url=this.apiUrl+ 'api/transactions';
        return this.http.post(url,body);
    }
}

