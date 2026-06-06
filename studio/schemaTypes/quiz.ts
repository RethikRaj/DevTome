export default {
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  fields: [
    {
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{ type: 'article' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Question Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Multiple Choice', value: 'mcq' },
                  { title: 'True / False', value: 'truefalse' },
                  { title: 'Code Snippet', value: 'code' }
                ]
              }
            },
            {
              name: 'question',
              title: 'Question',
              type: 'text'
            },
            {
              name: 'options',
              title: 'Options (for MCQ)',
              type: 'array',
              of: [{ type: 'string' }]
            },
            {
              name: 'correctAnswer',
              title: 'Correct Answer',
              type: 'string'
            },
            {
              name: 'explanation',
              title: 'Explanation',
              type: 'text'
            }
          ]
        }
      ]
    }
  ]
}