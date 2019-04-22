import axios from "axios";
import router from "./routes/routes";

axios.default.timeout = 5000;
axios.defaults.headers.post["Content-Type"] = "application/json";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/"
});
instance.defaults.headers.post["Content-Type"] = "application/json";

export default {
  allDatasets() {
    return instance.get("allDataset");
  },
  initialize(data) {
    return instance.post("initializeDataset", data);
  },
  getDataset(data) {
    return instance.get("getDataset", {
      params: {
        dataset_id: data
      }
    });
  },
  allParticipants(data) {
    return instance.get("allParticipants", {
      params: {
        dataset_id: data
      }
    });
  },
  getBm(data) {
    return instance.get("getBm", {
      params: {
        dataset_id: data.dataset_id,
        badge_id: data.badge_id,
        start: data.start,
        end: data.end
      }
    });
  },
  getVoice(data) {
    return instance.get("getVoice", {
      params: {
        dataset_id: data.dataset_id,
        badge_id: data.badge_id,
        start: data.start,
        end: data.end
      }
    });
  },
  getBadge(data) {
    return instance.get("getBadge", {
      params: {
        dataset_id: data.dataset_id,
        badge_id: data.badge_id
      }
    });
  },
  bmLimit(data) {
    return instance.get("bmLimit", {
      params: {
        dataset_id: data.dataset_id,
        badge_id: data.badge_id
      }
    });
  }
};
