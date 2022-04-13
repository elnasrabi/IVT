import { v4 as uuid } from 'uuid';

export const rulesMeta = [
  {
    id: uuid(),
    description: 'Kick-off the IVT Engine for all tasks or selected ones.',
    media: '/static/images/rules/engine.png',
    title: 'IVT Engine',
    priroity: 'No',
    path:'/Admin/IVTEngine'
  },

  {
    id: uuid(),
    description: 'Specify the prefixes allowed for customer-carrier combination along with optional setting of delivery comments and customer references.',
    media: '/static/images/rules/prefix.png',
    title: 'Prefix',
    priroity: 'P1',
    path:'/Admin/prefix'
  },

  {
    id: uuid(),
    createdAt: '03/04/2019',
    description: 'Original destination codes & work code , carrier , from and to exceptions.',
    media: '/static/images/rules/postcode.png',
    title: 'PostCodes',
    priroity: 'P3'
  },
  {
    id: uuid(),
    description: 'what are the tolerence percentages for specific rules?what is the range of Totalnet?',
    media: '/static/images/rules/tolerence.png',
    title: 'Tolerence',
    priroity: 'P4/P5'
  },
  {
    id: uuid(),
    description: 'Cubic reference for each customer-carrier combination.',
    media: '/static/images/rules/cubic.jpg',
    title: 'Cubic',
    priroity: 'P10'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: ' Fuel rates for the customer-carrier',
    media: '/static/images/rules/fuel.png',
    title: 'Fuel Surcharge',
    priroity: 'P7/P8'
  },
  {
    id: uuid(),
  
    description: 'Add/Edit IVT users details',
    media: '/static/images/rules/user.png',
    title: 'IVT Users',
    priroity: 'No'
  }
];
