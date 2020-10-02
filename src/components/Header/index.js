import React from 'react'
import { Image } from 'react-bootstrap'
import "./index.css"

const Header = props => {
    return (
        <div>
            <Image className="logo" src="https://rawcdn.githack.com/ducthien19052000/images/ba2f24eb8b002eb1d725e2895e959607e968bb62/fabbi.png"/>
        </div>
    )
}

Header.propTypes = {

}

export default Header
