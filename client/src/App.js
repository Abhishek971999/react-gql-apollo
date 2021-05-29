import {useState} from "react"
import { useQuery, gql ,useMutation } from '@apollo/client';
import './App.css';

const GET_ALL_USERS = gql`
query{
  users{
    name
    age
  }
}
`;

const ADD_USER = gql`
mutation addUser($name: String!,$age:Int!) {
  addUser(name: $name,age:$age) {
    id
  }
}
`;

const App = () =>{
  const [name,setName] = useState("")
  const [age,setAge] = useState(0)
  const { loading, error, data,refetch  } = useQuery(GET_ALL_USERS);
  const [addUser] = useMutation(ADD_USER);
  if (loading){
    return (
      <div className="App">
        <header className="main-header">
          Loading
        </header>
        </div>
    )
  }
  if (error){
    return(
      <div className="App">
      <header className="main-header">
        Error 
      </header>
      </div>
    )
  }

  const handleAddUser = ()=>{
    addUser({ variables: { name, age } });
    refetch();
  }

  return (
    <div className="App">
      <header className="main-header">
       ReactJS + GraphQL +Apollo
      </header>
      <input type="text" placeholder="Enter Name" onChange={e=>setName(e.target.value)} required/>
      <input type="number" placeholder="Enter Age" onChange={e=>setAge(parseInt(e.target.value,10))} required/>
      <button onClick={handleAddUser}>Add User</button>
      <hr />
      <header className="secondary">
        Users
      </header>
      <ol className="users">
        {data?.users && data?.users.map((u)=><li>{u?.name}</li>)}
      </ol>
    </div>
  );
}

export default App;
