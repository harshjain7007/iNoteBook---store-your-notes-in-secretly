import React from 'react'

const About = () => {

  const head = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "50px"
  }

  return (
    <>
      <div>
        <header>
          <div style={head}>
            <div>
              <h4> About </h4>
            </div>
            <div>
              <h6>If you want to store your information in secretly. in the form of notes. so you can use this iNotebook.</h6>
            </div>
          </div>
        </header>
        <main>

          <div>
            <h5>How can you use this iNotebook : - </h5>
            <ul>
              <li><span>step 1:</span> Register your self. and create account. ( if you already have account than you can go login and write email and password and click login page and access your all notes. ) </li>
              <li><span>step 2:</span> If you want to store your secret information then you can go home page and write title, description and tag. and click add note button. </li>
              <li><span>step 3:</span> If you want update note and delete note so can do it easly.  </li>
              <li><span>step 4:</span> For exict your account you have to click logout button </li>
            </ul>
          </div>
        </main>
        
        <footer className="py-5">
    <div className="row">
    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
      <p>© 2022, created by Harsh jain</p>
      <p>yashoda nagar, indore</p>
      <ul className="list-unstyled d-flex">
        <li className="ms-3"><a className="link-dark" href="/"></a></li>
        <li className="ms-3"><a className="link-dark" href="/"></a></li>
        <li className="ms-3"><a className="link-dark" href="/"></a></li>
      </ul>
    </div>
    </div>
  </footer>
          </div>

        </>
        )
}

        export default About


/////////=========  its a example
// import React, {useContext, useEffect} from 'react'
// import noteContext from '../context/notes/noteContext'

// const About = () => {
//     const a = useContext(noteContext)
//     useEffect(()=>{
//         a.update()
//         // eslint-disable-next-line
//     },[])
//   return (
//     <div>
//       this is about {a.state.name} in {a.state.age}
//     </div>
//   )
// }

// export default About

