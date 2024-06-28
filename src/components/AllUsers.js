import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";
import { getAllUsers } from "../services/user-service";
import { Container, Table } from "reactstrap";
const AllUsers = () =>{

    const [user,setUser] = useState([]);

    useEffect(()=>{
        getAllUsers().then((data) =>{
            console.log(data);
            setUser(data);
        }).catch(error =>{
            console.log(error);
        })
    },[])

    return(
        <>
        <CustomNavbar/>

        <Container className="mt-5 shadow">
        <Table size="sm">
            <thead>
                <tr>
                <th>
                    #
                </th>
                <th>
                    User Name
                </th>
                <th>
                    User Email
                </th>
                <th>
                    Encoded Password
                </th>
                </tr>
            </thead>
            {user && 
            user.map((c,index) =>(
                <tbody  key={index}>
                <tr>
                <th scope="row">
                    {index+1}
                </th>
                <td>
                    {c.name}
                </td>
                <td>
                    {c.email}
                </td>
                <td>
                    xyz
                </td>
                </tr>
                
            </tbody>

            ))
            }

        </Table>


        </Container>


        
        </>
    )
}
export default AllUsers;