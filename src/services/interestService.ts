const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllInterests = async () => {
  const response = await fetch(`${API_URL}/interests`);
  const data = await response.json();
  return data;
};

export const assignInterest = async (userId: string, interestId: string) => {
  await fetch(`${API_URL}/users/${userId}/assign-interest/${interestId}`, {
    method: "POST",
  });
};

export const removeInterest = async (userId: string, interestId: string) => {
  await fetch(`${API_URL}/users/${userId}/remove-interest/${interestId}`, {
    method: "POST",
  });
};
