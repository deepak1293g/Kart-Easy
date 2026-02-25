const fetchUserDetails = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("current_user"));
    if (user) {
      return { data: user };
    }
    return { data: null };
  } catch (error) {
    console.log(error);
    return { data: null };
  }
};

export default fetchUserDetails;
