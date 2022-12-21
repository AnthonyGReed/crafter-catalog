import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import ACCESS_TOKEN from '../../data/AccessToken/AccessToken'

const ProfessionInfoPanel = (props) => {
    const [professionData, setProfessionData] = useState(null)
    const [selected, setSelected] = useState(false)

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

    const toggleSelected = () => {
      setSelected(!selected)
    }

    var active = ""
    if(selected) {
      active = "active"
    }
    var info = ""
    if(professionData) {
      info = (
        <div className="profession-box">
          <img className={`${active} profession-image`}  src={professionData.image} alt={professionData.name} onMouseOver={() => {props.titleHandler(props.name)}} onClick={() =>{props.visibilityHandler(props.name); toggleSelected()}}/>
        </div>
      )
    }
  return (
    <Container>{info}</Container>
  )
}

export default ProfessionInfoPanel