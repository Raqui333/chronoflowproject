import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(5001)
export class WebsocketGateway {
  @SubscribeMessage('ping')
  handleMessage(@MessageBody() data: string): { event: string; data: string } {
    return {
      event: 'pong',
      data: `This is your message in UPPERCASE: ${data.toLocaleUpperCase()}`,
    };
  }
}
