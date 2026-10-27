import http from "@canmingir/link/platform/http";
import { publish } from "@nucleoidai/react-event";
import useApi from "./useApi";

type DependencyArray = object[];
type GetVideosOptions = {
  tags?: string;
  event?: string;
  category?: string;
  speaker?: string;
  fetchState?: DependencyArray;
};

// const getHttp = async () =>
//   (await import("@canmingir/link/platform/http")).default;

function useVideos() {
  const { Api } = useApi();

  const getVideos = ({
    tags,
    event,
    category,
    speaker,
    fetchState = [],
  }: GetVideosOptions = {}) => {
    const params = new URLSearchParams();

    if (event) params.set("event", event);
    if (tags) params.set("tags", tags);
    if (category) params.set("category", category);
    if (speaker) params.set("speaker", speaker);

    const query = params.toString();
    const url = query ? "/videos?" + query : "/videos";

    const { data, loading, error, fetch } = Api(
      async () => http.get(url),
      [event, tags, category, speaker, ...fetchState],
    );

    if (data) {
      publish("VIDEOS_LOADED", { videos: data });
    }

    return { videos: data, loading, error, fetch };
  };

  const getVideo = (id: string) => {
    const { data, loading, error } = Api(
      async () => http.get(`/videos/${id}`),
      [id],
    );
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
      async () => http.get(url),
      [event, ...fetchState],
    );

    if (data) {
      publish("VIDEOS_LOADED", { relatedVideos: data });
    }

    return { videos: data, relatedVideos: data, loading, error, fetch };
  };

  return { getVideo, getVideos, getRelatedVideos };
}

export default useVideos;
