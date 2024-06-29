import { useState } from "react"

function Settings() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState("Save Settings");

  const handleSubmit = e => {
    e.preventDefault();
    setLoader("Saving...")
    
  }

  return (
    <>
      <h2>React Settings Form</h2>
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