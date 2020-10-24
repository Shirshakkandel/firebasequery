
import React, { useEffect, useState } from 'react';
import './App.css';
import firebase from './firebase'

function App() {
  const ref = firebase.firestore().collection('schools')
  const [schools, setSchools] = useState([]);
  const [loading, setloading] = useState(false)

  //using map 
  // useEffect(() => {
  //   setloading(true);
  //   ref.onSnapshot(snapshot => {
  //     const items = [];
  //     snapshot.docs.map(doc => {
  //       items.push(doc.data());
  //     });

  //     setSchools(items);
  //     setloading(false);
  //   })
  // })

  // real time database using onSnapshot
  // function getSchools() {
  //   setloading(true);
  //   ref.onSnapshot(querySnapshot => {
  //     const items = [];
  //     querySnapshot.forEach(doc => {
  //       items.push(doc.data());
  //     })
  //     setSchools(items);
  //     setloading(false);
  //   })
  // }


  //one time get method

  useEffect(() => {
    setloading(true);
    ref.onSnapshot(snapshot => {
      setSchools(snapshot.docs.map(doc => doc.data()))
    })
    setloading(false);
  }, [])

  // function getSchools() {
  //   setloading(true);
  //   ref.get().then(item => {
  //     const items = item.docs.map(doc => doc.data())
  //     setSchools(items);
  //     setloading(false)
  //   })
  // }

  // useEffect(() => {
  //   getSchools();
  // }, [])

  // useEffect(() => {
  //   setloading(true)
  //   ref.get().then(item => {
  //     setSchools(item.docs.map(doc => doc.data()))
  //   })
  //   setloading(false)
  // }, [])


  if (loading) {
    return <h1>Loading</h1>
  }

    return (
      <div className="App">
        <h1>Schools</h1>
        {schools.map(school => (
          <div key={school.id}>
            <h2>{school.title}</h2>
            <p>{school.desc}</p>
          </div>
        ))}

      </div>
  )

}

export default App