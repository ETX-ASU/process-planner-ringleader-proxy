export const mockPlannerData = [
  {
    permissions: {
      canEditStructure: false,
      canEditContent: false,
      canEditTab: false,
      canDelete: false,
      canChangeDescription: false,
    },
    title: "Experiment Details",
    content: {
      paneSize: 50,
      description:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac pharetra augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla nulla nibh, imperdiet sed nulla ac, semper aliquam felis. Vestibulum ut imperdiet libero. Morbi semper bibendum nulla, quis aliquet lorem ornare pharetra. Sed vel nunc accumsan, pellentesque lacus congue, vestibulum neque. Duis cursus, nisl at vehicula pellentesque, nibh urna lacinia ligula, vitae aliquet lacus nunc congue sapien. Integer vitae erat ut metus fermentum mollis. Nam egestas ullamcorper porta. Donec finibus est eu velit sagittis facilisis nec quis odio. Sed sed velit congue, mattis quam quis, vehicula lectus. Donec et accumsan orci, non mattis tortor. Ut ultrices facilisis sodales. Proin ornare dictum mauris, vitae pellentesque ex euismod vel. Cras arcu massa, cursus vel mattis nec, pulvinar at ante. Proin rutrum urna ac accumsan pulvinar.</p>\n",
      sections: [
        {
          type: "text",
          title: "Make observations",
          text:
            "These observations should be objective, not subjective. In other words, the observations should be capable of verification by other scientists. Subjective observations, which are based on personal opinions and beliefs, are not in the realm of science. Here’s an objective statement: It is 58 °F in this room. Here’s a subjective statement: It is cool in this room.\n\nThe first step in the Scientific Method is to make objective observations. These observations are based on specific events that have already happened and can be verified by others as true or false.",
          items: [],
          id: "2ed737dd-58b3-4151-8a3e-7c884b74c392",
        },
        {
          type: "checklist",
          title: "Form a hypothesis",
          text: "",
          items: [
            {
              id: "6f10d112-c2fd-4974-94df-ca23a87bdc8b",
              label:
                "It should be a general principle that holds across space and time",
              done: true,
            },
            {
              id: "533e1244-69fc-4930-9454-a4ae426d06b8",
              label: "It should be a tentative idea",
              done: true,
            },
            {
              id: "5e54d9ea-cfe5-45de-a7c9-47cb41f534f3",
              label: "It should agree with available observations",
              done: true,
            },
            {
              id: "db61abdc-60a8-42cc-84cf-a54e125c09a8",
              label: "It should be kept as simple as possible",
              done: true,
            },
            {
              id: "ef8cb876-7bc4-4d16-98ce-6b9c7dde0b9e",
              label: "It should be testable and potentially falsifiable",
              done: true,
            },
          ],
          id: "109946ba-768a-4721-bf7f-831d8dbb3f4e",
        },
      ],
    },
    id: "52334f95-bf40-4742-a4ae-196d024efa3b",
  },
  {
    permissions: {
      canEditStructure: false,
      canEditContent: false,
      canEditTab: false,
      canDelete: false,
      canChangeDescription: false,
    },
    title: "Conclusion",
    content: {
      paneSize: 50,
      description:
        "<p>Quisque lorem nulla, sodales sed nisl eget, fermentum faucibus neque. Curabitur tellus nunc, facilisis condimentum nunc id, aliquet elementum risus. Donec a turpis at purus malesuada scelerisque vitae eu ante. Mauris eget massa ut risus ullamcorper ultrices. Pellentesque lacinia, dui id sagittis ultricies, est dui tincidunt quam, ut facilisis sapien lectus sit amet dui. Donec interdum ipsum a feugiat dapibus. Vestibulum tempor ligula nisi, eu semper justo consectetur in. Proin ac porttitor nunc. Phasellus mi nisi, rutrum eget aliquet eu, laoreet vitae velit. In eleifend luctus pulvinar. Vestibulum in ex a odio iaculis fringilla. Vestibulum sit amet leo vel erat dictum interdum.</p>\n",
      sections: [
        {
          type: "text",
          title: "Reflection",
          text:
            "From our analysis of the experiment, we have two possible outcomes: the results agree with the prediction or they disagree with the prediction. In our case, we can reject our prediction of no effect of Celebra. Because the prediction is wrong, we must also reject the hypothesis it was based on.",
          items: [],
          id: "290cc150-4545-4eb8-b0cc-40de0fd92829",
        },
      ],
    },
    id: "6dff809a-a46d-4e88-9a22-e579a3e042d5",
  },
];

export const mockPlannerInfo = {
  canAddTab: false,
  title: "Read only assignment",
  dueDate: Date.now() - 24 * 3.5 * 3600 * 1000,
  description:
    "This is read-only assignment. The due date has already passed and you cannot edit anything.",
};

export const mockReadOnlyPlanner = {
  plannerData: mockPlannerData,
  info: mockPlannerInfo,
  activeTab: 0,
};
