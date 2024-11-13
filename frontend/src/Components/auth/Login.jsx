import React , {useState} from 'react'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
   
  };

  return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' , fontFamily:"Barlow" , fontWeight:"400" }} >
        <form onSubmit={handleSubmit} className="p-5 border rounded shadow" style={{ width: '100%', maxWidth: '500px' }}>
          <h2 className="text-center mb-4" style={{fontFamily: "cursive"}} >Login</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </form>
      </div>
  )
}

export default Login