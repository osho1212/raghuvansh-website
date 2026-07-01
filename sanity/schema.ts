import { type SchemaTypeDefinition } from 'sanity'

const production: SchemaTypeDefinition = {
  name: 'production',
  title: 'Production',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'synopsis',
      title: 'Synopsis',
      type: 'text',
    },
    {
      name: 'director',
      title: 'Director',
      type: 'string',
    }
  ],
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [production],
}
