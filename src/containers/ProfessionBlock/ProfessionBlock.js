import React, { useEffect, useState } from 'react'
import ProfessionInfoPanel from '../../components/ProfessionInfoPanel/ProfessionInfoPanel'
import PatternBlock from '../PatternBlock/PatternBlock'

const ProfessionBlock = (props) => {
    const [visibility, setVisibility] = useState(null)

    const toggleVisible = (name) => {
        var temp = {...visibility}
        if(temp[name]) {
            temp[name] = false
        } else {
            temp[name] = true
        } 
        setVisibility(temp)
    }

    useEffect(() => {
        if(!visibility) {
            var profArray = {}
            for(var professionIdx in props.professionList.professions) {
                profArray[props.professionList.professions[professionIdx].name] = false
            }
            setVisibility(profArray)
        }
    }, [props.professionList.professions, visibility])

    var professionList = props.professionList.professions
    var outputList = []
    var recipeLists = []
    if(visibility) {
        for(var index in professionList) {
            if(professionList[index].known_recipes.length > 0) {
                var name = professionList[index].name
                outputList.push(<ProfessionInfoPanel titleHandler={(title) => {props.titleHandler(title)}} visibilityHandler={(name) => {toggleVisible(name)}} key={index} name={name} id={professionList[index].id}/> )
                if(visibility[name]) {
                    recipeLists.push(<PatternBlock key={index} profession={professionList[index]} />)
                } 
            }
        }
    }

  return (
    <div>
        <ul>    
            {outputList}
            {recipeLists}
        </ul>
    </div>
  )
}

export default ProfessionBlock