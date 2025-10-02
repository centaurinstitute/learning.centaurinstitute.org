import http from "@canmingir/link/platform/http";
import { publish } from "@nucleoidai/react-event";
import useApi from "./useApi";
type DependencyArray = object[];

function useVideos() {
  const { Api } = useApi();

  const getLiveVideos = (fetchState: DependencyArray = []) => {
    const { data = [] } = Api(() => http.get("/videos"), [...fetchState]);

    publish("LIVE_VIDEOS_LOADED", { liveVideos: data });

    return {
      liveVideos: [],
      loading: false,
      error: null,
      fetch: () => {},
    };
  };

  return {
    getLiveVideos,
  };
}

export default useVideos;
