import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import {GoogleDataAccess} from './google.data-access';

@Module({
  providers: [GoogleService, GoogleDataAccess],
  exports: [GoogleService]
})
export class GoogleModule {}
