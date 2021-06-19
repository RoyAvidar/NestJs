import { Injectable } from '@nestjs/common';
import { User } from './models/user';

import { TypeOrmModule } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    private users: User[] = [];

    public createUser(): User {
        return null;
    }

    public updateUser(): User {
        return null;
    }

    public getUser(): User {
        return null;
    }

    public getUsers(): User[] {
        return null;
    }

    public deleteUser(): User {
        return null;
    }
}
