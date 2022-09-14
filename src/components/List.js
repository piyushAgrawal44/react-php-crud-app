import React, { useEffect, useState } from 'react';
import $ from "jquery";
import "./css/list.css";
function List() {
    
    function removeDetails(id){
        if(id){
            var answer=window.confirm("Are you sure !!");
            if (answer) {
                $.ajax({
                    url: "https://mirnadatabaseforresearchers.000webhostapp.com/crud_app_api/remove_details.php",
                    type: 'POST',
                    data: {
                        'id': id,
                    },
                    cache: false,
                    success: function(data) {
                        
                        setdetails(details => details.filter((x)=>{
                            return x.id !== id;
                        }));
                        // youcan also this as a challenge without page reload data removal...
                        
                        alert("Details removed successfully");
                        console.log(data);
                    },
                    // Fail..
                    error: function(error) {
                        
                        console.log(error);
                        
                        alert("Sorry some technical issue.");
                    }
                });
            }
        }
        else{
            alert("Something went wrong.");
            window.location.reload();
        }
    }
    function editDetails(id){
       
        var name=document.getElementsByClassName('name'+id)[0].innerText;
        var nickName=document.getElementsByClassName('nickName'+id)[0].innerText;
        var schoolName=document.getElementsByClassName('schoolName'+id)[0].innerText;
        
        $('#editFormName').val(name);
        $('#editFormNickName').val(nickName);
        $('#editFormSchoolName').val(schoolName);
        $("#myEditModalButton").click();
    }

    function updateDetails(e){
        e.preventDefault();
        var myName=document.getElementById('editFormName').value;
        var myNickName=document.getElementById('editFormNickName').value;
        var mySchoolName=document.getElementById('editFormSchoolName').value;
        $.ajax({
            url: "https://mirnadatabaseforresearchers.000webhostapp.com/crud_app_api/update_details.php",
            type: 'POST',
            data: {
                'name': myName,
                'nick_name': myNickName,
                'school_name': mySchoolName,
            },
            cache: false,
            success: function(data) {
                // Success..
                alert(data);
                console.log(data);
            },
            error: function(error) {
                console.log(error);   
                alert("Sorry some technical issue.");
            }
        });
    }
    
    function showFullDetails(text){
        $('#text').text(text);
        $("#myModalButton").click();
    }
    const [details, setdetails] = useState([]);
    
    
    useEffect(() => {
        fetchRepo();
    }, []);

    async function fetchRepo() {
        await fetch("https://mirnadatabaseforresearchers.000webhostapp.com/crud_app_api/get_details.php").then(res => res.json()).then(data => {
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
                            <td className={'manage_overflow text-truncate name'+x.id} onClick={() => showFullDetails(x.name)}>{x.name}</td>
                            <td className={'manage_overflow text-truncate nickName'+x.id} onClick={() => showFullDetails(x.nick_name)}>{x.nick_name}</td>
                            <td className={'manage_overflow text-truncate schoolName'+x.id} onClick={() => showFullDetails(x.school_name)}>{x.school_name}</td>
                            <td>{x.created_at}</td>
                            <td>
                                <button className='btn btn-outline-primary' style={{"margin":"3px"}} id={x.id} onClick={() => editDetails(x.id)}>
                                    Edit
                                </button>
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
        
<button type="button" id="myModalButton" hidden className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Launch modal
</button>
     
<button type="button" id="myEditModalButton" hidden className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myEditModal">
  Launch modal
</button>


            <div className="modal fade" tabIndex="-1" id='myModal'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p id='text'>text goes here.</p>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save changes</button> 
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div> */}
                    </div>
                </div>
            </div>

            <div className="modal fade" tabIndex="-1" id='myEditModal'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form method='post' onSubmit={()=>updateDetails(this)} >
                        <div className="modal-body text-start">
                            <input type="hidden" name='row_id' readOnly/>
                            <div className="mb-3">
                                <label htmlFor="name" className='text-primary'><b>Name</b><span className='text-danger'> *</span></label>
                                <input className='form-control' type="text" name='myName' id='editFormName' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nickName" className='text-primary'><b>Nick Name</b><span className='text-danger'> *</span></label>
                                <input className='form-control' type="text" name='nickName' id='editFormNickName' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="schoolName" className='text-primary'><b>School Name</b><span className='text-danger'> *</span></label>
                                <input className='form-control' type="text" name='schoolName' id='editFormSchoolName' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit"  className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
      </div>

    );
  }
  
  export default List;
  