import { useEffect, useState } from "react"
import styled from "styled-components"


function Card({items, selected}) {
  const [defaultStation] = useState(items[0])
  const [customStation, setCustomStation] = useState([])
  const [BoxBg, setBoxBg] = useState()
  const [msg, setMsg] = useState()

  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `
  const Box = styled.div`
    background: ${props => props.bg};
    width: 300px;
    height: 160px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  `
  const Title = styled.div`
    display: flex;
    padding: 10px 0 0 20px;
    color: white;
  `
  const SubTitle = styled.div`
    font-size: 13px;
    line-height: 28px;
    margin-left: 10px;
  `
  const MsgDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 6px;
  `
  const Msg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    padding: 0 5px;
  `
  const MsgP = styled.span`
    font-size: 30px;
    color: ${props => props.fontColor};
  `
  const P = styled.div`
    font-size: 13px;
    color: white;
    margin-top: 5px
  `

  useEffect(() => {
    const data = items.filter((item) => {
      return item.stationName == selected
    })
    setCustomStation(...data)
  }, [selected])

  useEffect(() => {
    let pm10Grade = defaultStation.pm10Grade
    if(pm10Grade == 1) {
      setBoxBg("#2B90F4")
      setMsg("좋음")
    } else if(pm10Grade == 2) {
      setBoxBg("#02BF35")
      setMsg("보통")
    } else if(pm10Grade == 3) {
      setBoxBg("#FAED23")
      setMsg("한때나쁨")
    } else if(pm10Grade == 4) {
      setBoxBg("orange")
      setMsg("나쁨")
    } else if(pm10Grade == 5) {
      setBoxBg("red")
      setMsg("매우나쁨")
    } else {
      setBoxBg("gray")
      setMsg("알수없음")
    }
  }, [])

  useEffect(() => {
    if(customStation) {
      let pm10Grade = customStation.pm10Grade
      if(pm10Grade == 1) {
        setBoxBg("#2B90F4")
        setMsg("좋음")
      } else if(pm10Grade == 2) {
        setBoxBg("#02BF35")
        setMsg("보통")
      } else if(pm10Grade == 3) {
        setBoxBg("#FAED23")
        setMsg("한때나쁨")
      } else if(pm10Grade == 4) {
        setBoxBg("orange")
        setMsg("나쁨")
      } else if(pm10Grade == 5) {
        setBoxBg("red")
        setMsg("매우나쁨")
      } else {
        setBoxBg("gray")
        setMsg("알수없음")
      }
    }
  }, [customStation ,selected])

  return (
    <>
      { customStation ? 
        <Container>
          <Box bg={BoxBg}>
            <Title>
              <b>{customStation.stationName}</b>
              <SubTitle>{customStation.sidoName}</SubTitle>
            </Title>
            <MsgDiv>
              <Msg><MsgP fontColor={BoxBg}>{msg}</MsgP></Msg>
            </MsgDiv>
            <P>미세먼지 수치: {customStation.pm10Value}</P>
            <P>({customStation.dataTime} 기준)</P>
          </Box>
        </Container>
      :
        <Container>
          <Box bg={BoxBg}>
            <Title>
              <b>{defaultStation.stationName}</b>
              <SubTitle>{defaultStation.sidoName}</SubTitle>
            </Title>
            <MsgDiv><Msg><MsgP fontColor={BoxBg}>{msg}</MsgP></Msg></MsgDiv>
            <P>미세먼지 수치: {defaultStation.pm10Value}</P>
            <P>({defaultStation.dataTime} 기준)</P>
          </Box>
        </Container>
      }
    </>
  )
}

export default Card;