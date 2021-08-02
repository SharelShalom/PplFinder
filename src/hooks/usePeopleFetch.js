import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${page}`);
    setIsLoading(false);
    setPage(page => page + 1)
    const loadedUsers = response.data.results;
    setUsers(prevUsers => [...prevUsers, ...loadedUsers]);
  }

  return { users, setUsers, isLoading, setIsLoading, fetchUsers };
};