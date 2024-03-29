import axios from "axios";
import flask_uri from "../Flask_Ip_Port.js";

const SignOut = () => {

    const onSignout = () => {
        alert('회원 탈퇴되었습니다:)')
        axios.post(flask_uri + `/signout`, {userId : sessionStorage.getItem('userId')})
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
        sessionStorage.removeItem('userId');
        document.location.href = '/'
    }
    return (
        <>
        {onSignout()}
        </>
    );

}

export default SignOut;