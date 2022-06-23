import { v4 as uuid } from 'uuid';

export const rulesMeta = [
  {
    id: uuid(),
    description: 'View and Update IVT Rules.',
    media: '/static/images/rules/rules.png',
    title: 'IVT Rules',
    priroity: 'No',
    path:'/Admin/rule'
  },
  {
    id: uuid(),
    description: 'Load new data to be investigated.',
    media: '/static/images/rules/dataload.png',
    title: 'New Load',
    priroity: 'No',
    path:'/Admin/dataload'
  },
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
    title: 'Routes',
    priroity: 'P3',
    path:'/Admin/route'
  },
  {
    id: uuid(),
    description: 'what are the tolerence percentages for specific rules?what is the range of Totalnet?',
    media: '/static/images/rules/tolerence.png',
    title: 'Tolerence',
    priroity: 'P4/P5',
    path:'/Admin/tolerance'
  },
  {
    id: uuid(),
    description: 'Cubic reference for each customer-carrier combination.',
    media: '/static/images/rules/cubic.jpg',
    title: 'Cubic',
    priroity: 'P10',
    path:'/Admin/cubic'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: ' Fuel rates for the customer-carrier',
    media: '/static/images/rules/fuel.png',
    title: 'Fuel Surcharge',
    priroity: 'P7/P8',
    path:'/Admin/fuel'
  },
    {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Configure how connotes data can be consolidated for each customer.',
    media: '/static/images/rules/Consolidation.png',
    title: 'Consolidation Check',
    priroity: 'P21',
    path:'/Admin/consolidation'
  },
  {
    id: uuid(),
  
    description: 'Add/Edit IVT users details',
    media: '/static/images/rules/user.png',
    title: 'IVT Users',
    priroity: 'No',
    path:'/Admin/user'
  },
  {
    id: uuid(),
  
    description: 'Manage customers portfolio by assigning each account for the responsible account manager',
    media: '/static/images/rules/amportfolio.png',
    title: 'AM Portfolio',
    priroity: 'No',
    path:'/Admin/amportfolio'
  },
  {
    id: uuid(),
    description: 'Inspect Buy or Sell File.',
    media: '/static/images/rules/fileinspect.png',
    title: 'File Inspection',
    priroity: 'No',
    path:'/Admin/uploadfile'
  },
];
