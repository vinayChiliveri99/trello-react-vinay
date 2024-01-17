/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import Popover from '@mui/material/Popover';
import CheckList from './CheckList';
import { useEffect, useState } from 'react';
import AddCheckList from './AddCheckList';
import { getCheckListsInACard } from '../API';
import { Alert } from '@mui/material';

import { setCheckList } from '../app/slices/checkListSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function CardDetail({
  open,
  anchorEl,
  onClose,
  cardData,
  listName,
}) {
  // const [checkListData, setCheckListData] = useState([]);
  const [addNewCheckList, setAddNewCheckList] = useState(false);
  const id = open ? 'simple-popover' : undefined;

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const checkListData = useSelector((state) => state.checklist.data);
  // console.log('checklist data from carddetail:', checkListData);

  const handlePopoverClick = (event) => {
    event.stopPropagation();
  };

  // getting the checklists in a card, as a card can have multiple checklists

  useEffect(() => {
    function fetchCheckLists() {
      getCheckListsInACard(cardData.id)
        .then((data) => {
          // setCheckListData(data)
          dispatch(setCheckList({ id: cardData.id, data: data }));
        })
        .catch((err) => {
          console.log('error while fetching checklist data', err);
          setErrorMessage(
            'Error while getting the checklits data in a card, please try again..'
          );
        });
    }

    fetchCheckLists();
  }, [cardData.id, dispatch]);

  if (errorMessage !== null) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      onClick={handlePopoverClick}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 50px',
        }}
      >
        <div>
          <p style={{ marginBottom: '-10px', fontWeight: '700' }}>
            {cardData.name}
          </p>
          <p>in list {listName}</p>
        </div>
        <p style={{ cursor: 'pointer' }} onClick={onClose}>
          X
        </p>
      </header>

      <section
        style={{
          height: '75vh',
          width: '60vw',
          margin: '0 40px',
          display: 'flex',
          gap: '20px',
        }}
      >
        <div>
          {Object.entries(checkListData).map(([cardId, checklists]) =>
            checklists.map((ele) => (
              <div
                style={{
                  margin: '30px 0',
                  backgroundColor: '#F1F2F4',
                  padding: '15px',
                }}
                key={ele.id}
              >
                <CheckList
                  singleCheckListData={ele}
                  cardId={cardId}
                />
              </div>
            ))
          )}
        </div>

        <div>
          <p>Add to Card</p>
          <div
            style={{
              backgroundColor: '#E3E6E9',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                setAddNewCheckList(!addNewCheckList);
              }}
            >
              Checklist
            </button>
            {addNewCheckList ? (
              <AddCheckList
                // setCheckListData={setCheckListData}
                cardId={cardData.id}
                setAddNewCheckList={setAddNewCheckList}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </Popover>
  );
}
