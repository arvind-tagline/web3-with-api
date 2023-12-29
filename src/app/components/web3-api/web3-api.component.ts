import { Component } from '@angular/core';
import { Web3ApisService } from 'src/app/service/web-3-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-web3-api',
  templateUrl: './web3-api.component.html',
  styleUrls: ['./web3-api.component.scss']
})
export class Web3ApiComponent {

  private params:any = {
    module: 'account',
    apikey: environment.api_key,
  };
  public accounts:any = [];
  public transctionList:any = [];


  constructor(private web3Service: Web3ApisService){

  }

  ngOnInit(){
    this.getAcountBalance();
  }

  getAcountBalance() {
    this.params = {
      ...this.params,
      action: 'balancemulti',
      address: localStorage.getItem('address'),
      tag: 'latest',
    };
    // this.params = {
    //   ...this.params,
    //   action: 'eth_gasPrice',
    //   module:'proxy'
    // };
    this.web3Service.getAccountTransctions(this.params).subscribe(async (res: any) => {
      this.accounts = res.result;
      await this.getContract();
      await this.getTransctions();
    });
  }

  getTransctions(){
    delete this.params.tag;
    this.params = {
      ...this.params,
      action: 'txlist',
      module: 'account',
      address: this.accounts[0].account,
      startblock: 0,
      endblock: 99999999,
      sort: 'asc'
    };
    this.web3Service.getAccountTransctions(this.params).subscribe((transctions:any)=>{
      this.transctionList = transctions.result;
    });
  }

  getContract(){
    delete this.params.tag;
    this.params = {
      ...this.params,
      module:'contract',
      action:'getabi',
      // contractaddresses:'0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5',
      address: this.accounts[0].account,
    };
    this.web3Service.getAccountTransctions(this.params).subscribe((contract:any)=>{
      console.log('contract :>> ', contract);
    })
  }


}
