import { Post } from "@/interfaces/types";
import { IStory } from "@/interfaces/types";

export const fetchPosts = async (): Promise<Post[]> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
	const allPosts = await response.json();
	// Lógica de filtrado
	return allPosts;
};

export const fetchFollowingUser = async (userId: string): Promise<string[]> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/${userId}/following`);
	const followingUser = await response.json();
	return followingUser.map((user: { id: string }) => user.id);
};

export const fetchStories = async (): Promise<IStory[]> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`);
	const data = await response.json();
	// Lógica para filtrar historias no expiradas
	return data;
};
