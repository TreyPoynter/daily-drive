import { useEffect, useState } from "react";
import { Text } from "react-native";
import { getLocalItem } from "../utilities";

const Home = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    async function getData() {
      const user = await getLocalItem('user');
      setUser(user);
    }
    getData();
  }, []);

  return(
    <>
      <Text>HELLO {user?.username}</Text>
    </>
  )
}

export default Home;