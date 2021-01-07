export const mockPlannerData = [
  {
    permissions: {
      canChangeDescription: false,
      canEditStructure: false,
      canEditContent: false,
      canEditTab: false,
      canDelete: false,
    },
    id: "08242539-0714-4e98-a87c-659b4fa6e82a",
    title: "Read-Only Tab",
    content: {
      paneSize: 50,
      sections: [
        {
          id: "004bd378-0723-4052-8576-e56dcf64c48b",
          title: "Quantitive Observations",
          type: "text",
          text: "Lorem ipsum dolor sit amet",
        },
        {
          id: "515be7a9-791b-4019-add1-136356cb1281",
          title: "Initial Checklist",
          type: "checklist",
          items: [
            {
              id: "7074b2b1-7d03-4543-bfb7-fb2c8255135b",
              label: "Drink coffee",
              done: true,
            },
            {
              id: "bd1f8b00-43be-49f9-ad5f-d77f6489d431",
              label: "Finish this section",
              done: false,
            },
          ],
        },
      ],
      description:
        "<p>This tab is read-only.</p><p>You cannot change anything here.</p>",
    },
  },
  {
    permissions: {
      canChangeDescription: false,
      canEditStructure: false,
      canEditContent: true,
      canEditTab: true,
      canDelete: false,
    },
    id: "105c1c47-f40c-4ab9-a7df-f6895f6c0018",
    title: "Design",
    content: {
      paneSize: 70,
      sections: [
        {
          id: "004bd378-0723-4052-8576-e56dcf64c48b",
          title: "Quantitive Observations",
          type: "text",
          text: "Lorem ipsum dolor sit amet",
        },
        {
          id: "515be7a9-791b-4019-add1-136356cb1281",
          title: "Experiment Steps",
          type: "checklist",
          items: [
            {
              id: "7074b2b1-7d03-4543-bfb7-fb2c8255135b",
              label: "Make an observation",
              done: true,
            },
            {
              id: "bd1f8b00-43be-49f9-ad5f-d77f6489d431",
              label: "Ask a question",
              done: false,
            },
            {
              id: "5b895403-e8b0-4daf-9966-bc178cb1743e",
              label: "Form a hypothesis, or testable explanation",
              done: false,
            },
            {
              id: "a9232b89-1ce0-428d-a136-f3658af4ef2e",
              label: "Make a prediction based on the hypothesis",
              done: false,
            },
            {
              id: "0ce8b426-3e11-4b2f-9c9f-88cae16a50dc",
              label: "Test the prediction",
              done: false,
            },
            {
              id: "2c7ddb90-e070-4b76-9dba-c70d6fc0b4c1",
              label:
                "Iterate: use the results to make new hypotheses or predictions",
              done: false,
            },
          ],
        },
      ],
      description:
        "<p>This tab is predefined by the teacher and you cannot change its structure or description (this text). You can still update content of the text sections and checklists.</p>",
    },
  },
  {
    permissions: {
      canChangeDescription: true,
      canEditStructure: true,
      canEditContent: true,
      canEditTab: true,
      canDelete: false,
    },
    id: "2f340aa6-18a1-460d-a342-19cc1378d71c",
    title: "Collect Data",
    content: {
      paneSize: 50,
      sections: [
        {
          id: "004bd378-0723-4052-8576-e56dcf64c48b",
          title: "Quantitive Observations",
          type: "text",
          text: "Lorem ipsum dolor sit amet",
        },
      ],
      description:
        "<p>This is regular tab. You can add / remove its sections, rename tab and change its position by d'n'd.</p><p>Cras sed libero rutrum, aliquam urna eu, gravida nulla. Nulla facilisi. Maecenas elementum nibh eget dictum congue. Sed nec quam laoreet, iaculis orci ac, dictum tortor. Nullam varius semper mollis. Donec hendrerit lorem sed massa vehicula aliquam. Aenean mollis sapien</p>",
    },
  },
  {
    permissions: {
      canChangeDescription: true,
      canEditStructure: true,
      canEditContent: true,
      canEditTab: true,
      canDelete: true,
    },
    id: "39bf51a5-97ef-4eb9-b199-ef3db308383e",
    title: "Reflection",
    content: {
      paneSize: 50,
      description:
        "<p>You can do anything you want with this tab. Even delete it.</p><p>Morbi sit amet ipsum tincidunt ipsum finibus maximus. Donec id lobortis ante. Duis ultricies mauris lobortis, condimentum felis id, rhoncus urna.</p>",
    },
  },
];

export const mockPlannerInfo = {
  canAddTab: true,
  title: "Acid Lab",
  dueDate: Date.now() + 24 * 6.2 * 3600 * 1000,
  description:
    "In this experiment, your task is to determine the concentration of an unknown monoprotic strong acid. To determine the concentration, you will use a laboratory technique called titration. Although acid concentrations are often found using other methods in modern labs, titration is still used today for other analyses. Acid concentration is used in this lab to keep calculations relatively simple.",
};

export const mockProcessPlanner = {
  plannerData: mockPlannerData,
  info: mockPlannerInfo,
  activeTab: 0,
};
