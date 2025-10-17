export const users = [
  {
    id: "1",
    name: "Emma",
    supervisorId: "3",
    employeesToSupervise: [],
    availableViews: ["request"],
  },
  {
    id: "2",
    name: "Bob",
    supervisorId: "3",
    employeesToSupervise: [],
    availableViews: ["request"],
  },
  {
    id: "3",
    name: "Kate",
    supervisorId: "4",
    employeesToSupervise: ["1", "2"],
    availableViews: ["request", "response"],
  },
  {
    id: "4",
    name: "Frank",
    supervisorId: null,
    employeesToSupervise: ["3"],
    availableViews: ["response"],
  },
];
