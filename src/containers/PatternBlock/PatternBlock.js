import React, { useEffect, useState } from 'react'
import PatternTitle from '../../components/PatternTitle/PatternTitle'
import PatternInfo from '../../components/PatternInfo/PatternInfo'

const PatternBlock = (props) => {
    const [recipes, setRecipes] = useState(null)
    const [visibility, setVisibility] = useState(null)
    
    useEffect(() => {
        if(!recipes) {
            var temp = []
            for(var index in props.profession.known_recipes) {
                temp.push(props.profession.known_recipes[index])
            }
            setRecipes(temp)
        }
    }, [props.profession.known_recipes, recipes])

    useEffect(() => {
        if(!visibility) {
            var recArray ={}
            for(var recIdx in props.profession.known_recipes) {
                recArray[props.profession.known_recipes[recIdx].name] = false
            }
            setVisibility(recArray)
        }
    }, [props.profession.known_recipes, visibility])

    const toggleVisible = (name) => {
        var temp = {...visibility}
        if(temp[name]) {
            temp[name] = false
        } else {
            temp[name] = true
        } 
        setVisibility(temp)
    }

    var recipeList = "" 

    if(recipes) {
        recipeList = recipes.map(rec => {
            var patternInfo = null
            if(visibility && visibility[rec.name]) {
                patternInfo = <PatternInfo accessToken={props.accessToken} pattern={rec} />
            }
            return (
                <div className="recipe-card" key={rec.id}>
                    <PatternTitle visibilityHandler={(name) => {toggleVisible(name)}}>{rec.name}</PatternTitle>
                    {patternInfo}
                </div>
            )
        })
    }
  return (
    <div>{recipeList}</div>
  )
}

export default PatternBlock