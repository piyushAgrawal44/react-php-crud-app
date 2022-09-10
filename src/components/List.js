import React, { useEffect, useState } from 'react';
import $ from "jquery";
function List() {
    

    const [details, setdetails] = useState([]);
    
    
    useEffect(() => {
        fetchRepo();
    }, []);

    async function fetchRepo() {
        await fetch("https://mirnadatabaseforresearchers.000webhostapp.com/get_details.php").then(res => res.json()).then(data => {
            setdetails(data);
        });
    }
    
    setTimeout(function(){
            // $('#myTable').DataTable();
            document.getElementById('home_link').classList.remove('active');
            document.getElementById('list_link').classList.add('active');
    } ,1500);
    
    return (
      <div className="container-fluid mt-5">
          <h3 className="text-center mb-5 text-primary"><b>Saved Details</b></h3>
        <div className="table-responsive">
            <table className="table" id='myTable'>
                <thead>
                    <tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Name</th>
                        <th scope="col">Nick Name</th>
                        <th scope="col">School Name</th>
                        <th scope="col">Created At</th>
                    </tr>
                </thead>
                <tbody>

                {details.map((x, i) =>
                    x.name ?
                    <tr key={i}>
                        <th scope="row">{i}</th>
                        <td>{x.name}</td>
                        <td>{x.nick_name}</td>
                        <td>{x.school_name}</td>
                        <td>{x.created_at}</td>
                    </tr>
                    :""
                
                )}
                    
                </tbody>
            </table>
        </div>
      </div>
    );
  }
  
  export default List;
  