import Axios from 'axios'
import React, {useState, useEffect} from 'react'

const ProfessionInfoPanel = (props) => {
    const ACCESS_TOKEN = "US1t2HdS52uX8oR22eqybD8wkTMVtJeA39"
    const [professionData, setProfessionData] = useState(null)

    useEffect(() => {
        if(!professionData) {
          Axios.get("https://us.api.blizzard.com/data/wow/media/profession/" + props.id + "?namespace=static-us&locale=en_US&access_token=" + ACCESS_TOKEN)
            .then(response => {
              setProfessionData({
                image: response.data.assets[0].value,
                name: props.name
              })
            })
        }
    }, [professionData, props.id, props.name])

    var info = ""
    if(professionData) {
      info = <img src={professionData.image} alt={professionData.name} onMouseOver={() => {props.titleHandler(props.name)}} onClick={() =>{props.visibilityHandler(props.name)}}/>
    }
  return (
    <div>{info}</div>
  )
}

export default ProfessionInfoPanel