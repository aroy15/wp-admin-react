import { useEffect, useState } from "react"

function Settings() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState("Save Settings");
  const [loaderGet, setLoaderGet] = useState("");

  useEffect(()=>{
    setLoaderGet(<h3 style={{color:"red"}}>Data is fetching..</h3>);
    fetch(`${appLocalizer.apiUrl}/wprest/v1/settings`)
    .then(response => {
      if(response){
        return response.json();
      }
    })
    .then(data => {
        setFirstname(data?.firstname);
        setLastname(data?.lastname);
        setEmail(data?.email);
        setLoaderGet("");
    })
    .catch(error => console.error(error))
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setLoader("Saving...")

    const data = {
      firstname,
      lastname,
      email
    }
    
    fetch(`${appLocalizer.apiUrl}/wprest/v1/settings-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-NONCE': appLocalizer.nonce
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Network not responding')
      }
      return response.json();
    })
    .then(result => {
      setLoader("Save Changes")
    })
    .catch(error => console.error(error))
  }

  return (
    <>
      <h2>React Settings Form</h2>
      {loaderGet}
      <form action="" id="work-settings-form" onSubmit={e => handleSubmit(e)}>
        <table className="form-table" role="presentation">
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="firstname">First Name</label>
              </th>
              <td>
                <input 
                  type="text" 
                  id="firstname"
                  name="firstname"
                  className="regular-text"
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="lastname">Last Name</label>
              </th>
              <td>
                <input 
                  type="text" 
                  id="lastname"
                  name="lastname"
                  className="regular-text"
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                />
              </td>
            </tr>  
            <tr>
              <th scope="row">
                <label htmlFor="email">Email</label>
              </th>
              <td>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="regular-text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </td>
            </tr>           
          </tbody>
        </table>
        <p className="submit">
          <button type="submit" className="button button-primary">
            {loader}
          </button>
        </p>
      </form>
    </>
  )
}

export default Settings