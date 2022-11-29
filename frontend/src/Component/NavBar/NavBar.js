import React, { useState, useEffect } from 'react';
import { SidebarData } from "./SlidebarData";
import './NavBar.css';
import { NavLink} from 'react-router-dom';
import logo from '../../img/logo_ahgency.png';


function NavBar(){

  const [menu, setMenu] = useState([]);
  const [role, setRole] = useState([]);
  const currentIDU = localStorage.getItem("currentIDU");

  useEffect(() => {

    let dataU = {currentIDUser: currentIDU};

    const onLoad = async () => {
        
      const response = await fetch('/api/getInfosClient', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataU)
      })

      const data = await response.json();
      if(response.status === 200){
        setRole(data.Role);
        if (data.Role !== "administrator") {
          SidebarData.filter(recherche => recherche.admin === false).map((donnee) => setMenu(menu => [...menu, donnee]));
        } else {
          SidebarData.map((donnee) => setMenu(menu => [...menu, donnee]));
        }
      } else {
        alert("Erreur serveur, veuillez réessayer plus tard");
      }
    }

    onLoad();
  
  }, [currentIDU]);
        
      return (
          <div className="s-sidebar__nav">

                <div id="gen_settings">
                    <img src={logo} alt="Logo_AhGency"></img>
                    {/* <p className="myinfo_nav">
                      <span className="name">Hello {currentName} {currentPname}</span>
                      <br></br>
                      <span className="role">{currentMail}</span>
                      <br></br>
                      <span className="role">{role}</span>
                    </p> */}
                </div>

               <ul className="NavBar">
                <h2>Portail</h2>
                    {
                          menu.filter(menu => menu.category === 'app').map((item, index) => {
                          return ( <li key = { index }>
                            <NavLink to = { item.path } 
                                    className = { item.cName } 
                                    
                                    ><p>{ item.icon }<br></br><span className="desktop"> {item.title}</span></p>
                            </NavLink></li>
                          )})
                    }
                
                { role === 'administrator' ? <h2>Admin</h2> : null}
                    {
                      menu.filter(menu => menu.category === 'admin').map((item, index) => {
                          return ( <li key = { index }>
                            <NavLink to = { item.path } 
                                    className = { item.cName } 
                                    
                                    ><p>{ item.icon }<br></br><span className="desktop"> {item.title}</span></p>
                            </NavLink></li>
                          )})
                    }
                <h2>Settings</h2>
                    {
                      menu.filter(menu => menu.category === 'account').map((item, index) => {
                          return ( <li key = { index }>
                            <NavLink to = { item.path } 
                                    className = { item.cName } 
                                    
                                    ><p>{ item.icon }<br></br><span className="desktop"> {item.title}</span></p>
                            </NavLink></li>
                          )})
                    }               
               </ul>


          </div>  
     );    
};

export default NavBar

