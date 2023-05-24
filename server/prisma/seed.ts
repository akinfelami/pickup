import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      about: 'I am a software developer',
      avatar: 'https://example.com/avatar.jpg',
      active: true,
      verified: false,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      about: 'I am a hooper',
      avatar: 'https://example.com/avatar.jpg',
      active: true,
      verified: false,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'user3@example.com',
      firstName: 'Nett',
      lastName: 'Doe',
      username: 'nettdoe',
      about: 'I am a baller',
      avatar: 'https://example.com/avatar.jpg',
      active: true,
      verified: false,
    },
  });


  const event1 = await prisma.event.create({
    data: {
      title: 'Event 1',
      eventImage: 'https://example.com/event1.jpg',
      spots: 100,
      photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
      fee: 10,
      description: 'This is event 1',
      tags: ['tag1', 'tag2'],
      eventLink: 'https://example.com/event1',
      startTime: new Date('2022-01-01T00:00:00Z'),
      endTime: new Date('2022-01-01T01:00:00Z'),
      status: 'Upcoming',
      location: 'New York',
      ownerId: user1.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
        title: 'Event 2',
        eventImage: 'https://example.com/event2.jpg',
        spots: 50,
        photos: ['https://example.com/photo3.jpg', 'https://example.com/photo4.jpg'],
        fee: 20,
        description: 'This is event 2',
        tags: ['tag3', 'tag4'],
        eventLink: 'https://example.com/event2',
        startTime: new Date('2022-02-01T00:00:00Z'),
        endTime: new Date('2022-02-01T01:00:00Z'),
        status: 'Upcoming',
        location: 'New York',
        ownerId: user2.id,
    },
    });

    const event3 = await prisma.event.create({
        data: {
            title: 'Event 3',
            eventImage: 'https://example.com/event3.jpg',
            spots: 50,
            photos: ['https://example.com/photo5.jpg', 'https://example.com/photo6.jpg'],
            fee: 20,
            description: 'This is event 3',
            tags: ['tag5', 'tag6'],
            eventLink: 'https://example.com/event3',
            startTime: new Date('2022-02-01T00:00:00Z'),
            endTime: new Date('2022-02-01T01:00:00Z'),
            status: 'Upcoming',
            location: 'New York',
            ownerId: user2.id,
        },
    });
    

    const event4 = await prisma.event.create({
        data: {
            title: 'Event 4',
            eventImage: 'https://example.com/event4.jpg',
            spots: 50,
            photos: ['https://example.com/photo7.jpg', 'https://example.com/photo8.jpg'],
            fee: 20,
            description: 'This is event 4',
            tags: ['tag7', 'tag8'],
            eventLink: 'https://example.com/event4',
            startTime: new Date('2022-02-01T00:00:00Z'),
            endTime: new Date('2022-02-01T01:00:00Z'),
            status: 'Upcoming',
            location: 'New York',
            ownerId: user2.id,
        },
    });

    const event5 = await prisma.event.create({
        data: {
            title: 'Event 5',
            eventImage: 'https://example.com/event5.jpg',
            spots: 50,
            photos: ['https://example.com/photo9.jpg', 'https://example.com/photo10.jpg'],
            fee: 20,
            description: 'This is event 5',
            tags: ['tag9', 'tag10'],
            eventLink: 'https://example.com/event5',
            startTime: new Date('2022-02-01T00:00:00Z'),
            endTime: new Date('2022-02-01T01:00:00Z'),
            status: 'Upcoming',
            location: 'New York',
            ownerId: user1.id,
        },
    });

    const event6 = await prisma.event.create({
        data: {
            title: 'Event 6',
            eventImage: 'https://example.com/event6.jpg',
            spots: 50,
            photos: ['https://example.com/photo11.jpg', 'https://example.com/photo12.jpg'],
            fee: 20,
            description: 'This is event 6',
            tags: ['tag11', 'tag12'],
            eventLink: 'https://example.com/event6',
            startTime: new Date('2022-02-01T00:00:00Z'),
            endTime: new Date('2022-02-01T01:00:00Z'),
            status: 'Upcoming',
            location: 'New York',
            ownerId: user3.id,
        },
    });


    //  event with different location
    const event7 = await prisma.event.create({
        data: {
            title: 'Event 7',
            eventImage: 'https://example.com/event7.jpg',
            spots: 50,
            photos: ['https://example.com/photo13.jpg', 'https://example.com/photo14.jpg'],
            fee: 20,
            description: 'This is event 7',
            tags: ['tag13', 'tag14'],
            eventLink: 'https://example.com/event7',
            startTime: new Date('2022-02-01T00:00:00Z'),
            endTime: new Date('2022-02-01T01:00:00Z'),
            status: 'Upcoming',
            location: 'London',
            ownerId: user3.id,
        },
    });

    // event with different location
    const event8 = await prisma.event.create({
        data: {
            title: 'Event 8',
            eventImage: 'https://example.com/event8.jpg',
            spots: 50,
            photos: ['https://example.com/photo15.jpg', 'https://example.com/photo16.jpg'],
            fee: 20,
            description: 'This is event 8',
            tags: ['tag15', 'tag16'],
            eventLink: 'https://example.com/event8',
            startTime: new Date('2022-02-01T00:00:00Z'),
            endTime: new Date('2022-02-01T01:00:00Z'),
            status: 'Upcoming',
            location: 'London',
            ownerId: user1.id,
        },
    });

    //event with different onwer
    const event9 = await prisma.event.create({
        data: {
            title: 'Event 9',
            eventImage: 'https://example.com/event9.jpg',
            spots: 50,
            photos: ['https://example.com/photo17.jpg', 'https://example.com/photo18.jpg'],
            fee: 20,
            description: 'This is event 9',
            tags: ['tag17', 'tag18'],
            eventLink: 'https://example.com/event9',
            startTime: new Date('2022-02-01T00:00:00Z'),
            endTime: new Date('2022-02-01T01:00:00Z'),
            status: 'Upcoming',
            location: 'London',
            ownerId: user3.id,
        },
    });

}

main()

