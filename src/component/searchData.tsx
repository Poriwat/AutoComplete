import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import addressData from './database/raw_database.json'
// import test from './database/test.json'
// import test from './database/test2.json'

interface IAddressData {
  district: string,
  amphoe: string,
  province: string,
  zipcode: string,
  // district_code: number,
  // amphoe_code: number,
  // province_code: number

}

function App() {
  const [addressData, setAddressData] = useState<IAddressData[]>([])
  const [province, setProvince] = useState<string>()
  const [amphoe, setAmphoe] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [zipcode, setZipcode] = useState<string>()


  const searchDataProvince = (e) => {
    const inputText = e.target.value
    setProvince(inputText)
    if (inputText !== "") {
      const data: IAddressData[] = test.filter(data => {
        return data.province.startsWith(inputText)
      })
      setAddressData(data)
    }
    else{
      setAddressData([])
      setAmphoe("")
      setDistrict("")
      setZipcode("")
      setProvince("")
    }

  
  }

  const searchDataDistrict = (e) => {
    const inputText = e.target.value
    setDistrict(inputText)
    if (inputText !== "") {
      const data: IAddressData[] = test.filter(data => {
        return data.district.startsWith(inputText)
      })
      setAddressData(data)
    }
    else{
      setAddressData([])
      setAmphoe("")
      setDistrict("")
      setZipcode("")
      setProvince("")
    }

  
  }

  

  


  const selectDataAddress = (data: IAddressData) => {
  
    setProvince(data.province)
    setAmphoe(data.province)
    setDistrict(data.district)
    setZipcode(data.zipcode)


  }
  




  return (
    <>
      <input onChange={searchDataProvince} value={province}></input>
      {addressData?.map(data => {
        return (<>
          <li onClick={() => selectDataAddress({
            district: data.district,
            amphoe: data.amphoe,
            province: data.province,
            zipcode: data.zipcode
          })}>{data.province}{" " + data.amphoe}{" " + data.zipcode}
          </li>
        </>)
      })}
      <input type="text" onChange={searchDataDistrict} value={district}/>
      {addressData?.map(data => {
        return (<>
          <li onClick={() => selectDataAddress({
            district: data.district,
            amphoe: data.amphoe,
            province: data.province,
            zipcode: data.zipcode
          })}>{data.district}{" " + data.amphoe}{" " + data.province}
          </li>
        </>)
      })}
      {/* <input type="text" value={amphoe}/>
      <input type="text" value={zipcode}/> */}


      {/* <input  value={showData}></input>
      {addressData?.map(data=>{
        return(<>
              <li onClick={selectDataAddress}>{data.amphoe}</li>
        </>)
      })} */}




    </>
  )
}

export default App
