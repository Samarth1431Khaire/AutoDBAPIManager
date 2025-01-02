import { useHistory } from 'react-router';

function Logout()
{
    const history = useHistory();
    localStorage.clear();
    history.push("/login");
}

export default Logout;