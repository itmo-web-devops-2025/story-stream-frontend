import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@/modules/user/dto/createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  bio: string;
}
