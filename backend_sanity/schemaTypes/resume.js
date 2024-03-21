// resume.js

export default {
    name: 'resume',
    title: 'Resume',
    type: 'document',
    fields: [
      {
        name: 'file',
        title: 'Resume File',
        type: 'file',
        description: 'Upload the resume file',
        options: {
          accept: '.pdf',
        },
      },
    ],
    preview: {
      select: {
        file: 'file',
      },
      prepare(selection) {
        return {
          title: 'Resume',
          media: selection.file,
        };
      },
    },
  }
  