import React, { useEffect, useState } from 'react'
import ProfessionInfoPanel from '../../components/ProfessionInfoPanel/ProfessionInfoPanel'
import PatternBlock from '../PatternBlock/PatternBlock'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

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
                outputList.push(
                    <Col xs="6" sm="4" lg="2" key={index}>
                        <ProfessionInfoPanel accessToken={props.accessToken} titleHandler={(title) => {props.titleHandler(title)}} visibilityHandler={(name) => {toggleVisible(name)}} name={name} id={professionList[index].id}/>
                    </Col>
                )
                if(visibility[name]) {
                    recipeLists.push(
                        <PatternBlock accessToken={props.accessToken} profession={professionList[index]} key={index}/>
                    )
                } 
            }
        }
    }

  return (
    <Container fluid="s">
        <Row className="profession-container">
            {outputList}
        </Row>
        <Row>
            <Col>
                <Container className="col-md-8 ">
                    <Row>
                        <Stack gap={12}>
                            {recipeLists}
                        </Stack>
                    </Row>
                </Container>
            </Col>
        </Row>
    </Container>            
  )
}

export default ProfessionBlock