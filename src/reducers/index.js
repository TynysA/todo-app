const list = [
  {
    id: 1,
    name: "list-2",
    cards: [
      {
        id: 1,
        title: "queue",
        info: [
          {
            id: 99,
            title: "Last info",
            dateCreate: new Date(2023, 9, 10),
            dateEnd: new Date(2023, 9, 12),
            description:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis eaitaque inventore impedit voluptates asperiores omnis distinctioaccusamus architecto, incidunt error, eveniet molestiae esserecusandae modi eos natus est eligendi.",
            files: null,
            comment: [
              {
                date: new Date(),
                text: "info about metadata",
                subcomment: [],
              },
            ],
            subcards: [
              {
                id: 2222,
                title: "some task",
                done: true,
              },
              {
                id: 1232,
                title: "some new task",
                done: false,
              },
              {
                id: 1000,
                title: "just check",
                done: false,
              },
            ],
          },
          {
            id: 10,
            title: "Last info",
            dateCreate: new Date(2023, 9, 8),
            dateEnd: new Date(2023, 9, 30),
            description:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis eaitaque inventore impedit voluptates asperiores omnis distinctioaccusamus architecto, incidunt error, eveniet molestiae esserecusandae modi eos natus est eligendi.",
            files: null,
            comment: [
              {
                date: new Date(),
                text: "info about metadata",
                subcomment: [],
              },
            ],
            subcards: [
              {
                id: 2222,
                title: "some",
                done: false,
              },
              {
                id: 1232,
                title: "some",
                done: false,
              },
              {
                id: 1000,
                title: "some",
                done: false,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "development",
        info: [
          {
            id: 11,
            title: "Development info",
            dateCreate: new Date(2023, 9, 10),
            dateEnd: new Date(2023, 9, 8),
            description:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis eaitaque inventore impedit voluptates asperiores omnis distinctioaccusamus architecto, incidunt error, eveniet molestiae esserecusandae modi eos natus est eligendi.",
            files: null,
            comment: [
              {
                date: new Date(),
                text: "info about metadata",
                subcomment: [],
              },
            ],
            subcards: [
              {
                id: 12222,
                title: "some",
                done: false,
              },
              {
                id: 122,
                title: "some",
                done: false,
              },
              {
                id: 19876,
                title: "some",
                done: false,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "done",
        info: [],
      },
    ],
    title: "myList",
    board: "board-0",
  },
  {
    id: 2222,
    name: "list-2",
    cards: [
      {
        id: 1,
        title: "queue",
        info: [],
      },
      {
        id: 2,
        title: "development",
        info: [],
      },
      {
        id: 3,
        title: "done",
        info: [],
      },
    ],
    title: "not my list",
    board: "board-1",
  },
];

const defaultState = {
  list: list,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        list: [...state.list, action.payload], // Add the new project to the array
      };
    case "UPDATE_LIST":
      return { ...state, list: action.payload };
    case "ADD_CARD":
      const { list_id, card_id, newCard } = action.payload;
      const found_Index = state.list.findIndex(
        (el) => el.id === Number(list_id)
      );
      const new_List = [...state.list];
      new_List[found_Index].cards[Number(card_id - 1)].info.push(newCard);
      return { ...state, list: new_List };
    case "UPDATE_SUBTASK_STATUS":
      const { listId, cardStatus, cardId, subtaskId, status } = action.payload;
      const foundItemIndex = state.list.findIndex(
        (el) => el.id === Number(listId)
      );
      const updatedList = [...state.list];
      if (foundItemIndex !== -1) {
        if (cardStatus === "done") {
          let card = updatedList[foundItemIndex].cards.done.find(
            (el) => el.id === cardId
          );
          let subtask = card.subcards.find((e) => e.id === Number(subtaskId));
          console.log(subtask);
          subtask.done = status;
        }
        if (cardStatus === "development") {
          let card = updatedList[foundItemIndex].cards.development.find(
            (el) => el.id === cardId
          );
          let subtask = card.subcards.find((e) => e.id === Number(subtaskId));
          console.log(subtask);
          subtask.done = status;
        }
        if (cardStatus === "queue") {
          let card = updatedList[foundItemIndex].cards.queue.find(
            (el) => el.id === cardId
          );
          let subtask = card.subcards.find((e) => e.id === Number(subtaskId));
          console.log(subtask);
          subtask.done = status;
        }
      }
      return { ...state, list: updatedList };
    case "ADD_SUBTASK":
      const { listid, cardstatus, cardid, newsabtask } = action.payload;
      const itemList = state.list.findIndex((el) => el.id === Number(listid));
      const newList = [...state.list];
      if (itemList !== -1) {
        if (cardstatus === "done") {
          let card = newList[itemList].cards.done.find(
            (el) => el.id === cardid
          );
          card.subcards.push(newsabtask);
        }
        if (cardstatus === "development") {
          let card = newList[itemList].cards.development.find(
            (el) => el.id === cardid
          );
          card.subcards.push(newsabtask);
        }
        if (cardstatus === "queue") {
          let card = newList[itemList].cards.queue.find(
            (el) => el.id === cardid
          );
          card.subcards.push(newsabtask);
        }
      }
      return { ...state, list: newList };
    case "DragAndDropCard":
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

export default reducer;
