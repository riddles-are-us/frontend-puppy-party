export default {
    name: 'season',
    title: 'season',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        description: 'Enter the name',
      },
      {
        name: 'seasonEndDate',
        title: 'Season end date',
        type: 'datetime',
      },
      {
        name: 'isCurrentSeason',
        title: 'Current season',
        type: 'boolean',
      },
      {
        name: 'isPreviousSeason',
        title: 'Previous season',
        type: 'boolean',
      },
      {
        name: 'memes',
        title: 'Memes',
        type: 'array',
        of: [{type: 'reference', to: {type: 'meme'}}],
      },
    ],
  };