import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Message } from "../../../entity/Message";
import { User } from "../../../entity/User";

export class MessageController {
    public static getMessagesById = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const message = await getRepository(Message)
            .createQueryBuilder('message')
            .where('message.user = :id', { id })
            .orWhere('message.targetUserId = :id', { id } )
            .orderBy('message.created_at', 'ASC')
            .getMany();

          if(message){
            res.status(200).send(message);
          }else{
            res.status(404).send('User not found');
          }
        } catch (e) {
          res.status(404).send('User not found');
        }
    }

    public static sendMessage = async(req: Request, res: Response) => {
        const {user, targetUserId, content, count} = req.body;
        const sent_message = new Message();
        sent_message.user = user;
        sent_message.targetUserId = targetUserId;
        sent_message.content = content;
        sent_message.count = count;
    
        const messageRepository: Repository<Message> = await getRepository(Message);
        try {
          await messageRepository.save(sent_message);
        } catch (e) {
          res.status(409).send(e);
          return;
        }
        res.status(201).send('Message posted!');
    }
    
}