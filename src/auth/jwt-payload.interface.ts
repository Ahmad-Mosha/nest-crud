import { UserRole } from 'src/users/entity/user.entity';

export interface JwtPayload {
  username: string;
  role: UserRole;
}
