export class SummonerDTO{
  id:string;
  account_id:string;
  puuid:string;
  name:string;
  profileIconId:number;
  revisionDate:number;
  summonerLevel:number;

  constructor(id:string,
    account_id:string,
    puuid:string,
    name:string,
    profileIconId:number,
    revisionDate:number,
    summonerLevel:number,) {

      this.id=id
     this.account_id=account_id;
     this.puuid=puuid;
     this.name=name;
     this.profileIconId=profileIconId;
     this.revisionDate=revisionDate;
     this.summonerLevel=summonerLevel;
  }
}