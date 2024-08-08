import { useEffect, useState } from "react"
import "../../App.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Signup({ toggleContainer }) {
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        contact: ''
    })
    useEffect(() => {
        validateForm();
      }, [formData]);
    const validateForm = () => {
        const newErrors = {};
        const { username, password, confirm_password, email, contact } = formData;
    
        // Username validation
        if (!username) {
          newErrors.username = 'Username is required';
        }
        // Password validation
        if (!password) {
          newErrors.password = 'Password is required';
        } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password)) {
          newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one numerical value, and one special character';
        }
    
        // Confirm Password validation
        if (!confirm_password) {
          newErrors.confirm_password = 'Confirm Password is required';
        } else if (password !== confirm_password) {
          newErrors.confirm_password = 'Passwords do not match';
        }
    
        // Email validation
        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Email is not valid';
        }
    
        // Contact validation
        if (!contact) {
          newErrors.contact = 'Contact is required';
        } else if (!/^\d{10}$/.test(contact)) {
          newErrors.contact = 'Contact must be a 10-digit number';
        }
        console.log(newErrors)
        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
      };

    console.log(formData)
    let navigate = useNavigate();
    const handleChange = (event) => {
        console.log(event.target)
        console.log(event.target.value)
        setFormData(() => {
            return { ...formData, [event.target.name]: event.target.value }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(isFormValid)

        try {
            // checking is username available or not 
            if(isFormValid){
                const response = await axios.post("http://localhost:8080/journal/signup/checkusername", { username: formData.username });
                if (response.data.exists) {
                alert("Username is Already Taken ")
                }
            else {
                // proceeding further 
                let result = await axios.post("http://localhost:8080/journal/signup", formData)
                let {data} = await result;
                let {newUser} = await data;
                console.log(data);
                console.log(newUser._id)
                setFormData(()=>{
                    return {
                        username: '',
                        email: '',
                        password: '',
                        confirm_password: '',
                        contact: ''
                    }
                })
                console.log("userSaved")
                alert("Successfully signed-Up. Sign-in to continue to the Home page")
            }
            }
            else{
                alert('Please fill all fields correctly');
            }         
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="col align-items-center flex-col sign-up">
            <form onSubmit={handleSubmit} className="w-1/2" >
                <div className="form-wrapper align-items-center">
                    <div className="form sign-up">
                        <div className="input-group">
                            <i className='bx bxs-user'></i>
                            <input type="text" placeholder="Username" name="username" onChange={handleChange}  value={formData.username}  required/>
                        </div>
                        <div className="input-group">
                            <i className='bx bx-mail-send' ></i>
                            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={formData.email}  required/>
                        </div>
                        <div className="input-group">
                            <i className='bx bx-user'></i>
                            <input type="text" placeholder="contact" name="contact" onChange={handleChange} value={formData.contact} required />
                        </div>
                        <div className="input-group">
                            <i className='bx bxs-lock-alt'></i>
                            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password} required />
                        </div>
                        <div className="input-group">
                            <i className='bx bxs-lock-alt'></i>
                            <input type="password" placeholder="Confirm password" name="confirm_password" onChange={handleChange} value={formData.confirm_password} required  />
                        </div>
                        <p className="text-gray-500">
                            password must contain atleast: 1-uppercase , numerical value and special-character[$#%&*]
                        </p>
                        <button type="submit">
                            Sign up
                        </button>
                        <p>
                            <span className="text-xl">
                                Already have an account?
                            </span>
                            <b onClick={toggleContainer} className="pointer text-2xl ml-1 text-blue-700 active:text-red-800">
                                Sign-in
                            </b>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}