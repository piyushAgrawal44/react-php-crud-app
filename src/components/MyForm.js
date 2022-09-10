
// import '../MyForm.css';
import $ from 'jquery';
function MyForm() {

    function handleSubmit(e){
    //  var mForm=document.getElementById('mForm');
    //  console.log(mForm);
        e.preventDefault();
        var myName=document.getElementById('myName').value;
        var myNickName=document.getElementById('myNickName').value;
        var mySchoolName=document.getElementById('mySchoolName').value;
        $.ajax({
            url: "https://mirnadatabaseforresearchers.000webhostapp.com/enter_details.php",
            type: 'POST',
            data: {
                'myName': myName,
                'myNickName': myNickName,
                'mySchoolName': mySchoolName,
            },
            cache: false,
            success: function(data) {
                // Success..
                
                alert(data);
                console.log(data);
                document.getElementById('myName').value="";
                document.getElementById('myNickName').value="";
                document.getElementById('mySchoolName').value="";
            }.bind(this),
            // Fail..
            error: function(error) {
                
                console.log(error);
                
                alert("Sorry some technical issue.");
            }.bind(this)
        });
    
        
    }
  return (
    <div className="container mt-5">
        <h3 className="text-center my-4">Add Details</h3>
        <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
                <form className="px-sm-5 text-start form" onSubmit={handleSubmit} id="mForm">
                    <div className="mb-3">
                        <input className="form-control" type="text" required name='myName' id='myName' placeholder='Enter Your Name...' />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="text" name='myNickName' id='myNickName' placeholder='Enter Your Nick Name...' />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="text" name='mySchoolName' id='mySchoolName' placeholder='Enter Your School Name...' />
                    </div>
                    <div className="text-center">
                        <button type="submit" id='submit_btn' className="btn btn-outline-primary">Save Details</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default MyForm;
