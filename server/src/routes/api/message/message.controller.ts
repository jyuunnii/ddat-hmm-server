import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Message } from "../../../entity/Message";
import { User } from "../../../entity/User";

export class MessageController {
  public static getMessagesById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository: Repository<User> = await getRepository(User);
    try {
        const sent = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.messages', 'message')
        .where('user.id = :id', { id })
        .getMany()

        const received = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.messages', 'message')
        .where('message.targetUserId = :id', { id })
        .getMany()

        const subjectName = sent[0].name;
        let data  =[];
        Promise.all([
        await sent.map(record => {
          record.messages.map(message => {
              data.push({
              sender: subjectName,
              receiver: message.targetUserId,
              content : message.content,
              count : message.count,
              type : true,
              date: message.createdAt
            })
          })
        }),
        await received.map(record => {
          record.messages.map(message => {
            data.push({
              sender: record.name,
              receiver: subjectName,
              content : message.content,
              count : message.count,
              type : false,
              date: message.createdAt
            })
          })
        })
      ]);   
      res.status(200).send(data)      
    } catch (e) {
      res.status(404).send(e);
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
