import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "MPS Pattern",
        path: "/MPS-Pattern",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text"
    },
    {
        title: "WPS Pattern",
        path: "/WPS-Pattern",
        icon: <FaIcons.FaTable />,
        cName: "nav-text"
    },
    {
        title: "WO Pattern",
        path: "/WO-Pattern",
        icon: <FaIcons.FaNewspaper />,
        cName: "nav-text"
    },

    // {
    //     title: "Messages",
    //     path: "/",
    //     icon: <FaIcons.FaEnvelopeOpenText />,
    //     cName: "nav-text"
    // },
    // {
    //     title: "Support",
    //     path: "/support",
    //     icon: <IoIcons.IoMdHelpCircle />,
    //     cName: "nav-text"
    // }
];
