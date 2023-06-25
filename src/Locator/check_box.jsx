import React from 'react';

import "./CommonCss.css"


export default function checkBox(props) {

  const checkBox = [
    { id: 1, name: '24 Hour ATM' },
    { id: 2, name: 'Cashier Check' },
    { id: 3, name: 'Drive up accessible' },
    { id: 4, name: 'Money Order' },
    { id: 5, name: 'Check Cashing' },
    { id: 6, name: 'New Account Openings' },
    { id: 7, name: 'Safe Deposit Box' },
    { id: 8, name: 'Notary' }

  ];

  
  return (

    <div className='CheckBox'>

      {checkBox.map(item => {
        return (
          <label className='CheckBoxDesign'>
            <input
              type="checkbox"
              id={item.id}
              class= "checkBox"
              value={item.name}
              

            />

            {item.name}
          </label>

        );
      })}
    </div>
  );
}
