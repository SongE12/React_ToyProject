import { useEffect, useState } from "react"
import styled from "styled-components"

function AllStation({items}) {
  const [list] = useState(items)
  const [BoxBg, setBoxBg] = useState()
  const [star, setStar] = useState()

  const Select = styled.select`
    border: none;
    padding: 20px 10px;
    font-size: 20px;
    font-weight: 700;
  `
  const Container = styled.div`
    margin-bottom: 30px;
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
    justify-content: space-between;
    padding: 10px 0 0 20px;
    color: white;
  `
  const TitleDiv = styled.div`
    display: flex;
  `
  const StarDiv = styled.div`
    cursor: pointer;
    margin-right: 20px;
  `
  const SubTitle = styled.div`
    display: flex;
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
    if(list) {
      const pm10Grade  = list.map((a) => {
        return a.pm10Grade
      })
      setBoxBg(pm10Grade)
    }
  }, [list])

  useEffect(() => {
    if(list) {
      const starData = list.map(() => {
        return false
      })
      setStar(starData)
    }
  }, [list])

  return (
    <>
      <Select>
        <option key="서울">
          서울
        </option>
      </Select>
      { 
        BoxBg ? 
        list.map((station, i) => {
          return (
            <Container>
              <Box bg={
                BoxBg[i] == 1 ? "#2B90F4" :
                BoxBg[i] == 2 ? "#02BF35" :
                BoxBg[i] == 3 ? "#FAED23" :
                BoxBg[i] == 4 ? "orange" :
                BoxBg[i] == 5 ? "red" :
                "gray"
              }>
                <Title>
                  <TitleDiv>
                    <b>{station.stationName}</b>
                    <SubTitle>{station.sidoName}</SubTitle>
                  </TitleDiv>
                  <StarDiv onClick={() => {
                    if(star[i]) {
                      let copy = [...star]
                      copy.splice(i, 1, false)
                      setStar(copy)
                    } else {
                      let copy = [...star]
                      copy.splice(i, 1, true)
                      setStar(copy)
                    }
                  }}>
                    {/* {console.log(starList)} */}
                    {star[i] ? 
                    <span class="material-icons">star</span> :
                    <span class="material-icons">star_outline</span>}
                  </StarDiv>
                </Title>
                <MsgDiv>
                  <Msg><MsgP fontColor={
                    BoxBg[i] == 1 ? "#2B90F4" :
                    BoxBg[i] == 2 ? "#02BF35" :
                    BoxBg[i] == 3 ? "#FAED23" :
                    BoxBg[i] == 4 ? "orange" :
                    BoxBg[i] == 5 ? "red" :
                    "gray"
                  }>
                    {BoxBg[i] == 1 ? "좋음" :
                      BoxBg[i] == 2 ? "보통" :
                      BoxBg[i] == 3 ? "한때나쁨" :
                      BoxBg[i] == 4 ? "나쁨" :
                      BoxBg[i] == 5 ? "매우나쁨" : "알수없음"
                    }</MsgP></Msg>
                </MsgDiv>
                <P>미세먼지 수치: {station.pm10Value}</P>
                <P>({station.dataTime} 기준)</P>
              </Box>
            </Container>
          ) 
        })
        : null
      }
    </>
  )
}

export default AllStation;