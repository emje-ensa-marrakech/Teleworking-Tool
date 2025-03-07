const htmlContent = (
    <>
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>AVL Space</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
          <style>
            {`
              body {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
              }
              .border-container0 {
                display: flex;
                width: 100%;
              }
              .svg-container {
                width: 200px;
                background-color: #f0f0f0;
                padding: 20px;
              }
              .logo {
                width: 150px;
              }
              .sidebar-options {
                margin-top: 20px;
              }
              .sidebar-option {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                text-decoration: none;
                color: #333;
              }
              .sidebar-option img {
                width: 20px;
                margin-right: 10px;
              }
              .border-container {
                border-right: 1px solid #ccc;
                height: 100vh;
              }
              .svg-container2 {
                display: flex;
                align-items: center;
                padding: 20px;
              }
              .image2 {
                width: 50px;
                margin-right: 10px;
              }
              .tl-stl {
                margin-right: 20px;
              }
              .notification, .avatar {
                width: 30px;
                margin-right: 10px;
              }
              .font {
                margin: 0;
              }
              #teamLeaderForm, #collaboratorForm {
                display: none;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                padding: 20px;
                border: 1px solid black;
              }
            `}
          </style>
        </head>
        <body>
          <div id="app">
            <div className="border-container0">
              <div className="svg-container">
                <img src="acdff8367aec6e42b2edc5e13ceb96de.png" alt="Logo" className="logo" />
                <div className="sidebar-options">
                  <a href="#" className="sidebar-option">
                    <img src="home.png" alt="Home Icon" />
                    <h6>Home</h6>
                  </a>
                  <a href="#" className="sidebar-option">
                    <img src="Map.png" alt="Spaces Icon" />
                    <h6>Spaces</h6>
                  </a>
                  <a href="#" className="sidebar-option">
                    <img src="calendar.png" alt="Booking Icon" />
                    <h6>Booking</h6>
                  </a>
                  <a href="#" className="sidebar-option">
                    <img src="person.jpg" alt="Collaborators Icon" />
                    <h6>Collaborators</h6>
                  </a>
                  <a href="#" className="sidebar-option">
                    <img src="Settings.jpg" alt="Settings Icon" />
                    <h6>Settings</h6>
                  </a>
                </div>
              </div>
              <div className="border-container"></div>
            </div>
            <div className="svg-container2">
              <img src="e0c95322b9cf37d94426349c6b9126d4.png" alt="Logo" className="image2" />
              <div className="tl-stl">Human ressources</div>
              <img src="notifications.png" className="notification" />
              <img src="ellipse-1.png" className="avatar" />
              <h1 className="font">Zaouia ilyas</h1>
            </div>
            <div className="filter-settings">
              <span className="filter-icon"><i className="fas fa-filter"></i></span>
              <span className="filter-option">Filter By</span>
              <span className="filter-dropdown">
                <select>
                  <option value="">Initial Entry</option>
                  <option value="option1">Option 0</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </span>
              <span className="filter-dropdown">
                <select>
                  <option value="">Department</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option1">Option 3</option>
                </select>
              </span>
              <span className="filter-option">
                <select>
                  <option value="">Sort By</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </span>
              <div className="reset-container">
                <button className="reset-filter">Reset Filter</button> <img src="ic-replay-24px.png" alt="Logo" className="reset-logo" />
              </div>
            </div>
            <div className="right-buttons">
              <button className="team-leader-button" onClick={showTeamLeaderForm}>+ Team Leader</button>
              <button className="collaborators-button" onClick={showCollaboratorForm}>+ Collaborators</button>
            </div>
            <div className="container">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>Personal number</th>
                      <th>Initial Entry</th>
                      <th>Department</th>
                      <th>Work Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="teamLeaderForm">
              <h2>Add Team Leader</h2>
              <form>
                <input type="tel" placeholder="Phone number" required /><br />
                <input type="text" placeholder="ID" required /><br />
                <input type="text" placeholder="Name" required /><br />
                <input type="text" placeholder="Initial Entry" required /><br />
                <input type="text" placeholder="Departement" required /><br />
                <input type="email" placeholder="Work Email" required /><br />
                <button type="submit">Add</button>
              </form>
            </div>
            <div id="collaboratorForm">
              <h2>Add Collaborator</h2>
              <form>
                <input