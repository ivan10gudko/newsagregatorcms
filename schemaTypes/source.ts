import { defineField, defineType } from 'sanity'
import { NewsSourceSelect } from '../components/NewsSourceSelect'
import { isUniqueSource } from '../validators/isUniqueSource'
import { EarthGlobeIcon } from '@sanity/icons';

export default defineType({
  name: 'source',
  title: 'Allowed Source',
  type: 'document',
  icon: EarthGlobeIcon,
  description: 'Select an official news provider to fetch headlines from.',
  fields: [
    defineField({
      name: 'sourceData',
      title: 'Select Source from API',
      type: 'object',
      components: {
        input: NewsSourceSelect,
      },
      fields: [
        defineField({ name: 'id', type: 'string' }),
        defineField({ name: 'name', type: 'string' }),
      ],

      validation: (Rule) => Rule.required().custom(isUniqueSource),
    }),
  ],
  preview: {
    select: {
      title: 'sourceData.name',
      subtitle: 'sourceData.id',
    },
  },
})