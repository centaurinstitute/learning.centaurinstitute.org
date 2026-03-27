import http from "@canmingir/link/platform/http";
import { publish } from "@nucleoidai/react-event";
import useApi from "./useApi";

type DependencyArray = object[];
type GetVideosOptions = {
  event?: string;
  fetchState?: DependencyArray;
};

function useVideos() {
  const { Api } = useApi();

  const getVideos = ({ event, fetchState = [] }: GetVideosOptions = {}) => {
    const url = event
      ? `/videos?event=${encodeURIComponent(event)}`
      : "/videos";
    const { data, loading, error, fetch } = Api(
      () => http.get(url),
      [event, ...fetchState],
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

  const getRelatedVideos = ({
    event,
    fetchState = [],
  }: GetVideosOptions = {}) => {
    const url = event
      ? `/videos?event=${encodeURIComponent(event)}&limit=5`
      : "/videos";
    const { data, loading, error, fetch } = Api(
      () => http.get(url),
      [event, ...fetchState],
    );

    if (data) {
      publish("VIDEOS_LOADED", { relatedVideos: data });
    }

    return {
      videos: data,
      relatedVideos: data,
      loading,
      error,
      fetch,
    };
  };

  return {
    getVideos,
    getRelatedVideos,
  };
}

export default useVideos;
