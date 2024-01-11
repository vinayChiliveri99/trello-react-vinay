// api.js
import axios from 'axios';

const ApiKey = '8595f1e78e95986a8b549202c4381a5f';
const ApiToken =
  'ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889';

// for fetching cards in a list, used in BoardList.jsx
export function fetchCardsList(listId) {
  return axios
    .get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${ApiKey}&token=${ApiToken}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching cards:', error);
      throw error;
    });
}

// adding new board.
export function addNewBoard(boardName) {
  const url = `https://api.trello.com/1/boards/?name=${boardName}&key=${ApiKey}&token=${ApiToken}`;

  return axios
    .post(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error while adding board:', error);
      throw error;
    });
}

// adding new checkitem(task) to checklist

export function addNewCheckItem(checkListId, checkItemValue) {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemValue}&key=${ApiKey}&token=${ApiToken}`;

  return axios
    .post(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('Error while adding checkItem to checklist', error);
      throw error;
    });
}

// delete a entire checklist inside a card.

export function deleteCheckList(cardId, checkListId) {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists/${checkListId}?key=${ApiKey}&token=${ApiToken}`;

  return axios
    .delete(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('Error while deleting the checklist', error);
      throw error;
    });
}

// checkitems data

export function getCheckItemsData(checkListId) {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${ApiKey}&token=${ApiToken}`;

  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log(
        'Error while getting the checkitems data of a checklist',
        error
      );
      throw error;
    });
}

// delete a checkitem from the checklist.

export function deleteACheckItem(checkListId, checkItemId) {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${ApiKey}&token=${ApiToken}`;

  return axios
    .delete(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log(
        'Error while deleting a checkItem in a checklist',
        error
      );
      throw error;
    });
}

// check and uncheck the checkboxes using a put request.

export function updateCheckBoxes(cardId, checkItemId, newState) {
  const url = `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=${newState}&key=${ApiKey}&token=${ApiToken}`;

  return axios
    .put(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log(
        'Error while updating the state of a checkbox',
        error
      );
      throw error;
    });
}

// create a card inside a list.
// the card takes the name of the card.

export function createCard(listId, cardName) {
  const url = `https://api.trello.com/1/cards?idList=${listId}&key=${ApiKey}&token=${ApiToken}`;

  return axios
    .post(url, { name: cardName })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('Error while creating a card in a list', error);
      throw error;
    });
}

// getting checklists present in a card, as a card can have any number of (independent) checklists

// export function getCheckListsInACard(cardId) {
//     const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${ApiKey}&token=${ApiToken}`

//     return axios.get(url)
//     .then((response) => {
//         if(response.status === 200) {
//             return response.data;
//         }
//     }).then((data) => data)
//     .catch((error) => {
//         console.log('Error while fetching the checklists present in a card', error);
//         throw error;
//     })
// }

// fetch boards
export function getAllBoards() {
  const url = `https://api.trello.com/1/members/6597ebc98f968c8e9bd02250/boards?key=${ApiKey}&token=${ApiToken}`;

  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('error while getting all boards data');
      throw error;
    });
}

// getting lists in a board.

export function getListsInABoard(id) {
  const url = `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${ApiToken}`;

  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('Error while getting the lists in a board', error);
      throw error;
    });
}

// getting board details.

export function getBoardDetails(id) {
  const url = `https://api.trello.com/1/boards/${id}?key=${ApiKey}&token=${ApiToken}`;

  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('Error while getting the board details', error);
      throw error;
    });
}

// create new list in a board.

export function createNewList(listName, boardId) {
  const url = `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${ApiKey}&token=${ApiToken}`;

  return axios
    .post(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('error while creating a new list', error);
      throw error;
    });
}

// archive a list.

export function archiveList(listId) {
  const url = `https://api.trello.com/1/lists/${listId}/closed?key=${ApiKey}&token=${ApiToken}&value=true`;

  return axios
    .put(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('Error while archiving the list', error);
      throw error;
    });
}

// archive or delete a card.

export function archiveCard(cardId) {
  const url = `https://api.trello.com/1/cards/${cardId}?key=${ApiKey}&token=${ApiToken}`;

  return axios
    .delete(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log('Error while archiving a card', error);
      throw error;
    });
}

// add new checklist to a card.

export function addNewCheckList(checkListName, cardId) {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${ApiKey}&token=${ApiToken}&name=${checkListName}`;

  return axios
    .post(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.log(
        'Error while adding a new checklist to the card',
        error
      );
      throw error;
    });
}
