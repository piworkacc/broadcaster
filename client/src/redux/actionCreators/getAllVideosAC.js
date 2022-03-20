import {getAllVideos} from "../actions/videoAction";
import {streamPath} from "../../utils/fetchPath";

export const getAllVideosAC = () => {
	return  async (dispatch) => {
		try {
			const response = await fetch(`${streamPath}/selection/10 `)
			const videos = await response.json();
			dispatch(getAllVideos(videos))
		} catch(err) {
			throw (new Error(err))
		}
	};
};
