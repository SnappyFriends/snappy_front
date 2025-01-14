export const timeAgo = (date: string | Date) => {
  const now = new Date();
  const createdAt = new Date(date);
  const diffInMilliseconds = now.getTime() - createdAt.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 1) {
    return `Hace menos de un minuto`;
  } else if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
  } else {
    return `${createdAt.toLocaleString()}`;
  }
};
