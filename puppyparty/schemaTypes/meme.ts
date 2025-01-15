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
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
      },
      {
        title: 'index',
        name: 'index',
        type: 'number'
      },
      {
        title: 'animationIndex',
        name: 'animationIndex',
        type: 'number'
      }
    ],
  };