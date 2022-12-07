import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
//import * as HiIcons from "react-icons/hi";

//création Array pour les icones et chemin de navigation
export const SidebarData = [
    {
        title:'Accueil',
        path: '/Home',
        icon: <FaIcons.FaHouseUser />,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'app'
    },
    {
        title:'Nouvelle demande',
        path: '/Projet',
        icon: <GiIcons.GiTicket/>,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'app'
    },
    {
        title:'Ajout timesheet',
        path: '/AdminForm',
        icon: <GrIcons.GrTableAdd />,
        cName: 's-sidebar__nav-link admin__nav-link',
        admin: true,
        category: 'admin'
    },
    {
        title:'Ajout heures',
        path: '/AdminHeure',
        icon: <MdIcons.MdOutlineMoreTime />,
        cName: 's-sidebar__nav-link admin__viewall-link',
        admin: true,
        category: 'admin'
    },
    {
        title:'Timesheet',
        path: '/ViewAll',
        icon: <GrIcons.GrAppsRounded />,
        cName: 's-sidebar__nav-link admin__viewall-link',
        admin: true,
        category: 'admin'
    }, 
    {
        title:'Mon profil',
        path: '/Account',
        icon: <FaIcons.FaUser/>,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'account'
    },
    {
        title:'Achat crédit',
        path: '/Credits',
        icon: <FaIcons.FaPlus/>,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'app'
    },
    
    /* {
        title:'Entreprise',
        path: '/Entreprise',
        icon: <HiIcons.HiOutlineOfficeBuilding />,
        cName: 's-sidebar__nav-link',
        admin: true,
        category: 'account'
    }, */
    // {
    //     title:'Factures',
    //     path: '/Factures',
    //     icon: <FaIcons.FaRegFileAlt/>,
    //     cName: 's-sidebar__nav-link',
    //     admin: false,
    //     category: 'app'
    // },
    // {
    //     title:'FAQ',
    //     path:'/Faq',
    //     icon: <RiIcons.RiQuestionnaireLine />,
    //     cName: 's-sidebar__nav-link',
    //     admin: true,
    //     category: 'account'
    // },
    {
        title:'LogOut',
        path: '/Logout',
        icon: <RiIcons.RiLogoutBoxLine />,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'account'
    }
]
