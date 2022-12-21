import React, {useState} from 'react'
import Axios from 'axios'

//This is currently not in use but would be something I would use if we wanted to make this more open and useable by other guilds
function GuildSearch() {
  const [region, setRegion] = useState("")
  const [guild, setGuild] = useState("")
  
  const onRegionChange = event => {
    setRegion(event.target.value);
  }
  
  const onGuildChange = event => {
    setGuild(event.target.value);
  }
  
  const getGuildInfo = () => {
    Axios.get("https://us.api.blizzard.com/data/wow/guild/area-52/underraided/roster?namespace=profile-us&locale=en_US&access_token=US1VABb9Wx5tdt51Wa67oxg44agbMMYM3i")
      .then(res => {
        console.log(res)
      })
  }

  return (
    <div>
        <input type="text" name="region" onChange={onRegionChange} value={region}></input>
        <input type="text" name="guild" onChange={onGuildChange} value={guild}></input>
        <input type="submit" onClick={() => getGuildInfo()}/>
    </div>
  )
}

export default GuildSearch