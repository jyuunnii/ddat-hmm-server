import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Message } from "../../../entity/Message";
import { User } from "../../../entity/User";

export class MessageController {
  public static getMessagesById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository: Repository<User> = await getRepository(User);
    const messageRepository: Repository<Message> = await getRepository(Message);
    try {
        let sent = [];
        let received = [];

        const subject = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', {id: id})
        .getOne();

        
        // Selet receiver_id in a sent message and select the receiver data in User table.
        // Merge reciever data from User table and message data from Message table
        const receivers = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect(Message, 'message', 'message.targetUserId = user.id')
        .where('message.user.id = :id', {id: id})
        .getMany();

        await receivers.map(async receiver => {
          const sentMessage = await messageRepository
          .createQueryBuilder('message')
          .where('message.targetUserId = :sid AND message.user.id = :uid', {sid: receiver.id, uid: id})
          .getOne();

          sent.push({
            sender: subject.name,
            receiver: receiver.name,
            content : sentMessage.content,
            count : sentMessage.count,
            type : true,
            date: sentMessage.createdAt
          })
        })
        
        // Received message is from subject user, so simply get both sender data and message data using subject_id(= req.parasm.id)
        const receivedMessage = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.messages', 'message')
        .where('message.targetUserId = :id', { id })
        .getMany();

        await receivedMessage.map(record => {
          record.messages.map(message => {
            received.push({
              sender: record.name,
              receiver: subject.name,
              content : message.content,
              count : message.count,
              type : false,
              date: message.createdAt
            })
          })
        })
         
        res.status(200).send({
          sent: sent,
          received: received
        })      
      } catch (e) {
        res.status(404).send(e);
      }
  }

  public static sendMessage = async(req: Request, res: Response) => {
      const {user, targetUserId, content, count} = req.body;
      const newMessage = new Message();
      newMessage.user = user;
      newMessage.targetUserId = targetUserId;
      newMessage.content = content;
      newMessage.count = count;
  
      const messageRepository: Repository<Message> = await getRepository(Message);
      try {
        await messageRepository.save(newMessage);
      } catch (e) {
        res.status(409).send(e);
        return;
      }
      res.status(201).send('Message sent!');
  }
}
