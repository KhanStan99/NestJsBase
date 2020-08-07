import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Users } from 'src/database/entities';
import { LoginUserDto } from './dto/LoginUser.dto';
import { ErrorService } from './../../common/error-handler/error.service';

@Injectable()
export class UserService {
  async createUser(createUserInput: CreateUserDto): Promise<Users> {
    try {
      const userDetails = await Users.findOne({
        Emailid: createUserInput.Emailid,
        Mobile: createUserInput.Mobile,
      });
      if (userDetails) {
        throw new NotAcceptableException('User already exist!');
      }
      const user = new Users();
      user.FirstName = createUserInput.FirstName;
      user.LastName = createUserInput.LastName;
      user.Emailid = createUserInput.Emailid;
      user.Mobile = createUserInput.Mobile;
      user.PasswordHash = createUserInput.Password;
      user.DOB = createUserInput.DOB;
      user.DLImgUrl = createUserInput.DLImgUrl;
      return await Users.save(user);
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginInput: LoginUserDto): Promise<Users> {
    try {
      const userDetails = await Users.findOne({
        Emailid: loginInput.Emailid,
      });
      if (!userDetails) {
        throw new NotAcceptableException('User doesnt exist!');
      }

      if (userDetails.PasswordHash === loginInput.Password) {
        return userDetails;
      } else {
        throw new UnauthorizedException('Invalid Login Credentials');
      }
    } catch (error) {
      throw error;
    }
  }
}
