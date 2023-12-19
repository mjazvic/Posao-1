export interface User {
  id: string;
  username: string;
  password: string;
  grants: Grant[];
  imageUrl:string;
}

export enum Grant {
  CanViewTickets = 'CanViewTickets',
  CanViewTransactions = 'CanViewTransactions',
}
