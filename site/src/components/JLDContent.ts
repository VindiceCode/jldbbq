export const CONTACT = {
  phone: '(419) 906-0856',
  phoneHref: 'tel:+14199060856',
  smsHref: 'sms:+14199060856',
  email: 'sandybagger1@gmail.com',
  area: 'Northwest Ohio & surrounding states',
  years: '15+ years'
};

export const MAX_TRAYS = 4;

export const ROTATING_WORDS = ['Game Day', 'Corporate Event', 'Birthday', 'Graduation Party'];

export const BUNDLE = {
  name: 'The Game Day Bundle',
  price: 200,
  feeds: 12,
  totalWeight: 15,
  items: [
  {
    key: 'pork',
    name: 'Pulled Pork',
    weight: '5 lbs',
    note: 'Smoked low and slow, pulled by hand.',
    src: "/photos/pulled-pork.jpg"
  },
  {
    key: 'potatoes',
    name: 'Barbecue Potatoes',
    weight: '5 lbs',
    note: 'Roasted with onion and Dad’s rub. The one people ask about.',
    src: "/photos/potatoes.jpg"
  },
  {
    key: 'beans',
    name: 'Baked Beans',
    weight: '5 lbs',
    note: 'Slow-cooked sweet and smoky, with bits of pork stirred right through.',
    src: "/photos/baked-beans.jpg"
  }]

};

export const CUSTOM_ITEMS = [
{ name: 'Brisket', src: "/photos/brisket-chafer.jpg" },
{ name: 'Ribs', src: "/photos/ribs.jpg" },
{ name: 'Pulled Chicken', src: "/photos/pulled-chicken.jpg" },
{ name: 'Mac & Cheese', src: "/photos/mac-cheese.jpg" },
{ name: 'Green Beans', src: "/photos/green-beans.jpg" },
{ name: 'Smoked Chicken', src: "/photos/smoker.jpg" }];


export const DIFFERENTIATORS = [
{
  title: 'Cooked the day of your event',
  body: 'Your food goes on the smoker in the morning — or most times, the night before — so it is ready fresh when you need it. Not sitting on a counter under a heat lamp. You will never get day-old food from us.'
},
{
  title: 'Have it just like Dad’s',
  body: 'Don’t blow your budget on big-name barbecue. Same smoke, same care, a price that leaves room for the rest of the party.'
},
{
  title: 'You don’t do the work',
  body: 'A prepared tray shows up ready to serve. It feeds twelve. Feeding twenty-four? Order two. That is the whole process.'
},
{
  title: 'Hundreds of neighbors already have',
  body: 'Fifteen years of tailgates, graduations, church suppers, and company picnics across Northwest Ohio. Ask around — somebody you know has eaten it.'
}];


export type GalleryCategory = 'Meats' | 'Sides' | 'Setup';

export const GALLERY_CATEGORIES: GalleryCategory[] = ['Meats', 'Sides', 'Setup'];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
};

export const GALLERY: GalleryItem[] = [
{
  src: "/photos/tailgate-setup.jpg",
  alt: 'A full chafing line set up outdoors at a tailgate with chicken, pulled pork, ribs, sausage, beans and potatoes',
  caption: 'The setup, on site',
  category: 'Setup'
},
{
  src: "/photos/setup-smoker-rig.jpg",
  alt: 'The smoker trailer parked under trees with prep tables and coolers laid out beside it',
  caption: 'The rig, set up and prepping',
  category: 'Setup'
},
{
  src: "/photos/setup-tent.jpg",
  alt: 'A tent with chafing dishes on serving tables set up in a parking lot beside the smoker',
  caption: 'Tent, tables, chafers — on site',
  category: 'Setup'
},
{
  src: "/photos/smoker.jpg",
  alt: 'Racks of smoked chicken filling a full-size smoker',
  caption: 'A full smoker, the morning of',
  category: 'Setup'
},
{
  src: "/photos/brisket.jpg",
  alt: 'Sliced brisket with a dark bark and pink smoke ring on a cutting board',
  caption: 'Brisket, sliced to order',
  category: 'Meats'
},
{
  src: "/photos/pulled-pork-chafer.jpg",
  alt: 'A chafing dish of pulled pork with a chalkboard label',
  caption: 'Pulled pork',
  category: 'Meats'
},
{
  src: "/photos/pulled-chicken.jpg",
  alt: 'A chafing dish of pulled chicken with a chalkboard label',
  caption: 'Pulled chicken',
  category: 'Meats'
},
{
  src: "/photos/brisket-chafer.jpg",
  alt: 'A chafing dish of chopped brisket with a chalkboard label',
  caption: 'Brisket, kept hot',
  category: 'Meats'
},
{
  src: "/photos/ribs.jpg",
  alt: 'Two racks of sauced ribs in a foil tray',
  caption: 'Ribs, sauced and stacked',
  category: 'Meats'
},
{
  src: "/photos/pulled-pork.jpg",
  alt: 'A full pan of hand-pulled pork in a foil tray',
  caption: 'Pork, pulled by hand',
  category: 'Meats'
},
{
  src: "/photos/baked-beans.jpg",
  alt: 'A tray of baked beans in a chafing dish beside dinner rolls',
  caption: 'Baked beans',
  category: 'Sides'
},
{
  src: "/photos/potatoes.jpg",
  alt: 'A tray of seasoned barbecue potatoes with onion',
  caption: 'Barbecue potatoes',
  category: 'Sides'
},
{
  src: "/photos/mac-cheese.jpg",
  alt: 'A chafing dish of macaroni and cheese',
  caption: 'Macaroni & cheese',
  category: 'Sides'
},
{
  src: "/photos/green-beans.jpg",
  alt: 'A chafing dish of seasoned green beans beside macaroni and cheese',
  caption: 'Green beans',
  category: 'Sides'
}];


export const TESTIMONIALS = [
{
  quote:
  'Santos has been catering our event every year at homecoming since 2006, and we consistently get voted best presentation and food. Unbeatable prices, fantastic service. Book him — but don’t try for Homecoming Weekend. He’s ours.',
  name: 'Greg A.',
  detail: 'BGSU Homecoming — every year since 2006'
},
{
  quote:
  'Dad catered for 125 guests and everything was fabulous. We had so many people and I was exhausted, but the one thing I never worried about was the food. What leftovers there were, my son’s baseball team came and finished off at two in the morning. Everyone told me how incredible it was. The sad part is I don’t think I ever ate!',
  name: 'Denise M.',
  detail: '125 guests — full service'
}];


export const AWARD = {
  title: 'Best Barbecue & Tailgate Presentation',
  where: 'Homecoming',
  school: 'BGSU',
  years: '2022 — 2025',
  since: '2007'
};

export const NAV_LINKS = [
{ id: 'bundles', label: 'The Bundle' },
{ id: 'why', label: 'Why Us' },
{ id: 'how', label: 'How It Works' },
{ id: 'photos', label: 'Photos' },
{ id: 'reviews', label: 'Reviews' },
{ id: 'book', label: 'Book' }];


export const BANNER_ITEMS = [
'Game Day Bundle',
'15 lbs of food',
'Feeds 12',
'$200',
'Limited weekend bookings',
'Book early'];

export const DELIVERY = {
  base: 'Hamler, Ohio 43524',
  radius: 30
};

export const BUNDLE_STEPS = [
{
  title: 'Fill out the form',
  body: 'Pick the bundle, how many trays, and your date. Takes about a minute. No payment on the website.'
},
{
  title: 'Dad calls you',
  body: 'He confirms the details, answers anything you are wondering about, and takes payment over the phone. One call, done.'
},
{
  title: 'It shows up on time',
  body: 'Delivered to the address you gave us, on your date, ready to put straight on the table.'
}];


export const BUNDLE_INCLUDES = [
'Food sealed in pans, hot and ready to serve',
'A dining setting for twelve',
'Basic flatware and plates included'];


export const PARTY_STEPS = [
{
  title: 'Give Dad a call',
  body: 'No event is too small. Twelve people or two hundred — he will talk it through with you either way.'
},
{
  title: 'Build it to your budget',
  body: 'Work out the food and the service level together. Dad tells you straight what fits your number and your timeline.'
},
{
  title: 'Book your date',
  body: 'Pay and go on Dad’s calendar. Your date is held, and your event gets catered on time and in full.'
}];


export const SERVICE_LEVELS = [
{
  key: 'dropoff',
  name: 'Drop-off',
  tag: 'Simplest',
  body: 'Food arrives in sealed pans, in bulk, ready to serve. You handle the table. This is what the bundle is.',
  note: 'Included'
},
{
  key: 'setup',
  name: 'In-person setup',
  tag: 'Most popular',
  body: 'Dad arrives and sets the whole line up — chafers, labels, serving spoons, the presentation you have seen at the tailgates.',
  note: 'Quoted with your order'
},
{
  key: 'onsite',
  name: 'On-site cook',
  tag: 'The full show',
  body: 'The smoker comes to you and the food is cooked live at your event. People come stand around it. It is the whole experience.',
  note: '100+ guests, additional fee'
}];


export const SEASON_NOTE = 'Graduation season and home game weekends book up first. If your date lands in May or in the fall, call early — Dad only takes so many events a weekend.';