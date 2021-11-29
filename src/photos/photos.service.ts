import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private usersService: UsersService,
    ) {}
}