export const getApplicantCountColor = (value: number): string => {
  if (value > 1000) {
    return "text-danger";
  }

  if (value > 500) {
    return "text-warning";
  }

  return "text-slate-900";
};

export const getTrendColor = (trend: number): string => {
  if (trend > 0) {
    return "text-success";
  }

  if (trend < 0) {
    return "text-danger";
  }

  return "text-secondary";
};
