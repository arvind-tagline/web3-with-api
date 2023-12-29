import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Web3ApisService {
  
  private url:string = 'https://api.etherscan.io/api';
  constructor(private http: HttpClient) { }

  // getAccountBalance(params:any){
  //   // let urlSearchParams = new HttpParams();
  //   // urlSearchParams = params;
  //   return this.http.get(`${this.url}`,{ params: this.formateParams(params) });
  // }

  private formateParams(params:any){
    let urlSearchParams = new HttpParams();
    urlSearchParams = params;
    return urlSearchParams;
  }

  getAccountTransctions(params:any){
    return this.http.get(`${this.url}`,{params:this.formateParams(params)});
  }

  // getContract(params:any){
  //   return this.http.get(`${this.url}`,{params:this.formateParams(params)});
  // }
}
