import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { create } from 'domain';
import { response } from 'express';
import { riotKey,fetch } from 'src/helper';
import { Public } from 'src/public';
import { SummonerDTO } from 'src/summoner/dto/SummonerDTO';
import { MatchDTO } from '../dto/matchDTO';
import { PlayerDTO } from '../dto/playerDTO';



const MAX_MATCH = 10;
@Controller('match')
export class MatchController {


    @Post('last')
    async getLastMatch(@Body() userDTO:SummonerDTO): Promise<any> {
        let summoner = await this.createSummoner(userDTO.name);
        /*GET MATCHES BY PUUID*/ 
        const apiMatch = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?${riotKey}`
        const responseMatch = await fetch(apiMatch);
        const dataMatch = await responseMatch.json();
        let lastMatches = this.createListMatches(dataMatch);
        return (await lastMatches).at(0);
    }

    @Public()
    @Post('all')
    async getLastMatches(@Body() userDTO:SummonerDTO): Promise<Array<MatchDTO>> {
        let summoner = await this.createSummoner(userDTO.name);
        /*GET MATCHES BY PUUID*/ 
        const apiMatch = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?${riotKey}`
        const responseMatch = await fetch(apiMatch);
        const dataMatch = await responseMatch.json();
        let lastMatches = await this.createListMatches(dataMatch);
        return await lastMatches;
         
    }
    @Get('current/:name')
    async getCurrentGame(@Param('name') name: string): Promise<any> {
        let summoner = await this.createSummoner(name);
        let status;
        let responseMatch;
        await fetch(`https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?${riotKey}`).then(response => {
            status = response.status;
        }).then(responseMatch = response);
        console.log(status);
        let dataMatch;
        console.log(responseMatch);
        if(status == 404){
            //TODO => Change to HTTP.Response(401);
            return 'Not in a game';
        }else{
            //TODO => Fetch matches;
            dataMatch = await this.createMatch(responseMatch)
        }
        return dataMatch;

    }

/*Private method*/
    protected async createListMatches(dataMatch:[]) : Promise<Array<MatchDTO>>{
        let listMatch = Array();

        for (let index = 0; index < MAX_MATCH; index++) {
            const element = dataMatch[index];
            let match = await this.retrieveMatch(element)
            listMatch.push(this.createMatch(match));
        }
            
      
        return listMatch;

    }

    protected async retrieveMatch(matchID): Promise<any>{
        const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?${riotKey}`);
        const match = await response.json();
        return match;
    }

    protected async createMatch(match): Promise<MatchDTO>{
        let matchCreated = new MatchDTO(match.info.gameDuration,match.info.gameType=='MATCHED_GAME'?'ranked':match.info.gameType,match.info.participants[0].win?1:2,match.info.platformId);
        for (let index = 0; index < 10; index++) {
            let player= new PlayerDTO(match.info.participants[index].summonerName,
                match.info.participants[index].kills,
                match.info.participants[index].deaths,
                match.info.participants[index].assists,
                match.info.participants[index].item0,
                match.info.participants[index].item1,
                match.info.participants[index].item2,
                match.info.participants[index].item3,
                match.info.participants[index].item4,
                match.info.participants[index].item5,
                match.info.participants[index].item6,
                match.info.participants[index].individualPosition,
                match.info.participants[index].championName            
              );
              
              if(index%2==0){
                matchCreated.Team1.push(player);
               
              }else{
                matchCreated.Team2.push(player);
                
              }
        }
        console.log(matchCreated);
        return matchCreated;
    }

    protected async createSummoner(name:string): Promise<SummonerDTO>{
        const api = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${riotKey}` 
        const response = await fetch(api);
        const data = await response.json();
        if(data.puuid == null){
            return null;
        }
        return new SummonerDTO(data.id,data.account_id,data.puuid,data.name,data.profileIconId,data.revisionDate,data.summonerLevel);
         
    }
}
