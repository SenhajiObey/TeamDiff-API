import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('challenges')
export class ChallengesController {

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<string> {
        return 'Oui';
           
         
    }


}
