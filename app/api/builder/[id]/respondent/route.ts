const result = {
  id: '1e348e47-771c-45f3-ae15-393ee0b86ea5',
  sections: [
    {
      id: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
      formId: '1e348e47-771c-45f3-ae15-393ee0b86ea5',
      title: 'Section 1',
      order: 0,
      elements: [
        {
          id: '1a0a0411-69b0-470a-8ed7-eb6d1d8a966a',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'title',
          isDescription: true,
          order: 0,
          title: {
            id: '330310fc-8632-4822-abb3-2c7a4d2712bb',
            elementId: '1a0a0411-69b0-470a-8ed7-eb6d1d8a966a',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'heading',
                  attrs: {
                    level: 1,
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'Ini form title',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: '2b8881ff-7f33-4bc7-804c-e913415113e8',
            elementId: '1a0a0411-69b0-470a-8ed7-eb6d1d8a966a',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Bold',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'italic ',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'undeline',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://google.com',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: null,
                          },
                        },
                        {
                          type: 'underline',
                        },
                      ],
                      text: 'link',
                    },
                  ],
                },
                {
                  type: 'orderedList',
                  attrs: {
                    start: 1,
                  },
                  content: [
                    {
                      type: 'listItem',
                      content: [
                        {
                          type: 'paragraph',
                          content: [
                            {
                              type: 'text',
                              text: 'tes',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'bulletList',
                  content: [
                    {
                      type: 'listItem',
                      content: [
                        {
                          type: 'paragraph',
                          content: [
                            {
                              type: 'text',
                              text: 'sss',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          id: '1e7a30f9-060b-406e-a5dd-1fc2d584993d',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 1,
          question: {
            id: '816a33e4-cb8c-4e77-b196-3cbfaa61bca5',
            elementId: '1e7a30f9-060b-406e-a5dd-1fc2d584993d',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah ini?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: '9a68201a-3551-46ee-92d2-ecfaf678be5e',
            elementId: '1e7a30f9-060b-406e-a5dd-1fc2d584993d',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          image: {
            width: 500,
            height: 250,
            align: 'left',
            source: 'https://placehold.co/500x250.png',
            caption: 'Test',
          },
          answer: {
            id: 'b97b87dc-0c3d-44eb-a6f5-b77ead67ed78',
            elementId: '1e7a30f9-060b-406e-a5dd-1fc2d584993d',
            type: 'short-answer',
            input: 'text',
            value: '',
            validation: [
              {
                type: 'text',
                rule: 'required',
                value: false,
                customError: null,
              },
            ],
          },
        },
        {
          id: '9aaec2f9-c6c8-4a14-b873-8a16857d2cf3',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 2,
          question: {
            id: 'f68a5ded-445f-4362-aae9-5fc9b4d0952a',
            elementId: '9aaec2f9-c6c8-4a14-b873-8a16857d2cf3',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: 'dcf15e6b-d521-4324-9684-7199631dc167',
            elementId: '9aaec2f9-c6c8-4a14-b873-8a16857d2cf3',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: 'acb34af5-7f93-4712-a959-23af648c80b0',
            elementId: '9aaec2f9-c6c8-4a14-b873-8a16857d2cf3',
            type: 'short-answer',
            input: 'number',
            value: '',
            validation: [
              {
                type: 'number',
                rule: 'required',
                value: true,
                customError: null,
              },
              {
                type: 'number',
                rule: 'positiveNumber',
                value: true,
                customError: null,
              },
              {
                type: 'number',
                rule: 'maxDecimalPlaces',
                value: '2',
                customError: null,
              },
              {
                type: 'number',
                rule: 'greaterThan',
                value: '5',
                customError: null,
              },
              {
                type: 'number',
                rule: 'lessThan',
                value: '10',
                customError: null,
              },
            ],
          },
        },
        {
          id: 'bde4880d-b2d7-4771-ac5b-7b419ba2174f',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 3,
          question: {
            id: '10084cb5-f0b1-4ed4-a317-697d855822af',
            elementId: 'bde4880d-b2d7-4771-ac5b-7b419ba2174f',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: '10084cb5-f0b1-4ed4-a317-697d855822ag',
            elementId: 'bde4880d-b2d7-4771-ac5b-7b419ba2174f',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: '10084cb5-f0b1-4ed4-a317-697d855822ah',
            elementId: 'bde4880d-b2d7-4771-ac5b-7b419ba2174f',
            type: 'short-answer',
            input: 'text',
            value: '',
            validation: [
              {
                type: 'text',
                rule: 'required',
                value: true,
                customError: null,
              },
            ],
          },
        },
        {
          id: 'e30aa20e-22c1-48e7-991e-4dc3737bb3a4',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 4,
          question: {
            id: '272ce5fe-13eb-45a2-baed-6e945371f1f1',
            elementId: 'e30aa20e-22c1-48e7-991e-4dc3737bb3a4',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: '272ce5fe-13eb-45a2-baed-6e945371f1f2',
            elementId: 'e30aa20e-22c1-48e7-991e-4dc3737bb3a4',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: '272ce5fe-13eb-45a2-baed-6e945371f1f3',
            elementId: 'e30aa20e-22c1-48e7-991e-4dc3737bb3a4',
            type: 'long-answer',
            value: '',
            validation: [
              {
                type: 'text',
                rule: 'required',
                value: true,
                customError: null,
              },
            ],
          },
        },
        {
          id: 'f7232eeb-bba1-4428-9694-02b6dd6dfb02',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 5,
          question: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd04e1',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb02',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd04e2',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb02',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd04e3',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb02',
            type: 'multiple-choice',
            option: {
              type: 'manual',
              items: [
                { value: 'Option 1', label: 'Option 1', order: 0 },
                { value: 'Option 2', label: 'Option 2', order: 1 },
                { value: 'other', label: 'Other', order: 2 },
              ],
            },
            value: null,
            validation: [
              {
                type: 'multiple-choice',
                rule: 'required',
                value: true,
                customError: null,
              },
            ],
          },
        },
        {
          id: 'f7232eeb-bba1-4428-9694-02b6dd6dfb80',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 8,
          question: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd0481',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb80',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd0482',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb80',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd0483',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb80',
            type: 'multiple-choice',
            option: {
              type: 'database',
              source: {
                table: 'fruit',
                value: 'code',
                label: 'name',
              },
            },
            value: null,
            validation: [
              {
                type: 'multiple-choice',
                rule: 'required',
                value: true,
                customError: null,
              },
            ],
          },
        },
        {
          id: 'f1fe0393-f95e-425c-9abb-ae996298cd97',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 6,
          question: {
            id: 'c6212aac-a7da-4559-9917-2e838286fde1',
            elementId: 'f1fe0393-f95e-425c-9abb-ae996298cd97',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: 'c6212aac-a7da-4559-9917-2e838286fde2',
            elementId: 'f1fe0393-f95e-425c-9abb-ae996298cd97',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: 'c6212aac-a7da-4559-9917-2e838286fde3',
            elementId: 'f1fe0393-f95e-425c-9abb-ae996298cd97',
            type: 'checkboxes',
            option: {
              type: 'manual',
              items: [
                { value: 'Option 1', label: 'Option 1', order: 0 },
                { value: 'Option 2', label: 'Option 2', order: 1 },
                { value: 'other', label: 'Other', order: 2 },
              ],
            },
            value: null,
            validation: [
              {
                type: 'checkbox',
                rule: 'required',
                value: true,
                customError: null,
              },
              {
                type: 'checkbox',
                rule: 'selectAtLeash',
                value: 2,
                customError: null,
              },
            ],
          },
        },
        {
          id: 'f1fe0393-f95e-425c-9abb-ae996298cd70',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 7,
          question: {
            id: 'c6212aac-a7da-4559-9917-2e838286fd71',
            elementId: 'f1fe0393-f95e-425c-9abb-ae996298cd70',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: 'c6212aac-a7da-4559-9917-2e838286fd72',
            elementId: 'f1fe0393-f95e-425c-9abb-ae996298cd70',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: 'c6212aac-a7da-4559-9917-2e838286fd73',
            elementId: 'f1fe0393-f95e-425c-9abb-ae996298cd70',
            type: 'date-picker',
            value: '',
            validation: [
              {
                type: 'text',
                rule: 'required',
                value: true,
                customError: null,
              },
            ],
          },
        },
        {
          id: 'f7232eeb-bba1-4428-9694-02b6dd6dfb90',
          sectionId: '1926accb-2d16-46d3-95aa-cc7ffe94657d',
          type: 'question',
          isDescription: true,
          order: 9,
          question: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd0491',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb90',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Apakah?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd0492',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb90',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: '5fa1e1ed-cab1-4d25-ba8a-7bf23ecd0493',
            elementId: 'f7232eeb-bba1-4428-9694-02b6dd6dfb90',
            type: 'checkboxes',
            option: {
              type: 'database',
              source: {
                table: 'fruit',
                value: 'code',
                label: 'name',
              },
            },
            value: null,
            validation: [
              {
                type: 'checkbox',
                rule: 'required',
                value: true,
                customError: null,
              },
            ],
          },
        },
      ],
    },
    {
      id: '32a46a36-04da-4b75-a0f5-c9471055a882',
      formId: '1e348e47-771c-45f3-ae15-393ee0b86ea5',
      title: 'Section 2',
      order: 0,
      elements: [
        {
          id: 'fb59813c-2a97-4637-bf15-0c4981a60fd5',
          sectionId: '32a46a36-04da-4b75-a0f5-c9471055a882',
          type: 'title',
          isDescription: false,
          order: 0,
          title: {
            id: 'f29d1fae-5d81-4c2a-a61d-7600b53609bc',
            elementId: 'fb59813c-2a97-4637-bf15-0c4981a60fd5',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'heading',
                  attrs: {
                    level: 1,
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'Untitled form',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: 'f28864a7-1783-461b-9e3d-1a88ef2a841c',
            elementId: 'fb59813c-2a97-4637-bf15-0c4981a60fd5',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          id: '33228d0a-e3f6-4326-893d-b2a28574e5c4',
          sectionId: '32a46a36-04da-4b75-a0f5-c9471055a882',
          type: 'question',
          isDescription: true,
          order: 1,
          question: {
            id: '428d9858-d548-4976-b44e-7d33ecda8df5',
            elementId: '33228d0a-e3f6-4326-893d-b2a28574e5c4',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Bagaimane?',
                    },
                  ],
                },
              ],
            },
          },
          description: {
            id: 'be71b389-6f0d-41d0-a459-9ca50cfc1579',
            elementId: '33228d0a-e3f6-4326-893d-b2a28574e5c4',
            value: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Ini question description section2',
                    },
                  ],
                },
              ],
            },
          },
          answer: {
            id: '15df1cf4-64fe-475a-b7ba-54833dbc9698',
            elementId: '33228d0a-e3f6-4326-893d-b2a28574e5c4',
            type: 'short-answer',
            input: 'number',
            value: '',
            validation: [
              {
                type: 'number',
                rule: 'required',
                value: true,
                customError: null,
              },
              {
                type: 'number',
                required: false,
                rule: 'greaterThan',
                value: '5',
                customError: 'Custom error message',
              },
            ],
          },
        },
      ],
    },
  ],
};

export async function GET() {
  return Response.json(result);
}

export async function PUT(request: Request) {
  const res = await request.json();
  return Response.json(res);
}
