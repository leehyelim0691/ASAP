// import node module libraries
import { Fragment, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Image, Navbar, Nav, Container, Form, Dropdown, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
// import { GoogleLogin, GoogleLogout } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import "../../../assets/scss/navbar.scss";

// import media files
import Logo from "assets/images/SWAPLogo.png";
import NavbarProfile from "./NavbarProfile";

const NavbarDefault = ({ headerstyle }, { props }) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    const [showMenu, setShowMenu] = useState(true);
    const ToggleMenu = () => {
        return setShowMenu(!showMenu);
    };

    const [expandedMenu, setExpandedMenu] = useState(false);
    const today = new Date();
    const [isLogin, setIsLogin] = useState(false);

    const changeLoginState = (value) => {
        setIsLogin(value);
    };

    useLayoutEffect(() => {
        if (window.sessionStorage.getItem("email")) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    const QuickMenu = () => {
        return (
            <Fragment className="d-flex justify-content-end">
                {isLogin ? (
                    <>
                        {window.sessionStorage.getItem("status") === "0" || window.sessionStorage.getItem("status") === "-2" ? (
                            <Nav>
                                <Nav.Link className="h4" href="/swap/admin/program">
                                    관리자 페이지
                                </Nav.Link>
                                <Nav.Link className="h4" href="/swap/mypage">
                                    마이페이지
                                </Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Nav.Link className="h4" href="/swap/mypage">
                                    마이페이지
                                </Nav.Link>
                            </Nav>
                        )}
                        <NavbarProfile changeLoginState={changeLoginState} />
                    </>
                ) : (
                    ""
                )}
            </Fragment>
        );
    };

    const onSuccess = async (response) => {
        var login = 0;
        const params = new URLSearchParams();
        console.log(response);
        // params.append("token", response.tokenObj.id_token);
        params.append("token", response.credential);
        // params.append("token", response.tokenObj.id_token);
        // params.append("name", response.profileObj.name);
        // params.append("email", response.profileObj.email);
        // params.append("expire", response.tokenObj.expires_at);
        // params.append("manageID", window.sessionStorage.getItem("id"));

        const res = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "login", params);
        console.log(res);
        if (res.data !== "fail" && res.data !== "newUser") {
            const r = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "user/loggedinUser/" + res.data.id);
            window.sessionStorage.setItem("email", res.data.email);
            window.sessionStorage.setItem("name", res.data.name);
            window.sessionStorage.setItem("profileImg", "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg");
            window.sessionStorage.setItem("token", res.data.token);
            window.sessionStorage.setItem("expires_at", res.data.expire_token);
            window.sessionStorage.setItem("status", res.data.status);
            window.sessionStorage.setItem("id", res.data.id);
            window.sessionStorage.setItem("myname", r.data[0].name);
            window.sessionStorage.setItem("myemail", r.data[0].email);
            // window.sessionStorage.setItem("myname", res.data.status);

            setIsLogin(true);
            login = 1;

            console.log("로그인 성공");
        } else if (res.data === "newUser") {
            console.log("user 등록 페이지로 가기!!");

            navigate("/swap/sign-up", { state: { data: response.profileObj, tokenObj: response.tokenObj } });
        } else {
            alert("로그인 할 수 없습니다. 관리자에게 문의해주세요.");
            setIsLogin(false);
        }
    };

    const logout = async () => {
        console.log("logout gksek!!!!");
        setIsLogin(true);
        const params = new URLSearchParams();
        params.append("email", window.sessionStorage.getItem("email"));
        params.append("manageID", window.sessionStorage.getItem("id"));

        // await axios.post(process.env.REACT_APP_RESTAPI_HOST + "logout", params);

        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            window.sessionStorage.removeItem("email");
            window.sessionStorage.removeItem("name");
            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("expires_at");
            window.sessionStorage.removeItem("status");
            window.sessionStorage.removeItem("id");
            window.sessionStorage.removeItem("profileImg");
            window.sessionStorage.removeItem("myname");
            window.sessionStorage.removeItem("myemail");

            setIsLogin(false);
            console.log("로그아웃 성공!!!");
            navigate("/swap/main");
        });
    };

    const onFailure = (error) => {
        console.log(error);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <Fragment>
            <Navbar
                onToggle={(collapsed) => setExpandedMenu(collapsed)}
                expanded={expandedMenu}
                expand="lg"
                className={`${isLogin ? "bg-white" : ""} navbar p-2 ${headerstyle === "dark" ? "navbar-dark bg-dark" : "navbar-default py-2"}`}
            >
                <Container fluid className="px-0 ps-2">
                    <Navbar.Brand as={Link} to="/swap/">
                        <Image src={Logo} alt="" width="120px" />
                    </Navbar.Brand>

                    {/* <div className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${isLogin ? (isDesktop || isLaptop ? "d-none" : "d-flex") : "d-none"}`}> */}
                    <div className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                        <span className=""></span>
                        <QuickMenu />
                    </div>

                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="icon-bar top-bar mt-0"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
                    </Navbar.Toggle>

                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Search Form */}
                        {/* <Form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control type="Search" id="formSearch" className="ps-6" placeholder="Search Courses" />
            </Form> */}

                        <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                            {window.sessionStorage.getItem("token") !== null && window.sessionStorage.getItem("expires_at") >= today.getTime() ? (
                                <QuickMenu />
                            ) : (
                                <span className={`ms-auto mt-3 mt-lg-0  ${isLogin ? "d-none" : ""}`}>
                                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_LOGIN}>
                                        {/* <GoogleLogin
                                            bsPrefix="btn"
                                            className="btn btn-primary shadow-sm"
                                            buttonText="로그인"
                                            onSuccess={onSuccess}
                                            onFailure={onFailure}
                                            cookiePolicy="single_host_origin"
                                            render={(renderProps) => (
                                                <>
                                                    <Button className="btn btn-primary shadow-sm" onClick={renderProps.onClick}>
                                                        로그인
                                                    </Button>
                                                </>
                                            )}
                                        /> */}
                                        <GoogleLogin
                                            bsPrefix="btn"
                                            className="btn btn-primary shadow-sm"
                                            buttonText="로그인"
                                            onSuccess={onSuccess}
                                            onFailure={onFailure}
                                            cookiePolicy="single_host_origin"
                                            render={(renderProps) => (
                                                <>
                                                    <Button className="btn btn-primary shadow-sm" onClick={renderProps.onClick}>
                                                        로그인
                                                    </Button>
                                                </>
                                            )}
                                        />
                                    </GoogleOAuthProvider>
                                </span>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
    headerstyle: PropTypes.string,
    login: PropTypes.bool,
};

export default NavbarDefault;
