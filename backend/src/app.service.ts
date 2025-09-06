import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  home(): string {
    return 'The Nestjs backend server is running on port: http://localhost:3000/';
  }
}
