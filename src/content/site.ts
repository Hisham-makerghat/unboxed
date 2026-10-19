// Every word on the page lives here, copied from Tab 5 of the concept note.
// Change copy, links or event details in this file only.

export const links = {
  // Swap for the Luma event page once it exists
  register: 'https://forms.gle/Hh5Pj9byRD6z1Pcm8',
  questionsEmail: 'jayashree@makerghat.org',
  makerghat: 'https://makerghat.org',
  shikshagraha: 'https://shikshagraha.org',
  socials: [
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/makerghat' },
    { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com/@makerghat9609' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/makerghat' },
  ],
} as const;

export const event = {
  name: 'UNBOXED',
  title: 'Reimagining STEM Education',
  eyebrow: 'An experiential pop-up by MakerGhat',
  // Machine-readable times for search engines (IST)
  start: '2026-12-12T09:00:00+05:30',
  end: '2026-12-12T17:00:00+05:30',
  dateShort: '12 Dec 2026',
  dateLong: '12 December 2026',
  day: 'Saturday',
  time: '9 AM – 5 PM',
  venue: 'TUMO Mumbai, Shikha Academy',
  venueShort: 'TUMO Mumbai',
  city: 'Mumbai',
} as const;

export const meta = {
  title: 'UNBOXED · Reimagining STEM Education · 12 Dec 2026, Mumbai',
  description:
    'An experiential pop-up by MakerGhat. Walk into the classrooms of the future: 12 December 2026, 9 AM – 5 PM, TUMO Mumbai, Shikha Academy. Register for UNBOXED.',
};

export const intro = {
  title: "Ready to unbox what's possible?",
  boxLabel: 'Open the box to see the UNBOXED event details',
  click: 'Click to unbox',
  tap: 'Tap to unbox',
  skip: 'Skip to event details',
  classroomAlt: 'A traditional classroom with rows of benches facing a blackboard',
};

export const hero = {
  register: 'Register for UNBOXED',
  explore: "See what's inside",
};

export const classrooms = {
  title: 'Walk into the classrooms of the future.',
  lead: 'Step into UNBOXED, a space to rediscover our sense of wonder in the world and rekindle interest in learning and teaching. Experiment with ideas, take on challenges, and discover STEM education in ways you may never have experienced before.',
  body: [
    'Explore classrooms that bring MakerGhat’s vision to life: spaces designed for creative thinking, play, experimentation and even failure. See how the classroom itself can shape how children learn, engage in hands-on learning experiences, and meet young agents of change who show what’s possible when children get to ask questions and learn by doing.',
    'Built from simple and affordable materials, every experience at UNBOXED is one that any school or community could recreate.',
  ],
  callout:
    'Come for an hour, or stay for the day, and leave with ideas you can take back to your own classroom, home, or organisation.',
  photoAlt: 'A student folding paper to build a model',
};

export const why = {
  title: 'Why UNBOXED?',
  lead: 'More children in India are in school than ever before, but many are not learning as much as they could. Meanwhile, the world they are growing up in is changing fast, shaped by AI and a climate crisis. Young people are entering an uncertain world that will reward curiosity, problem-solving, and the confidence to try, fail, and try again.',
  leadEmphasis: 'These are exactly the skills rote learning leaves out.',
  silos:
    'Educators, schools, organisations, government actors, and communities across India are already finding ways to change this, but this work often happens in silos. Building a culture of learning by doing cannot be the work of one organisation alone.',
  ecosystem: 'It takes an ecosystem.',
  together:
    'UNBOXED brings these people and ideas together in one space, and invites all of us to break out of our boxes, experience each other’s work, share what we’re learning, and imagine what STEM education could look like if we worked towards it together.',
};

export const journey = {
  title: 'Your journey through UnboxEd',
  // The theme name is emphasised inside the sentence
  themeBefore:
    'Everything around us, from a raindrop to a city, is built from smaller pieces. This year, the theme for UnboxEd is ',
  theme: 'Building Blocks',
  themeAfter:
    '. We will explore the units of matter, how nature and people build the world, and what that means for the planet we share. Along the way, we’ll look at the building blocks of learning itself: curiosity, questions, tinkering, failure, and collaboration.',
  rooms: [
    {
      number: '01',
      name: 'Origins',
      tagline: 'It all starts with the smallest building blocks.',
      body: 'From atoms and molecules to the world around us, discover what things are made of, how they work, and what connects them. Start with the smallest building blocks and explore the big questions that help us make sense of our world, and the growing climate crisis.',
    },
    {
      number: '02',
      name: 'Grow & Build',
      tagline: 'Take the building blocks and see what you can make.',
      bodyLabel: 'Your challenge:',
      body: 'build a satellite that can help protect Earth’s forests and atmosphere. Drop into hands-on labs to test rocket fuels, look at leaf cells through paper microscopes, code your satellite’s sensor, and plan a city that lives alongside its forests. Then join a mission crew and launch your rocket head-to-head with another team.',
    },
    {
      number: '03',
      name: 'Futures in the Making',
      tagline: 'What will you build with what you know?',
      body: 'Explore ideas from young innovators, imagine the world you want to live in, and add your own commitment to a shared constellation of action.',
    },
  ],
};

export const vision = {
  text: 'Our vision is an India where every child learns by doing.',
  photoAlt: 'Three students looking up in wonder',
};

export const cta = {
  title: "Ready to unbox what's possible?",
  button: 'Register NOW',
  questions: 'For any questions, write to',
};

export const footer = {
  licence: 'MakerGhat and its assets are licensed under',
  licenceName: 'CC BY-SA 4.0',
};
