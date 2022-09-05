export class PlayerDTO{
    playerName:string;
    playerKills: number;
            playerDeaths: number;
            playerAssists: number;
            playerItem1: number;
            playerItem2: number;
            playerItem3: number;
            playerItem4: number;
            playerItem5: number;
            playerItem6: number;
            playerItem7: number;
            playerLane: string;
            playerChamp: string;

        constructor( playerName:string,
            playerKills: number,
                    playerDeaths: number,
                    playerAssists: number,
                    playerItem1: number,
                    playerItem2: number,
                    playerItem3: number,
                    playerItem4: number,
                    playerItem5: number,
                    playerItem6: number,
                    playerItem7: number,
                    playerLane: string,
                    playerChamp: string){
                        this.playerName=playerName;
                        this.playerKills=playerKills;
                        this.playerDeaths=playerDeaths;
                        this.playerAssists=playerAssists;
                        this.playerItem1=playerItem1;
                        this.playerItem2=playerItem2;
                        this.playerItem3=playerItem3;
                        this.playerItem4=playerItem4;
                        this.playerItem5=playerItem5;
                        this.playerItem6=playerItem6;
                        this.playerItem7=playerItem7;
                        this.playerLane=playerLane;
                        this.playerChamp=playerChamp;
                    }
}