import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListComponent from './ListComponent';
import AlertDialog from './Alert';

export default function MainProducts() {
  const [medicine, setMedicine] = useState([]);
  const [showAlertObj, setShowAlertObj] = useState({ renderAlert: false });

  async function getData() {
    try {
      const response = await axios.get(
        'https://pharmacyleaf.herokuapp.com/api/users/Medicine'
      );
      setMedicine(response.data);
    } catch (error) {
      console.log(error);
      setShowAlertObj({
        renderAlert: true,
        title: 'there are error?',
        message: "couldn't GET the data   ",
        flag: true,
        historyFlag: { flag: false, route: '' },
      });
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ListComponent medicine={medicine} getData={getData} />

      {/* alert */}
      {showAlertObj.renderAlert ? (
        <AlertDialog
          showAlertObj={showAlertObj}
          setShowAlertObj={setShowAlertObj}
        />
      ) : null}
    </>
  );
}
