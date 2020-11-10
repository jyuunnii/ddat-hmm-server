import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Message } from "../../../entity/Message";
import { User } from "../../../entity/User";

export class MessageController {
  public static getMessagesById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository: Repository<User> = await getRepository(User);
    const messageRepository: Repository<Message> = await getRepository(Message);

    const currentDate = new Date();
    const today = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();

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
          const sentMessages = await messageRepository
          .createQueryBuilder('message')
          .where('message.targetUserId = :sid AND message.user.id = :uid AND message.createdAt =:date', {sid: receiver.id, uid: id, date: today})
          .getMany();
          
          sentMessages.map(sentMessage => {
            sent.push({
              sender: subject.name,
              receiver: receiver.name,
              content : sentMessage.content,
              type : true,
            })
          }) 
        })
        
        // Received message is from subject user, so simply get both sender data and message data using subject_id(= req.parasm.id)
        const receivedMessage = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.messages', 'message')
        .where('message.targetUserId = :id AND message.createdAt =:date', { id: id, date: today })
        .getMany();

        await receivedMessage.map(record => {
          record.messages.map(message => {
            received.push({
              sender: record.name,
              receiver: subject.name,
              content : message.content,
              type : false,
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
    const id = req.params.id;
    const {targetUserId, content} = req.body;

    const userRepository: Repository<User> = await getRepository(User); 
    const messageRepository: Repository<Message> = await getRepository(Message);
    try {
        const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', {id: id})
        .getOne();

        const newMessage = new Message();
        newMessage.user = user;
        newMessage.targetUserId = targetUserId;
        newMessage.content = content;

        await messageRepository.save(newMessage);
    } catch (e) {
        res.status(409).send(e);
        return;
      }
      res.status(201).send('Message sent!');
  }
}
