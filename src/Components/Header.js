import React, { useState,useEffect } from 'react'
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  MailOutlined
} from "@ant-design/icons";
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import Search from "../Components/forms/Search"
import { Menu, Badge } from "antd";

const { SubMenu,Item } = Menu;

export const Header = () => {

    const[current,setCurrent] =useState('Home')
    let  user  = useSelector( state=>state.user) || {};
    let  cart  = useSelector( state=>state.cart) ;
    console.log(cart.length)
    const handleClick=(e)=>{

        setCurrent(e.key)
    }
    return (

        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">

        <Item key="mail" icon={<MailOutlined />}>
       <Link to="/"> Home</Link>
        </Item> 
        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
        </Link>
          </Item>

       {user?null:<Item key="Register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/Register"> Register </Link>
          </Item>} 
        

        {user?null:<Item key="Login" icon={<UserOutlined /> } className="float-right">
          <Link to="/Login"> Login </Link>
          </Item>}
          

  
          {user?<Item key="Lgout" icon={<UserOutlined /> } className="float-right">
          <Link to="/Logout"> Logout </Link>
          </Item>:null}
      
          <SubMenu
          icon={<SettingOutlined />}
          className="float-right"
          >
            { user.role ==="admin" ? <Item>
              <Link to="/Admin/Dashboard">Admin Dashboard</Link>
            </Item> : null }
            { user.role ==="subscriber" ? <Item>
              <Link to="/User/Dashboard">User Dashboard</Link>
            </Item> : null }
       
          </SubMenu>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation">
              <Menu.ItemGroup title="Login/Register/Logout">
                {user?null:<Item key="setting:1"><Link to="/Login"> Login </Link></Item>}
                {user?null:<Item key="setting:2"><Link to="/Register"> Register </Link></Item>}
                {user?<Item key="setting:3"><Link to="/Logout"> Logout </Link></Item>:null}
              </Menu.ItemGroup>
          </SubMenu>
          
          <span className="float-right p-1">
            <Search />
          </span>

      </Menu>
    )
}
