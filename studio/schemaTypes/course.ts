export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string'
    },
    {
      name: 'color',
      title: 'Color (hex)',
      type: 'string'
    },
    {
      name: 'orderIndex',
      title: 'Order',
      type: 'number'
    }
  ]
}