import { useState, useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom';


const Logout = ()=>{

    const [checked, setChecked] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(checked){
            signOut(auth).then(() => {
                console.log('déconnexion');
                setTimeout(()=>{
                    navigate('/')
                },1000)
            }).catch((error) => {
                console.log('Oups nous avons une erreur');
            });
        }
    },[checked])

    const handleChange = (e)=>{
        setChecked(e.target.checked)
    }
    
    return (
        <div>
            <div className='logoutContainer'>
                <label className="switch" >
                    <input type="checkbox" checked={checked} onChange={handleChange}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}

export default Logout