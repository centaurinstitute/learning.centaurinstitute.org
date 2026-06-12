import http from "@canmingir/link/platform/http";
import { publish } from "@nucleoidai/react-event";
import useApi from "./useApi";

type DependencyArray = object[];
type GetVideosOptions = {
  tags?: string;
  event?: string;
  fetchState?: DependencyArray;
};

function useVideos() {
  const { Api } = useApi();

  const getVideos = ({
    tags,
    event,
    fetchState = [],
  }: GetVideosOptions = {}) => {
    const url = event
      ? `/videos?event=${encodeURIComponent(event)}`
      : tags
        ? `/videos?tags=${encodeURIComponent(tags)}`
        : "/videos";
    const { data, loading, error, fetch } = Api(
      () => http.get(url),
      [event, tags, ...fetchState],
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

  const getVideo = (id: string) => {
    const { data, loading, error } = Api(() => http.get(`/videos/${id}`), [id]);
    return { video: data, loading, error };
  };

  const getRelatedVideos = ({
    event,
    fetchState = [],
  }: GetVideosOptions = {}) => {
    const url = event
      ? `/videos?event=${encodeURIComponent(event)}&limit=5`
      : "/videos?limit=5";
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
    getVideo,
    getVideos,
    getRelatedVideos,
  };
}

export default useVideos;
