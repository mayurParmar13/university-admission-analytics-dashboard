import { analyticsData } from "../mock/analyticsData";
import type { AdmissionAnalytics } from "../types/analytics";

export const fetchAdmissionAnalytics =
  async (): Promise<AdmissionAnalytics> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // const response = await apiClient.get<AdmissionAnalytics>(
    //   "/analytics/admissions",
    // );

    // return response.data;

    return analyticsData;
  };
