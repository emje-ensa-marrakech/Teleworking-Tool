import React from "react";

export default function booking(){
    return (
<div className="booking">
    <div className="container">

        <div className="nav2">
            <div className="logo2">
                <img src="./booking/image-removebg-preview 4.png" alt=""/>
            </div>
            <div className="conent">
                <a href="#">
                    <div className="li">
                    <img src="./booking/home.png" alt=""/>
                        <h6>Home</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/map.png" alt=""/>
                        <h6>Spaces</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/calendar.png" alt=""/>
                        <h6>Booking</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/person.png" alt=""/>
                        <h6>Collaborators</h6>
                    </div>
                </a>
            </div>
            <a href="#">
                <div className="li">
                    <img src="./booking/settings.png" alt=""/>
                    <h6>Settings</h6>
                </div>
            </a>

        </div>

        <div className="nav1">
            <div className="logo">
                <img src="./booking/image-removebg-preview 2.jpg" alt="Logo" className="logoimg"/>
            </div>
            <div className="content">
                <button className="human-ressources">Human Ressources</button>

                <i className="fa-regular fa-bell notification-icon"></i>

                <div className="avatar">O</div>
                <h1 className="username">Oumnia</h1>
            </div>
        </div>

        </div>

        <div className="filter">
        <span className="title1">Booked spaces</span>
        <span className="underline"></span>
        <div className="search">
            <span className="search-text">search :</span>
            <i className="fas fa-search"></i>
            <input type="text" className="search-input" placeholder="search..."/>
        </div>
        </div>
        <div className="container-card">

        <div className="continer2">
            <div className="cards">
                {/*<div className="card">
                    <div className="title"></div>
                    <div className="info1">
                        <p><span className="bold"></span><br/></p>
                        <p><span className="bold"></span><br/></p>
                    </div>
                    <div className="info2">
                        <p><span className="bold"></span><br/></p>
                        <p><span className="bold"></span><br/></p>
                    </div>
                    <div className="actions">
                        <button className="accept"></button>
                        <button className="decline"></button>
                    </div>
                </div>*/}
            </div>
            <div className="spacesnbr">
                <div className="booked-spaces">Booked Spaces :</div>
                <div className="available-spaces">Available Spaces :</div>
            </div>
        </div>
    </div>
</div>
);
}
