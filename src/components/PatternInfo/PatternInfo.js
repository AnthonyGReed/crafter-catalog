import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PatternInfo = (props) => {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        if(!info) {
            Axios.get(props.pattern.key.href + "&access_token=" + props.accessToken.access_token).then(res => {
                setInfo(res.data)
            })
        }
    }, [info, props.pattern.key.href])

    var body = <Spinner animation="border" variant="warning" />
    if(info) {
        var sparks = 0
        var motes = 0
        var crafters = null
        var ingenuity = null
        var primal = null
        if(info.reagents) {
            if(info.reagents.some(e => e.reagent.id === 190453)) {
                sparks = info.reagents.find(e => e.reagent.id === 190453).quantity
                if (sparks > 0) { ingenuity = <p>Sparks of Ingenuity Required: {sparks}</p>}
            }
            if(info.reagents.some(e => e.reagent.id === 190454)) {
                motes = info.reagents.find(e => e.reagent.id === 190454).quantity
                if(motes > 0 ) { primal = <p>Primal Chaos Required: {motes}</p>}
            }
        }
        var reagents = null
        if(ingenuity || primal) {
            reagents = (<Col>
                {ingenuity}
                {primal}
            </Col>)
        }
        crafters = props.pattern.owner.map(crafter => {
            return <li key={crafter.id}>{crafter.name}</li>
        })
        body = (
            <Container className="recipe-info">
                <Row>
                    <Col>
                        <p>Guild Crafters:</p>
                        <ul className="crafter-list">
                            {crafters}
                        </ul>
                    </Col>
                    {reagents}
                </Row>
            </Container>
        )
    }

  return (
    <>{body}</>
  )
}

export default PatternInfo