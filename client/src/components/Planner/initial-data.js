const initialData = {
  tasks: {
    1: { id: "1", content: "CS5500 - Computer Engineering" },
    2: { id: "2", content: "CS6000 - Basket Weaving" },
    3: { id: "3", content: "CS4000 - French Fry Cooking" },
    4: { id: "4", content: "CS5200 - Basic Programming" },
  },
  columns: {
    "col-1": {
      id: "col-1",
      title: "Available Classes",
      taskIds: ["1", "2", "3", "4"],
    },
    "col-2": {
      id: "col-2",
      title: "Spring 2022",
      taskIds: [],
    },
    "col-3": {
      id: "col-3",
      title: "Fall 2022",
      taskIds: [],
    },
  },
  columnOrder: ["col-1", "col-2", "col-3"],
};

export default initialData;
