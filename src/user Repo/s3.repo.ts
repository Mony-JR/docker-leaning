
import { UserModel } from "../Models/user";
import {  UserRequest } from "../services/s3-type";

export class s3Repo {

    async createUpload(data:UserRequest):Promise<UserRequest|null>{
        
        const newUser = new UserModel(data);
        return newUser.save();
    
    }

    // async createUser(userCreationParams: UserCreationParams): Promise<User | null> {
    //     const newUser = new UserModel(userCreationParams);
    //     return newUser.save();
    // }

}