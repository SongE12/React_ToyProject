import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

import Card from './components/Card'; 
import StationOptions from './components/StationOptions';

import AllStation from './routes/AllStation';
import Favorites from './routes/Favorites';
import styled from 'styled-components';

function App() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [stationList, setStationList] = useState([])
  const [selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const [cardRender, setCardRender] = useState(false)

  const ButtonDiv = styled.div`
    position: fixed; 
    bottom: 0;
    width: 100%;
  `
  const Btn = styled.button`
    width: calc(100% / 3);
    height: 60px;
    border: none;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    &:hover{  
      background-color : lightgray;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
  `
  const Select1 = styled.select`
    border: none;
    padding: 20px 10px;
    margin-right: 20px;
    font-size: 20px;
    font-weight: 700;
  `
  const Select2 = styled.select`
    width: 120px;
    padding: 20px 10px;
    border: none; 
    font-size: 20px;
    font-weight: 700;
  `

  useEffect( () => {
    axios.get('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6dd85928-7919-46c7-ab66-0931df3fe4aa/data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220821%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220821T063200Z&X-Amz-Expires=86400&X-Amz-Signature=5a3c6e7bdf89e1fce783fbb442690910b35629d55e44172919881fac64db4a79&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22data.json%22&x-id=GetObject')
    .then(({data}) => {
    const res = data.response.body.items
    setItems(res)
    })
    .catch(() => {
      console.log("요청실패")
    })
  },[])

  useEffect(() => {
    const stationData = items.map((station) => {
      return station.stationName
    })
    setStationList(stationData)
  },[items])

  useEffect(() => {
    if(items.length !== 0) {
      setCardRender(true)
    } else {
      setCardRender(false)
    }
  }, [items, selected])

  return (  
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Select1>
              <option key="서울">
                서울
              </option>
            </Select1>
            <Select2 onChange={handleSelect} value={selected}>
              <StationOptions stationList={stationList} selected={selected} />
            </Select2>
            { cardRender ? <Card items={items} selected={selected} /> : null  }
          </>
        }></Route>
        <Route path="/all" element={ cardRender ? <AllStation items={items} /> : null }/>
        <Route path="/favorites" element={<Favorites />}/>
      </Routes>

      <ButtonDiv>
        <Btn onClick={()=>{ navigate('/') }}>
          <span class="material-icons">location_on</span>
          <p>내 지역보기</p>
        </Btn>
        <Btn onClick={()=>{ navigate('/all') }}>
          <span class="material-icons">map</span>
          <p>전체 시도 보기</p>
        </Btn>
        <Btn onClick={()=>{ navigate('/favorites') }}>
        <span class="material-icons">star</span>
          <p>즐겨찾기</p>
        </Btn>
      </ButtonDiv>
    </div>
  );
}

export default App;
