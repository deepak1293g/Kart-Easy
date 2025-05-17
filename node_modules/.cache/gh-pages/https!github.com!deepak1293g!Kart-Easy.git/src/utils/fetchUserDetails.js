import Axios from "./axios";
import Summary from "@/common/summaryApi";

const fetchUserDetails = async () => {
  try {
    const res = await Axios({
      ...Summary.user_Details,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
