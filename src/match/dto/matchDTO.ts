import { PlayerDTO } from "./playerDTO";

export class MatchDTO {

    Team1 = Array();
    Team2 = Array();
    gameDuration:number;
    gameType:string;
    winningTeam:number;
    platformId:string;
    constructor(gameDuration:number,gameType:string,winningTeam:number,platformId:string){
        this.gameDuration=gameDuration;
        this.gameType=gameType;
        this.winningTeam=winningTeam;
        this.platformId=platformId;

    }

}