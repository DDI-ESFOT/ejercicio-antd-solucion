import React from "react";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import Routes from "../constants/routes";
import { useAuth } from "../lib/auth";
import { LogoutOutlined } from "@ant-design/icons";

const menuItems = [
  {
    to: Routes.HOME,
    text: "Home",
  },
  {
    to: Routes.USERS,
    text: "users",
  },
  {
    to: Routes.ABOUT,
    text: "About",
  },
  {
    to: Routes.REGISTER,
    text: "Register",
  },
];
const { SubMenu } = Menu;
const MainMenu = () => {
  const { user, logout } = useAuth();

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
      {menuItems.map((item, index) => {
        return (
          <Menu.Item key={index}>
            <Link to={item.to}>{item.text}</Link>
          </Menu.Item>
        );
      })}
      <Menu.Item key="notfoundmenuitempage">
        <Link to="notexist">No existe</Link>
      </Menu.Item>

      {user ? (
        <SubMenu key="sub1" title={user.email}>
          <Menu.ItemGroup key="g1" title="Tu cuenta">
            <Menu.Item key="1" icon={<LogoutOutlined />}>
              <Button type="link" style={{ color: "#ffffff" }} onClick={logout}>
                Salir
              </Button>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      ) : (
        <Menu.Item>
          <Link to={Routes.LOGIN}>Ingresar</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MainMenu;
