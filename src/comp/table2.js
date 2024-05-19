import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function Table2()
{
    return(

        <>
        <div className="container text-white" style={{height: "100vh"}}>
            <h2 className="text-center">Employee Management System</h2>
            <button className="btn" style={{width: "10%"}}>Add User</button>
            <div className="row">
                
                <div className="col-sm-12 col-lg-12">
                <div className="d-flex justify-content-center align-items-center">
                <table className=""> 
                    <tr>
                        <th>SrNo</th>
                        <th>Name </th>
                        <th>Department</th>
                        <th>Employer Id</th>
                        <th>Image</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    <tbody>
                    <tr>
                        <td>01</td>
                        <td>01</td>
                        <td>01</td>
                        <td>01</td>
                        <td>01</td>
                        <td>01</td>
                        <td>01</td>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>01</td>
                        <td>01</td>
                        <td>01</td>
                        <td>01</td>
                        <td><button>Edit</button></td>
                        <td><button className="btn-warning">Del</button></td>
                    </tr>
                    </tbody>
                    
                </table>
                </div>

                </div>
            </div>
        </div>
        </>
    );
}


export default Table2;