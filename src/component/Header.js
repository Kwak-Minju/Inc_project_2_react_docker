import { Link, Outlet } from "react-router-dom";
import './Header.css';
import { useEffect, useState } from "react";
import axios from "axios";
import flask_uri from "./Flask_Ip_Port";

const Header = () => {
  const [ userId , setUserId ] = useState('');
  const [ background, setBackGround ] = useState(false);

  const [ isLogin, setIsLogin ] = useState(false);

  useEffect(() => {
    authCheck();
  }, [])

  const authCheck = () => {
    if (sessionStorage.getItem('userId') === null) {
        console.log('로그인한 유저 없음')
    } else {
        setIsLogin(true);
        getUserId();
        console.log("sessionStorage.getItem('userId') : " , sessionStorage.getItem('userId'))
      }
    };

  const getUserId = () => {
    axios.post(flask_uri + `/checkid`, { userId : sessionStorage.getItem('userId')}, { headers: { 'Content-Type': 'application/json' } })
    .then(response => {
        console.log(response.data.ID)
        setUserId(response.data.ID)
        // setUserId(response)
    })
  }

  return(
    <div className="all">
      <header>
        <div className="home_title">
          <div className="home_left">
            <Link to={'/'}><button>한걸음 대여소</button></Link>
          </div>
          <div className="home_right">
            <div className="home_right_buttons">
              <Link to='/board'><button>|   공지사항   |</button> </Link>
              {isLogin && <Link to='/logout'> <button>|   로그아웃   | </button></Link>}
              {isLogin && <Link to='/signout'> <button>|   회원탈퇴   | </button></Link> }
              {!isLogin &&<Link to='/login'> <button>|   로그인   | </button></Link>}
              {!isLogin &&<Link to='/signup'> <button>|   회원가입   | </button></Link>}
              </div>
          </div>
        </div>   
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;