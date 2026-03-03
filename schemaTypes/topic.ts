import { defineField, defineType } from 'sanity'
import { isUniqueTopic } from '../validators/isUniqueTopic'
import { HashIcon } from '@sanity/icons'

export default defineType({
    name: 'topic',
    title: 'Topic Definition',
    type: 'document',
    icon: HashIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Topic Name',
            type: 'string',
            description: 'The name of the topic (e.g., Technology, Sports, Politics)',
            validation: (Rule) => Rule.required().custom(isUniqueTopic),
        }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [
                { type: 'string',
                    validation: (Rule) => Rule.required().min(2).error('Keyword can\'t be empty')
                }],
            description: 'Words to search for in news titles (e.g., apple, react, frontend)',
            validation: (Rule) => Rule
                .required()
                .min(1).error('You must add at least one keyword.') 
                .unique().error('Keywords must be unique.'),
        })
    ],
})