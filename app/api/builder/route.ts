const result = {
  id: '1e348e47-771c-45f3-ae15-393ee0b86ea5',
  status: 'draft',
  sections: [
    {
      id: 'sec-jasdh',
      isDescription: true,
      // elements: [
      //   {
      //     id: 'elm-cbdnh',
      //     type: 'title',
      //     title: {
      //       type: 'doc',
      //       content: [
      //         {
      //           type: 'heading',
      //           attrs: {
      //             level: 1,
      //           },
      //           content: [
      //             {
      //               type: 'text',
      //               text: 'Untitled form',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     description: {
      //       type: 'doc',
      //       content: [
      //         {
      //           type: 'paragraph',
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     id: 'elm-aosid',
      //     type: 'question',
      //   },
      // ],
    },
    {
      id: 'sec-kjsdf',
      isDescription: true,
      // elements: [
      //   {
      //     id: 'element-ajsdh',
      //     type: 'title',
      //     title: {
      //       type: 'doc',
      //       content: [
      //         {
      //           type: 'heading',
      //           attrs: {
      //             level: 1,
      //           },
      //           content: [
      //             {
      //               type: 'text',
      //               text: 'Untitled form',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     description: {
      //       type: 'doc',
      //       content: [
      //         {
      //           type: 'paragraph',
      //         },
      //       ],
      //     },
      //   },
      // ],
    },
  ],
};

export async function GET() {
  return Response.json(result);
}

export async function PATCH(request: Request) {
  const res = await request.json();

  // const data = {
  //   result,
  //   ...res,
  // };

  return Response.json(res);
}
