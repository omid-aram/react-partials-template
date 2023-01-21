import React, { useState } from "react";
import { Box, Paper, Button, CircularProgress } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
//import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import baseService from "../../app/services/base.service";
import { debugAuthActions } from "../../app/store/ducks/auth.duck";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoader from "../../app/partials/layout/GlobalLoader";
import GlobalSnackbar from "../../app/partials/layout/GlobalSnackbar";
import { useHistory } from "react-router-dom";
import { TextField } from '@material-ui/core';

const Layout = (props) => {
  const [loading, setLoading] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [textPassValue, setTextPassValue] = useState("");


  var auth = useSelector((store) => store.auth);
  const isAuthorized =
    auth.user != null && parseInt(auth.expireDate) > new Date().getTime();
  // var auth = useSelector(store => store.auth);

  let history = useHistory();
  const dispatch = useDispatch();
  const login = () => {
    setLoading(true);
    let info = {};
    info.username = { textFieldValue };
    info.password = { textPassValue };
    baseService
      .postWithUrl("https://totalapi.saipacorp.com/api/Authenticate/Login", { username: textFieldValue, password: textPassValue })
      .then((res) => {
        if (res.succeed) {
          //console.log("login : ", res);
          dispatch(debugAuthActions.login(res.data));
        } else {
          alert("اطلاعات بدرستی وارد نشده است !!!");
        }
      })
      .finally(() => setLoading(false));
  };
  const logout = () => {
    dispatch(debugAuthActions.logout());
    history.push({
      pathname: "/",
    });
  };
  const handleTextFieldChange = (e) => {
    //console.log("e", e.target.value)
    setTextFieldValue(e.target.value)
  }
  const handleTextPassChange = (e) => {
    //console.log("w", e.target.value)
    setTextPassValue(e.target.value)
  }
  return (
    <>
      <div className="container">
        <Row>
          <Col sm={2} className="menucol">
            <Box m={1}>
              <h4
                style={{
                  textAlign: "center",
                  padding: "10px",
                  borderBottom: "1px solid",
                }}
              >
                منو
              </h4>
            </Box>
            <ul id="myMenu">
              <li className="parentMenu"> <span className="caret"><Box m={1} className="menulink"> اطلاعات پایه</Box> </span>
                <ul className="nested">
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/AsmDocType' >ثبت انواع مستندات</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/AsmTaskType' >تعريف انواع دستور جلسه</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/Person' >تعريف اشخاص</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/AsmFundType' >تعريف انواع سرمايه</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/CompanyGroup' >تعريف گروه شرکتها</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/AsmProdLine' >ثبت خطوط تولید</Link>
                    </Box>
                  </li>




                  {/* <li>
                    <Box m={1} className="menulink">
                      <Link to='/AgendaType' >نوع دستور جلسه</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/ProductLine' >خط تولید</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/GroupAndType' >مقادیر پایه</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/Individual' >اشخاص</Link>
                    </Box>
                  </li> */}
                </ul>
              </li>
              <li className="parentMenu"> <span className="caret"><Box m={1} className="menulink"> عملیات جاری</Box> </span>
                <ul className="nested">
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/Company' >اطلاعات شرکت ها</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/AssemInfo' >اطلاعات مجامع</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/MeetInfo' >جلسات هیئت مدیره</Link>
                    </Box>
                  </li>
                </ul>
              </li>
              <li className="parentMenu">
                <span className="caret">
                  <Box m={1} className="menulink">دبیرخانه هیئت مدیره</Box>
                </span>
                <ul className="nested">
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/Report/Agenda' >درخواست جلسه</Link>
                    </Box>
                  </li>
                </ul>
              </li>
              <li className="parentMenu">
                <span className="caret">
                  <Box m={1} className="menulink">مجامع</Box>
                </span>
                <ul className="nested">
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/BoardMeeting' >جلسات هیئت مدیره</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/CorpBase' >شرکت - اطلاعات پایه</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/CorpDetail' >شرکت - اطلاعات تکمیلی</Link>
                    </Box>
                  </li>

                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/CountryDivision' >تقسیمات کشوری</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/AgentDetail' >نمایندگان شرکت</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/Request' >کارتابل اشخاص</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/MeetingBase' >مجامع</Link>
                    </Box>
                  </li>
                </ul>
              </li>

              <li className="parentMenu">
                <span className="caret">
                  <Box m={1} className="menulink">گزارشات</Box>
                </span>
                <ul className="nested">
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/Report/Agenda' >دستور جلسه گزارش</Link>
                    </Box>
                  </li>
                  <li>
                    <Box m={1} className="menulink">
                      <Link to='/Report/Convention' >مجامع گزارش</Link>
                    </Box>
                  </li>
                </ul>
              </li>

            </ul>
          </Col>
          <Col sm={10}>
            <Box
              style={{ padding: "10px", alignItems: "center" }}
              p={1}
              component={Paper}
              className="kt-space-between"
            >
              <div>
                <h5>سایپا</h5>
              </div>
              <div>{loading && <CircularProgress size={20} />}</div>
              <div>
                {isAuthorized && (
                  <div>
                    سلام - {auth.user.name}
                    <Button className="logoutbtn" onClick={logout}>
                      خروج
                    </Button>
                  </div>
                )}
                {!isAuthorized && (
                  <div>

                    <TextField
                      label="userName"
                      className="loginfield"
                      variant="outlined"
                      value={textFieldValue}
                      name="username"
                      onChange={(e) => handleTextFieldChange(e)} />
                    <TextField
                      className="loginfield"
                      type="password"
                      label="password"
                      defaultValue="Hello World"
                      variant="outlined"
                      value={textPassValue}
                      name="password"
                      onChange={(e) => handleTextPassChange(e)} />

                    <Button className="loginbtn" onClick={login}>
                      ورود
                    </Button>
                  </div>
                )}
              </div>
            </Box>
            <Box p={2} m={1}>
              {props.children}
            </Box>
          </Col>
        </Row>
        <GlobalLoader />
        <GlobalSnackbar />
      </div>
    </>
  );
};

export default Layout;
