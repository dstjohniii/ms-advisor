const initialData = {
  tasks: {
    1: { id: "1", content: "CS5500 - Computer Engineering" },
    2: { id: "2", content: "CS6000 - Basket Weaving" },
    3: { id: "3", content: "CS4000 - French Fry Cooking" },
    4: { id: "4", content: "CS5200 - Basic Programming" },
  },
  columns: {
    classes: {
      id: "classes",
      title: "Available Classes",
      taskIds: ["1", "2", "3", "4"],
    },
    "sp-2022": {
      id: "sp-2022",
      title: "Spring 2022",
      taskIds: [],
    },
    "su-2022": {
      id: "su-2022",
      title: "Summer 2022",
      taskIds: [],
    },
    "fa-2022": {
      id: "fa-2022",
      title: "Fall 2022",
      taskIds: [],
    },
    "sp-2023": {
      id: "sp-2023",
      title: "Spring 2023",
      taskIds: [],
    },
    "su-2023": {
      id: "su-2023",
      title: "Summer 2023",
      taskIds: [],
    },
    "fa-2023": {
      id: "fa-2023",
      title: "Fall 2023",
      taskIds: [],
    },
  },
  columnOrder: [
    "sp-2022",
    "su-2022",
    "fa-2022",
    "sp-2023",
    "su-2023",
    "fa-2023",
  ],
};

export default initialData;
