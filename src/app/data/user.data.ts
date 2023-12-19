import {Grant, User} from '../core/models/user.model';

export const users: User[] = [
  {
    id: '1',
    username: 'void',
    password: 'void',
    grants: [],
    imageUrl: 'https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0',
  },
  {
    id: '2',
    username: 'main',
    password: 'main',
    grants: [Grant.CanViewTickets, Grant.CanViewTransactions],
    imageUrl: 'assets/branding/large-logo.jpg',
  },
  {
    id: '3',
    username: 'transactions',
    password: 'transactions',
    grants: [Grant.CanViewTransactions],
    imageUrl: 'https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0',
  },
  {
    id: '4',
    username: 'tickets',
    password: 'tickets',
    grants: [Grant.CanViewTickets],
    imageUrl: 'https://img.freepik.com/free-icon/businessman_318-487701.jpg',
  }
]
