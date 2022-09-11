import React, { useEffect, useState } from 'react';
import $ from "jquery";
import "./css/list.css";
function List() {
    
    function removeDetails(id){
        if(id){
            var answer=window.confirm("Are you sure !!");
            if (answer) {
                $.ajax({
                    url: "https://mirnadatabaseforresearchers.000webhostapp.com/remove_details.php",
                    type: 'POST',
                    data: {
                        'id': id,
                    },
                    cache: false,
                    success: function(data) {
                        
                        setdetails(details => details.filter((x)=>{
                            return x.id != id;
                        }));
                        // youcan also this as a challenge without page reload data removal...
                        
                        alert("Details removed successfully");
                        console.log(data);
                    }.bind(this),
                    // Fail..
                    error: function(error) {
                        
                        console.log(error);
                        
                        alert("Sorry some technical issue.");
                    }.bind(this)
                });
            }
        }
        else{
            alert("Something went wrong.");
            window.location.reload();
        }
    }

    function showFullDetails(text){
        // $('#text').text(text);
        // $("#modal67").modal('show');
        // console.log( $('#text').text(),$("#fullDetails").html());
        alert(text);
    }
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
                <table className="table nowrap " id='myTable'>
                    <thead>
                        <tr>
                            <th scope="col">Sno</th>
                            <th scope="col">Name</th>
                            <th scope="col">Nick Name</th>
                            <th scope="col">School</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    {details.map((x, i) =>
                        x.name ?
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td className='manage_overflow text-truncate' onClick={() => showFullDetails(x.name)}>{x.name}</td>
                            <td className='manage_overflow text-truncate' onClick={() => showFullDetails(x.nick_name)}>{x.nick_name}</td>
                            <td className='manage_overflow text-truncate' onClick={() => showFullDetails(x.school_name)}>{x.school_name}</td>
                            <td>{x.created_at}</td>
                            <td>
                                <button className='btn btn-outline-danger' id={x.id} onClick={() => removeDetails(x.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        :""
                    
                    )}
                        
                    </tbody>
                </table>
            </div>
            <br /> <br />


            {/* Modal */}

            <div className="modal fade" tabIndex="-1" id='modal67'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p id='text'>text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
      </div>

    );
  }
  
  export default List;
  