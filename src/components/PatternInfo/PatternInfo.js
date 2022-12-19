import Axios from 'axios'
import React, { useEffect, useState } from 'react'

const PatternInfo = (props) => {
    const ACCESS_TOKEN = "US1t2HdS52uX8oR22eqybD8wkTMVtJeA39"
    const [info, setInfo] = useState(null)

    useEffect(() => {
        if(!info) {
            Axios.get(props.pattern.key.href + "&access_token=" + ACCESS_TOKEN).then(res => {
                setInfo(res.data)
            })
        }
    }, [info, props.pattern.key.href])

    var body = "Loading..."
    if(info) {
        var sparks = 0
        var motes = 0
        var crafters = ""
        if(info.reagents) {
            if(info.reagents.some(e => e.reagent.id === 190453)) {
                sparks = info.reagents.find(e => e.reagent.id === 190453).quantity
            }
            if(info.reagents.some(e => e.reagent.id === 190454)) {
                motes = info.reagents.find(e => e.reagent.id === 190454).quantity
            }
        }
        for(var ownerIdx in props.pattern.owner) {
            crafters += props.pattern.owner[ownerIdx].name + " "
        }
        body = (
            <>
                <p>Sparks of Ingenuity required: {sparks}</p>
                <p>Primal Chaos required: {motes}</p>
                <p>Guild Crafters: {crafters}</p>
            </>
        )
    }

  return (
    <>{body}</>
  )
}

export default PatternInfo