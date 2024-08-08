import { useState } from "react"
import "../../App.css"
import Login from "../LoginPage/Login"
import Signup from "../SignUpPage/Signup"

export default function MainAuth(){
let [toggle,setToggle] = useState(false)
let toggleContainer = (event) => {
    console.log(event.target); 
    setToggle(!toggle)    
}
    return(
        <div>
            <div id="container" className={ `${toggle?"sign-up":"sign-in"} container` }  >
		{/* <!-- FORM SECTION --> */}
		<div className="row">
			{/* <!-- SIGN UP --> */}
            <Signup toggleContainer={toggleContainer} />
			{/* <!-- END SIGN UP -->
			<!-- SIGN IN --> */}
			<Login  toggleContainer={toggleContainer} />
			{/* <!-- END SIGN IN --> */}
		</div>
		{/* <!-- END FORM SECTION -->
		<!-- CONTENT SECTION --> */}
		<div className="row content-row ">
			{/* <!-- SIGN IN CONTENT --> */}
			<div className="col align-items-center flex-col flex ">
				<div className="text sign-in mt-0 ">
					<h2 className="text-white self-start" >
						Welcome User !
					</h2>
                    <p className="mr-20" >
                    Welcome to the journal where the past is recorded, the present is explored, and the future is envisioned.
                    </p>
	
				</div>
				<div className="img sign-in">
		
				</div>
			</div>
			{/* <!-- END SIGN IN CONTENT -->
			<!-- SIGN UP CONTENT --> */}
			<div className="col align-items-center flex-col">
				<div className="img sign-up">
				</div>
				<div className="text sign-up mr-0">
					<h2>
						Join with us
					</h2>
                    <p className="ml-2 text-wrap wrap p-3">
                    Welcome to your personal sanctuary of thoughts. Join us in the art of journaling, where every page is a fresh start, and every entry is a journey of self-discovery and growth. Together, we create, reflect, and inspire.
                    </p>
	
				</div>
			</div>
			{/* <!-- END SIGN UP CONTENT --> */}
		</div>
		{/* <!-- END CONTENT SECTION --> */}
	</div>
</div>
    )
}