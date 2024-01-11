/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import Popover from '@mui/material/Popover';
import CheckList from './CheckList';
import { useEffect, useState } from 'react';
import AddCheckList from './AddCheckList';

export default function CardDetail({
  open,
  anchorEl,
  onClose,
  cardData,
}) {
  const [checkListData, setCheckListData] = useState([]);
  const [addNewCheckList, setAddNewCheckList] = useState(false);
  const id = open ? 'simple-popover' : undefined;

  const ApiKey = '8595f1e78e95986a8b549202c4381a5f';
  const ApiToken =
    'ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889';

  const handlePopoverClick = (event) => {
    event.stopPropagation();
  };

  //   console.log(checkListData);

  useEffect(() => {
    function fetchCheckLists() {
      fetch(
        `https://api.trello.com/1/cards/${cardData.id}/checklists?key=${ApiKey}&token=${ApiToken}`
      )
        .then((res) => res.json())
        .then((data) => setCheckListData(data))
        .catch((err) =>
          console.log('error while fetching checklist data', err)
        );
    }

    fetchCheckLists();
  }, [cardData.id]);

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
          <p>in list ----</p>
        </div>
        <p onClick={onClose}>X</p>
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
          {checkListData.map((ele) => (
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
                setCheckListData={setCheckListData}
                cardId={cardData.id}
              />
            </div>
          ))}
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
                setCheckListData={setCheckListData}
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
