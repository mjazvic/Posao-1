import {Player} from '../models/player.model';

export const players: Player[] = [
  {
    id: '1',
    playerCode: 234,
    email: 'johndoe@playnirvana.com',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    image:'/assets/branding/small-logo.png',
    profile:true
  },
  {
    id: '2',
    playerCode: 321,
    email: 'janedoe@playnirvana.com',
    username: 'janedoe',
    firstName: 'Jane',
    lastName: 'Doe',
    image:'/assets/branding/login.png',
    profile:true
  },
  {
    id: '3',
    playerCode: 651,
    email: 'adamsmith@playnirvana.com',
    username: 'adamsmith',
    firstName: 'Adam',
    lastName: 'Smith',
    image:'/assets/branding/large-logo.png',
    profile:true
  }
]
