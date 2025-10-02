import http from "@canmingir/link/platform/http";
import { publish } from "@nucleoidai/react-event";
import useApi from "./useApi";

type DependencyArray = object[];

function useVideos() {
  const { Api } = useApi();

  const getVideos = (fetchState: DependencyArray = []) => {
    const { data, loading, error, fetch } = Api(
      () => http.get("/videos"),
      [...fetchState]
    );

    if (data) {
      publish("VIDEOS_LOADED", { videos: data });
    }

    return {
      videos: data,
      loading,
      error,
      fetch,
    };
  };

  return {
    getVideos,
  };
}

export default useVideos;
