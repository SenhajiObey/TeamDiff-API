import { Controller, Get, Param } from '@nestjs/common';
import { riotKey,fetch } from 'src/helper';
import { Public } from 'src/public';
import { SummonerDTO } from '../dto/SummonerDTO';

@Controller('summoner')
export class SummonerController {

    @Public()
    @Get(':name')
    protected async createSummoner(@Param('name') name: string): Promise<SummonerDTO>{
        console.log(name);
        const api = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${riotKey}` 
        const response = await fetch(api);
        const data = await response.json();
        if(data.puuid == null){
            return null;
        }
        return new SummonerDTO(data.id,data.account_id,data.puuid,data.name,data.profileIconId,data.revisionDate,data.summonerLevel);
         
    }
}
