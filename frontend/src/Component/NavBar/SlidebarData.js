import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";

//import * as HiIcons from "react-icons/hi";

//création Array pour les icones et chemin de navigation
export const SidebarData = [
    {
        title:'Accueil',
        path: '/Home',
        icon: <FaIcons.FaHouseUser />,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'app',
        responsive: true
    },
    {
        title:'Nouvelle demande',
        path: '/Projet',
        icon: <FiIcons.FiPlusSquare/>,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'app',
        responsive: true
    },
    {
        title:'Ajout tâche',
        path: '/AdminForm',
        icon: <RiIcons.RiLayout3Line />,
        cName: 's-sidebar__nav-link admin__nav-link',
        admin: true,
        category: 'admin',
        responsive: false
    },
    {
        title:'Ajout heures',
        path: '/AdminHeure',
        icon: <MdIcons.MdOutlineMoreTime />,
        cName: 's-sidebar__nav-link admin__viewall-link',
        admin: true,
        category: 'admin',
        responsive: false
    },
    {
        title:'Toutes les tâches',
        path: '/ViewAll',
        icon: <FiIcons.FiGrid />,
        cName: 's-sidebar__nav-link admin__viewall-link',
        admin: true,
        responsive: true
    }, 
    {
        title:'Mon profil',
        path: '/Account',
        icon: <FaIcons.FaUser/>,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'account',
        responsive: true
    },
    {
        title:'Achat crédit',
        path: '/Credits',
        icon: <FiIcons.FiShoppingBag/>,
        cName: 's-sidebar__nav-link',
        admin: false,
        category: 'app',
        responsive: true
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
        category: 'account',
        responsive: false
    },
    {
        title:'Client',
        path: '/Client',
        icon: <FiIcons.FiUsers />,
        cName: 's-sidebar__nav-link',
        admin: true,
        category: 'admin',
        responsive: false
    }
]
