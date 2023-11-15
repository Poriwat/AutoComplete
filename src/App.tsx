import { useState } from 'react'
import './App.css'
import dataAddress from './database/raw_database.json'
// import dataAddress from './database/test2.json'
import dataProvince from './database/province.json'

interface IAddressDatas {
  district: string,
  amphoe: string,
  province: string,
  zipcode: number,
  district_code: number,
  amphoe_code: number,
  province_code: number

}

interface IAddressProvince {
  id: number,
  name_th: string,
  name_en: string,
  geography_id: number,
  created_at: string,
  updated_at: string,
  deleted_at: null

}

function App() {
  const [addressProvince, setAddressProvince] = useState<IAddressProvince[]>([])
  const [addressDatas, setAddressDatas] = useState<IAddressDatas[]>([])
  const [province, setProvince] = useState<string>("")
  const [amphoe, setAmphoe] = useState<string>()
  const [district, setDistrict] = useState<IAddressDatas[]>([])
  const [showDistrict,setShowDistrict] = useState<string>("")
  const [zipcode, setZipcode] = useState<number>()


  
  const searchDataProvince= (e) => {

    const inputText = e.target.value
    setProvince(inputText)
    if (inputText !== "") {
      let data: IAddressProvince[] = dataProvince.filter(data => {
        return data.name_th.startsWith(inputText)
      })
      setAddressProvince(data)

    }
    else {
      setAddressProvince([])
      setAddressDatas([])
      setDistrict([])

      setProvince("")
      setAmphoe("")
      setShowDistrict("")
      setZipcode("")
      
    }


  }



  const selectProvince = (province: string) => {
    //set value on Input 
    setProvince(province)


    let provinceSelect: IAddressDatas[] = dataAddress.filter(data => data.province === province)
    setAddressProvince([])
    let checkEmphoe: string = " "
    let amphoeFilter: IAddressDatas[] = provinceSelect.filter(data => {
      if (data.amphoe !== checkEmphoe) {
        checkEmphoe = data.amphoe
        return data
      }

    })
    console.log(amphoeFilter)
    setAddressDatas(amphoeFilter)

  }


  const searchDataAmphoe= (e) => {

    const inputText = e.target.value
    setAmphoe(inputText)
    if (inputText !== "") {
      
      let data: IAddressDatas[] = dataAddress.filter(data => {
        return data.amphoe.startsWith(inputText)
      })
      let checkEmphoe:string = ""
      let amphoeFilter: IAddressDatas[] = data.filter(data=>{
        if(data.amphoe !== checkEmphoe){
          checkEmphoe = data.amphoe
          return data
        }
      })
      setAddressDatas(amphoeFilter)

    }
    else {
      setAddressDatas([])
      setDistrict([])

      setAmphoe("")
      setShowDistrict("")
      setZipcode("")
    }


  }

 
  const selectAmphoe = (emphoe:string) =>{


    setAmphoe(emphoe)
    let emphoeSelect: IAddressDatas[] = dataAddress.filter(data => data.amphoe === emphoe)
    console.log(province)
    if(province === ""){
      emphoeSelect.map((data)=> {
        if(data.amphoe === emphoe){
          setProvince(data.province)
          console.log(province)
      }
      
      })
    }
    setDistrict(emphoeSelect)
    setAddressDatas([])



  }

  const searchDataDistrict= (e) => {

    const inputText = e.target.value
    setShowDistrict(inputText)
    console.log(inputText)
    if (inputText !== "") {
      let data: IAddressDatas[] = dataAddress.filter(data => {
        return data.district.startsWith(inputText)
      })
      setDistrict(data)
      console.log(district)
      // console.log(addressDatas)
    }
    else {
      setAddressProvince([])
      setAddressDatas([])
      setDistrict([])
      setZipcode("")
    }


  }


  const selectDistrict= (_district:string) =>{

    setShowDistrict(_district)

    console.log(_district)
    let filterZipcode:number = 0

    dataAddress.filter(data=>{
      if(data.district === _district){
        filterZipcode = data.zipcode
        if(province ==="" && amphoe === ""){
          setProvince(data.province)
          setAmphoe(data.amphoe)
        }if (amphoe === "") {
          setAmphoe(data.amphoe)
          
          
        }
      }
    })

    setZipcode(filterZipcode)

    setDistrict([])


  }

 





  return (
    <>
      <tr>
        <td>
          <input onChange={searchDataProvince} value={province} placeholder='จังหวัด '></input>
          {addressProvince?.map(data => {
            return (<>
              <li onClick={() => selectProvince(data.name_th)}>{data.name_th}
              </li>
            </>)
          })}
        </td>
        <td>
          <input onChange={searchDataAmphoe} placeholder='อำเภอ' value={amphoe}></input>
          {addressDatas.map((data) => {
            if(province === ""){
              return <>
              <li onClick={() => selectAmphoe(data.amphoe)}>{data.province}{" > "+data.amphoe}</li>
            </>

            }else{
              return <>
              <li onClick={() => selectAmphoe(data.amphoe)}>{data.amphoe}</li>
            </>
            }

          })}

        </td>
        <td>
          <input onChange={searchDataDistrict} placeholder='ตำบล' value={showDistrict}></input>
          {district.map((data) => {
            if(province ==="" && amphoe === ""){
              return <li onClick={() => selectDistrict(data.district)}>{data.province}{" > "+data.amphoe}{" > "+data.district}</li>
            }
            if(amphoe === ""){
              return <li onClick={() => selectDistrict(data.district)}>{data.amphoe}{" > "+data.district}</li>
            }
            else{
              return <>
              <li onClick={() => selectDistrict(data.district)}>{data.district}</li>
            </>
            }
          })}

        </td>
        <td>
        <input  placeholder='ไปรษณีย์' value={zipcode} ></input>
        </td>

      </tr>


    </>
  )
}

export default App



