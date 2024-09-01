import { Request, Response } from 'express';
import { TicketService } from '../ticket.service';

export class TicketController {

  // DI - WssService
  constructor(
    private readonly ticketService = new TicketService(),
  ) {}

  public getTickets = async (req: Request, res: Response) => {
    return res.status(200).json(this.ticketService.tickets);
  }

  public getLastTicketNumber = async (req: Request, res: Response) => {
    return res.status(200).json(this.ticketService.lastTicketNumber);
  }

  public pendingTickets = async (req: Request, res: Response) => {
    return res.status(200).json(this.ticketService.pendingTickets);
  }

  public createTicket = async (req: Request, res: Response) => {
    return res.status(201).json(this.ticketService.createTicket());
  }

  public drawTicket = async (req: Request, res: Response) => {
    const { desk } = req.params;
    return res.status(200).json(this.ticketService.drawTicket(desk));
  }

  public ticketFinished = async (req: Request, res: Response) => {
    const { ticketId } = req.params;
    return res.status(200).json(this.ticketService.onFinishedTicket(ticketId));
  }

  public workingOn = async (req: Request, res: Response) => {
    return res.status(200).json(this.ticketService.lastWorkingOnTickets);
  }

}