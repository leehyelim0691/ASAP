// import node module libraries
import { Fragment, useLayoutEffect, useState } from "react";
import { Menu, Search } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, InputGroup, Dropdown, Form, ListGroup, Row, Col, OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import axios from "axios";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

// import data files

const NavbarProfile = ({ changeLoginState }) => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();
    const [userInformationLoading, setUserInformationLoading] = useState(false);
    // const [isLogin, setIsLogin] = useState(false);

    useLayoutEffect(() => {
        // var ID = readUserInformation(window.sessionStorage.getItem("id"));
        // readUserInformation(ID);
    }, []);

    // const readInformation = () => {
    //   if (window.sessionStorage.getItem("status") === -2) setMenu(DashboardSuperMenu);
    //   else setMenu(DashboardMenu);
    // };

    // const readUserInformation = async (id) => {
    //   setUserInformationLoading(false);
    //   const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + id);
    //   setUserName(response.data[0].name);
    //   setUserEmail(response.data[0].email);
    //   setUserInformationLoading(true);
    // };

    const logout = async () => {
        console.log("logout gksek!!!!");
        // setIsLogin(true);
        // const params = new URLSearchParams();
        // params.append("email", window.sessionStorage.getItem("email"));
        // params.append("manageID", window.sessionStorage.getItem("id"));

        // await axios.post(process.env.REACT_APP_RESTAPI_HOST + "logout", params);

        // const auth2 = window.gapi.auth2.getAuthInstance();
        // auth2.signOut().then(function () {
        //     window.sessionStorage.removeItem("email");
        //     window.sessionStorage.removeItem("name");
        //     window.sessionStorage.removeItem("token");
        //     window.sessionStorage.removeItem("expires_at");
        //     window.sessionStorage.removeItem("status");
        //     window.sessionStorage.removeItem("id");
        //     window.sessionStorage.removeItem("profileImg");
        //     window.sessionStorage.removeItem("myname");
        //     window.sessionStorage.removeItem("myemail");

        //     setIsLogin(false);
        //     console.log("로그아웃 성공!!!");
        //     navigate("/swap/main");
        // });
        window.sessionStorage.removeItem("email");
        window.sessionStorage.removeItem("name");
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("expires_at");
        window.sessionStorage.removeItem("status");
        window.sessionStorage.removeItem("id");
        window.sessionStorage.removeItem("profileImg");
        window.sessionStorage.removeItem("myname");
        window.sessionStorage.removeItem("myemail");

        changeLoginState(false);
        console.log("로그아웃 성공!!!");
        navigate("/swap/main");
    };

    return (
        <Fragment>
            <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} bsPrefix="dt" className="rounded-circle border-bottom-0" id="dropdownUser">
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                        <Image src={window.sessionStorage.getItem("profileImg")} className="rounded-circle" />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dashboard-dropdown dropdown-menu-end mt-4 py-0" aria-labelledby="dropdownUser" align="end">
                    <Dropdown.Item className="mt-3">
                        <div className="d-flex">
                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                <Image src={window.sessionStorage.getItem("profileImg")} className="rounded-circle" />
                            </div>
                            {/* {userInformationLoading ? ( */}
                            <div className="ms-3 lh-1">
                                <h5 className="mb-1">{window.sessionStorage.getItem("myname")} </h5>
                                <p className="mb-0 text-muted">{window.sessionStorage.getItem("myemail")} </p>
                                {/* <h5 className="mb-1">{userName}</h5>
                  <p className="mb-0 text-muted">{userEmail}</p> */}

                                {/* <h5 className="mb-1">{window.sessionStorage.getItem("name")}</h5>
                        <p className="mb-0 text-muted">{window.sessionStorage.getItem("email")}</p> */}
                            </div>
                            {/* ) : (
                ""
              )} */}
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {/* <Dropdown.Item eventKey="2">
                  <i className="fe fe-user me-2"></i> 프로필
                </Dropdown.Item> */}
                    <Dropdown.Item>
                        <i className="fe fe-settings me-2"></i> <Link to="/swap/mypage">설정</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="mb-3">
                        {/* <i className="fe fe-power me-2"></i> 로그아웃 */}
                        {/* <googleLogout
                            className="nav-title"
                            clientId={process.env.REACT_APP_GOOGLE_LOGIN}
                            buttonText="Logout"
                            render={(renderProps) => (
                                <>
                                    <i className="fe fe-power me-2"></i>
                                    <span className="" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        로그아웃
                                    </span>
                                </>
                            )}
                            onLogoutSuccess={logout}
                        ></googleLogout> */}
                        <>
                            <i className="fe fe-power me-2"></i>
                            <span className="" onClick={logout}>
                                로그아웃
                            </span>
                        </>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    );
};

export default NavbarProfile;
