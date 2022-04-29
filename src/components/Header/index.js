import React, { useState } from "react";
import Logo from "./../../assets/logo.png";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { createStructuredSelector  } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";



const Header = ({currentUser,signOutStart}) => {

    const [active,setActive] = useState(false);
    

    const onClick = () => {
        setActive(!active);
    };

    return(
        <header className="bg-white relative">
            <div className="max-w-6xl mx-auto flex item-center justify-between p-2.5">

            <div className="w-14" >
                <Link to="/">
                <img src ={Logo} className="w-full" />
                </Link>
            </div>

            <div onClick={onClick} className={`md:hidden uppercase cursor-pointer `} >
                 <i className="fa fa-bars"></i> MENU
            </div>

            <nav
                className= {
                    `${!active && 'hidden'}
                    absolute flex flex-col bg-white top-full w-full left-0 z-20
                    md:static md:w-auto md:flex
                    `}>
                <ul className="md:flex-row md:flex">
                    <li className="list-none md:mr-5">
                        <Link to="/" className="flex w-full taxt-base uppercase hover:text-red-600 pt-2.5 px-2.5">
                            HomePage
                        </Link>
                    </li>
                
                    <li className="list-none md:mr-5">
                        <Link to="/" className="flex w-full taxt-base uppercase hover:text-red-600 pt-2.5 px-2.5" >
                            Page
                        </Link>
                    </li>
                    {currentUser && [
                        <li className="list-none md:mr-5">
                        <span onClick={signOutStart} className="flex w-full taxt-base uppercase hover:text-red-600 pt-2.5 px-2.5">SIGN OUT</span>
                    </li>
                    ]}
                
                    {!currentUser && [
                        <li className="list-none md:mr-5">
                        <Link to="/signin" className="flex w-full taxt-base uppercase hover:text-red-600 pt-2.5 px-2.5" >
                            SIGN IN
                        </Link>
                    </li>
                    ]}
                </ul>
            </nav>
            
            </div>
        </header>
    );

    
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  })

export default connect(mapStateToProps,mapDispatchToProps)(Header);