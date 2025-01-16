export default {
    name: 'meme',
    title: 'meme',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        description: 'Enter the name',
      },
      {
        name: 'avatar',
        title: 'Avatar',
        type: 'image',
      },
      {
        name: 'spriteSheet',
        title: 'Sprite Sheet',
        type: 'image',
      }
    ],
  };