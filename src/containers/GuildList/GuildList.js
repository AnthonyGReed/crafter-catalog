import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import ProfessionBlock from '../ProfessionBlock/ProfessionBlock'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import ACCESS_TOKEN from '../../data/AccessToken/AccessToken'

const GuildList = () => {
    const BASE_URL_DATA = "https://us.api.blizzard.com/data/wow/"
    const BASE_URL_PROFILE = "https://us.api.blizzard.com/profile/wow/"
    const PARAMS = "&locale=en_US&access_token=" + ACCESS_TOKEN

    const [guildList, setGuildList] = useState([])
    const [professionList, setProfessionList] = useState([])
    const [title, setTitle] = useState("Select a Profession")


    useEffect(() => {
        const parseProfession = (info, character) => {
            var output = {}
            output.name = info.profession.name
            output.id = info.profession.id
            for(var tierIdx in info.tiers) {
                var tier = info.tiers[tierIdx]
                if(tier.tier.name.substring(0,6) === "Dragon" ) {
                    output.known_recipes = tier.known_recipes
                    for(var recepieIdx in output.known_recipes) {
                        output.known_recipes[recepieIdx].owner = [character]
                    }
                }
            }
            return output
        }

        const buildProfessionList = () => {
            Axios.get(BASE_URL_DATA + "profession/index?namespace=static-us" + PARAMS)
                .then(response => {
                    var professions = {empty: true, professions: []}
                    for(var index in response.data.professions) {
                        var profession = response.data.professions[index]
                        professions.professions.push({
                            name: profession.name,
                            id: profession.id,
                            known_recipes: []
                        })
                    }
                    setProfessionList(professions)
                })
        }

        if(guildList.length === 0) {
            Axios.get(BASE_URL_DATA + "guild/area-52/underraided/roster?namespace=profile-us" + PARAMS)
                .then(response => {
                    var callList = []
                    for(var playerIdx in response.data.members) {
                        var player = response.data.members[playerIdx].character.name.toLowerCase()
                        if(player.substring(0,4) !== "navy" && player !== "kuch") {
                            console.log(player)
                            var url = BASE_URL_PROFILE + "character/area-52/" + player + "/professions?namespace=profile-us" + PARAMS
                            var call = Axios.get(url)
                            callList = [...callList, call]
                        }
                    }
                    return Axios.all(callList)
                }).then( response => {
                    var guildInfo = []
                    for(var professionIdx in response) {
                        var profession = response[professionIdx].data
                        guildInfo = [...guildInfo, profession]
                    }
                    setGuildList(guildInfo)
                })
        } else {
            if(Object.keys(professionList).length === 0) {
                buildProfessionList()
            } else if(professionList.empty) {
                var tmpProfessionList = JSON.parse(JSON.stringify(professionList))
                for(var characterIdx in guildList) {
                    var info = guildList[characterIdx]
                    var character = info.character
                    var profession1 = {}
                    var profession2 = {}
                    var cooking = {}
                    if(info.primaries) {
                        profession1 = parseProfession(info.primaries[0], character)
                        if(profession1.known_recipes) {
                            var index = tmpProfessionList.professions.findIndex(e => e.id === profession1.id)
                            for(var recipeIdx in profession1.known_recipes) {
                                var recipe = profession1.known_recipes[recipeIdx]
                                var guildRecipes = tmpProfessionList.professions[index].known_recipes
                                if(guildRecipes.some(e=> e.id === recipe.id)) {
                                    guildRecipes.find(e=> e.id === recipe.id).owner.push(character)
                                } else {
                                    guildRecipes.push(recipe)
                                    tmpProfessionList.empty = false
                                }
                            }
                        }
                        if(info.primaries[1]) {
                            profession2 = parseProfession(info.primaries[1], character)
                            if(profession2.known_recipes) {
                                index = tmpProfessionList.professions.findIndex(e => e.id === profession2.id)
                                for(var recipe2Idx in profession2.known_recipes) {
                                    recipe = profession2.known_recipes[recipe2Idx]
                                    guildRecipes = tmpProfessionList.professions[index].known_recipes
                                    if(guildRecipes.some(e=> e.id === recipe.id)) {
                                        guildRecipes.find(e=> e.id === recipe.id).owner.push(character)
                                    } else {
                                        guildRecipes.push(recipe)
                                        tmpProfessionList.empty = false
                                    }
                                }
                            }
                        }
                    }
                    if(info.secondaries) {
                        if(info.secondaries.some(e => e.profession.id === 185)) {
                            cooking = parseProfession(info.secondaries.find(e => e.profession.id === 185), character)
                            if(cooking.known_recipes) {
                                index = tmpProfessionList.professions.findIndex(e => e.id === 185)
                                for(var cookingIdx in cooking.known_recipes) {
                                    recipe = cooking.known_recipes[cookingIdx]
                                    guildRecipes = tmpProfessionList.professions[index].known_recipes
                                    if(guildRecipes.some(e=> e.id === recipe.id)) {
                                        guildRecipes.find(e=> e.id === recipe.id).owner.push(character)
                                    } else {
                                        guildRecipes.push(recipe)
                                        tmpProfessionList.empty = false
                                    }
                                }
                            }
                        }
                    }
                }
                setProfessionList(JSON.parse(JSON.stringify(tmpProfessionList)))
            }
        }
    }, [guildList, PARAMS, professionList])

    let professionBlock = <Spinner animation="border" variant="warning"/>
    if(Object.keys(professionList).length > 0 && !professionList.empty) {
        professionBlock = (
        <Container>
            <h1 className="title">{title}</h1>
            <ProfessionBlock professionList={professionList} titleHandler={(title) => {setTitle(title)}}/>
        </Container>
        )
        
    }

  return (
    <>
       {professionBlock}
    </>
    )
}

export default GuildList