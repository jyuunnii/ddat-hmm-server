import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository()
export class UserRepository extends Repository<User> {
    static save: any;

    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

}