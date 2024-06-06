import { CallHandler, ExecutionContext, NestInterceptor, Type } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PlayerDTO } from '../dto/player.dto';

export class PlayerStatsTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: PlayerDTO) => {
        data.playerStats.forEach((value) => {
          value.totalGames = Number(value.totalGames);
          value.wins = Number(value.wins);
          value.top3 = Number(value.top3);
          value.averageAssistants = Number(value.averageAssistants);
          value.averageHunts = Number(value.averageHunts);
          value.averageKills = Number(value.averageKills);
          value.averageRank = Number(value.averageRank);
          value.averageTeamKills = Number(value.averageTeamKills);
        });
        return data;
      }),
    );
  }
}
