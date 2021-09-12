import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListComponent from './ListComponent';

export default function MainProducts() {
  const [medicine, setMedicine] = useState([]);
  async function getData() {
    try {
      const response = await axios.get(
        'https://pharmacyleaf.herokuapp.com/api/users/Medicine'
      );
      setMedicine(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return <ListComponent medicine={medicine} getData={getData} />;
}
