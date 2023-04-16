import axios from "axios";

export function searchKey(key: string) {
  return axios.get("/v1/dashboard/billing/subscription", {
    headers: {
        "Authorization": `Bearer ${key}`
    }
  });
}

export function usageInfo(params: { start_date: string; end_date: string, key: string }) {
    return axios.get('/v1/dashboard/billing/usage', {
        params,
        headers: {
            "Authorization": `Bearer ${params.key}`
        }
      })
}