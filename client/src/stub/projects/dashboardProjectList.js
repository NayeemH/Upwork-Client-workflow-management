import img1 from "../../assets/Project/1.jpeg";
import img2 from "../../assets/Project/2.jpg";

const data = [
  {
    id: 1223,
    name: "Project 1",
    description: "lorem ipsum",
    notification: 5,
    image: img1,
    stared: true,
    tasks: [
      {
        id: 1,
        name: "Task 1",
        image: img1,
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
          {
            name: "Testing",
            viewed: false,
          },
        ],
        currentStep: 3,
        compeleted: false,
      },
      {
        id: 2,
        name: "Task 2",
        image: img2,
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
        ],
        currentStep: 2,
        compeleted: false,
      },
    ],
  },
  {
    id: 1224,
    name: "Project 2",
    description: "lorem ipsum",
    notification: 2,
    image: img2,
    stared: false,
    tasks: [
      {
        id: 1,
        image: img1,
        name: "Task 1",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
          {
            name: "Testing",
            viewed: false,
          },
        ],
        currentStep: 3,
        compeleted: false,
      },
      {
        id: 2,
        image: img2,
        name: "Task 2",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
        ],
        currentStep: 2,
        compeleted: false,
      },
    ],
  },
  {
    id: 1225,
    name: "Project 3",
    description: "lorem ipsum",
    notification: 0,
    image: img1,
    stared: false,
    tasks: [
      {
        id: 1,
        image: img1,
        name: "Task 1",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
          {
            name: "Testing",
            viewed: false,
          },
        ],
        currentStep: 3,
        compeleted: false,
      },
      {
        id: 2,
        image: img2,
        name: "Task 2",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
        ],
        currentStep: 2,
        compeleted: false,
      },
    ],
  },
  {
    id: 1226,
    name: "Project 4",
    description: "lorem ipsum",
    notification: 0,
    image: img2,
    stared: false,
    tasks: [
      {
        id: 1,
        image: img1,
        name: "Task 1",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
          {
            name: "Testing",
            viewed: false,
          },
        ],
        currentStep: 3,
        compeleted: false,
      },
      {
        id: 2,
        image: img2,
        name: "Task 2",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
        ],
        currentStep: 2,
        compeleted: false,
      },
    ],
  },
  {
    id: 1227,
    name: "Project 5",
    description: "lorem ipsum",
    notification: 0,
    image: img1,
    stared: true,
    tasks: [
      {
        id: 1,
        image: img1,
        name: "Task 1",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
          {
            name: "Testing",
            viewed: false,
          },
        ],
        currentStep: 3,
        compeleted: false,
      },
      {
        id: 2,
        image: img2,
        name: "Task 2",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
        ],
        currentStep: 2,
        compeleted: false,
      },
    ],
  },
  {
    id: 1228,
    name: "Project 6",
    description: "lorem ipsum",
    notification: 0,
    image: img2,
    stared: false,
    tasks: [
      {
        id: 1,
        image: img1,
        name: "Task 1",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
          {
            name: "Testing",
            viewed: false,
          },
        ],
        currentStep: 3,
        compeleted: false,
      },
      {
        id: 2,
        image: img2,
        name: "Task 2",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
        ],
        currentStep: 2,
        compeleted: false,
      },
    ],
  },
  {
    id: 1229,
    name: "Project 7",
    description: "lorem ipsum",
    notification: 0,
    image: img1,
    stared: true,
    tasks: [
      {
        id: 1,
        image: img1,
        name: "Task 1",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
          {
            name: "Testing",
            viewed: false,
          },
        ],
        currentStep: 3,
        compeleted: false,
      },
      {
        id: 2,
        image: img2,
        name: "Task 2",
        steps: [
          {
            name: "Planing",
            viewed: true,
          },
          {
            name: "Design",
            viewed: true,
          },
          {
            name: "Development",
            viewed: false,
          },
        ],
        currentStep: 2,
        compeleted: false,
      },
    ],
  },
];

export default data;
