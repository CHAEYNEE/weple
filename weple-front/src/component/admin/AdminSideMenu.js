
import "./adminSideMenu.css";
import { Link } from "react-router-dom";


  const AdminSideMenu = (props) => {
    const menus = props.menus;
    const setMenus = props.setMenus;
    
    const activeTab = (index) => {
      menus.forEach((item) => {
        item.active = false;
      });
      menus[index].active = true;
      setMenus([...menus]);
    };
    return (
        <div className="admin-side">
          <ul>
            {menus.map((menu, index) => {
              return (
                <li key={"menu" + index}>
                  {menu.active ? (
                    <Link
                      to={menu.url}
                      className="active-side"
                      onClick={() => {
                        activeTab(index);
                      }}
                    >
                      {menu.text}
                      
                    </Link>
                  ) : (
                    <Link
                      to={menu.url}
                      onClick={() => {
                        activeTab(index);
                      }}
                    >
                      {menu.text}
                     
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      );
    };
   
export default AdminSideMenu;