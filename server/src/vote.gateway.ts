import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: 'vote' })
export class VoteGateway {
  @WebSocketServer() server: Server;

  votes: Record<string, number> = {
    pizza: 0,
    taco: 0,
  };

  @SubscribeMessage('voteToServer')
  handleVoteToServer(client: Socket, vote: string) {
    if (vote === 'pizza') {
      this.votes.pizza += 1;
    } else if (vote === 'taco') {
      this.votes.taco += 1;
    }
    this.server.emit('votesToClient', this.votes);
  }

  @SubscribeMessage('startVote')
  handleStart(client: Socket) {
    this.votes = { pizza: 0, taco: 0 };
    this.server.emit('started')
    this.server.emit('votesToClient', this.votes);
    // setInterval(() => {
    //   const random1 = Math.floor(Math.random() * 5) + 1;
    //   const random2 = Math.floor(Math.random() * 5) + 1;
    //   this.votes.pizza += random1;
    //   this.votes.taco += random2;
    //   this.server.emit('votesToClient', this.votes)
    // }, 1000);
  }
}
